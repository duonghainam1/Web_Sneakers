import { StatusCodes } from "http-status-codes";
import Products from "../models/product.js";
import Attribute from "../models/attribute.js";
export const GetAllProduct = async (req, res) => {
    const { page = 1, limit = 12, search, category, size, color } = req.query;
    try {
        const options = {
            page: page,
            limit: limit,
            populate: { path: 'attributes', populate: { path: 'sizes' } },
            sort: { createdAt: -1 },

        }
        const query = {}
        if (search) {
            query.name = { $regex: search, $options: 'i' }
        }
        if (category) {
            query.category = category;
        }
        if (size || color) {
            const attrCond = {};
            if (size) attrCond['sizes.size'] = { $in: (Array.isArray(size) ? size : [size]) };
            if (color) attrCond.color = { $in: (Array.isArray(color) ? color : [color]) };

            const attrIds = await Attribute
                .find(attrCond, '_id')      // chỉ lấy _id
                .lean()
                .then(rows => rows.map(r => r._id));

            if (attrIds.length === 0) {
                return res.status(StatusCodes.OK).json({
                    products: { docs: [], totalDocs: 0, page, limit }
                });
            }

            query.attributes = { $in: attrIds };
        }
        const products = await Products.paginate(query, options)
        if (!products) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào" });
        }
        products.docs.forEach(product => {
            let totalStock = 0;
            product.attributes.forEach(attribute => {
                attribute.sizes.forEach(size => {
                    totalStock += size.stock;
                });
            });

            if (totalStock === 0) {
                product.status = 'Out of Stock';
            } else if (product.status === 'Discontinued') {
                product.status = 'Discontinued';
            } else {
                product.status = 'Available';
            }
        });
        return res.status(StatusCodes.OK).json({ products });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server" });
    }
}
export const GetProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId).populate('attributes').populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let attributes = await Attribute.find({ productId: productId });
        attributes = attributes.map(attr => {
            const check_stock = attr.sizes.filter(size => size.stock > 0);
            return check_stock.length > 0 ? { ...attr._doc, sizes: check_stock } : null;
        }).filter(attr => attr !== null);
        const sizes = attributes.flatMap(attr => attr.sizes);
        const minPrice = Math.min(...sizes.map(size => size.price));
        const maxPrice = Math.max(...sizes.map(size => size.price));
        const relatedProducts = await Products.find({
            category: product.category,
            _id: { $ne: productId }
        }).populate('attributes')

        res.status(200).json({
            product,
            minPrice,
            maxPrice,
            attributes,
            relatedProducts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const CreateProduct = async (req, res) => {

    try {
        const { name, description, category, sku, status, images, attributes, featured } = req.body;
        console.log(req.body);
        const product = new Products({
            name,
            description,
            category,
            sku,
            status,
            images,
            featured
        });

        const savedProduct = await product.save();
        let attributeIds = [];
        for (let attr of attributes) {
            const { color, images, sizes } = attr;
            const attribute = new Attribute({
                productId: savedProduct._id,
                color,
                images,
                sizes
            });
            const savedAttribute = await attribute.save();
            attributeIds.push(savedAttribute._id);
        }
        savedProduct.attributes = attributeIds;
        await savedProduct.save();
        res.status(201).json({ message: 'Sản phẩm và thuộc tính đã được thêm thành công!', product: savedProduct });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm và thuộc tính:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm sản phẩm và thuộc tính', error });
    }
};

export const DeleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Attribute.deleteMany({ product: id });
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại." });
        }
        res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, sku, status, images, attributes, featured } = req.body;
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { name, description, category, sku, status, images, featured },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Sản phẩm không tồn tại." });
        }

        let attributeIds = [];
        for (let attr of attributes) {
            let savedAttribute;
            if (attr._id) {
                savedAttribute = await Attribute.findByIdAndUpdate(
                    attr._id,
                    { color: attr.color, images: attr.images, sizes: attr.sizes },
                    { new: true, runValidators: true }
                );
            } else {
                const newAttr = new Attribute({
                    productId: id,
                    color: attr.color,
                    images: attr.images,
                    sizes: attr.sizes
                });
                savedAttribute = await newAttr.save();
            }
            attributeIds.push(savedAttribute._id);
        }
        await Attribute.deleteMany({
            _id: { $nin: attributeIds },
            productId: updatedProduct._id
        });
        updatedProduct.attributes = attributeIds;

        await updatedProduct.save();

        return res.status(StatusCodes.OK).json(updatedProduct);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
