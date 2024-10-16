export interface Products_Type {
    _id?: string
    name: string;
    description?: string;
    category: string
    stock: number;
    sku: string;
    status: 'Available' | 'Out of Stock' | 'Discontinued';
    images: string;
    featured?: boolean;
    attributes?: string[]
    createdAt?: Date;
    updatedAt?: Date;
}