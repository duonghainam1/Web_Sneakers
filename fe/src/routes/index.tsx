
import LayOutAdmin from "@/layouts/LayOutAdmin";
import LayOutClient from "@/layouts/LayOutClient";
import AddProducts from "@/pages/Admin/Products/_component/AddProducts";
import EditProducts from "@/pages/Admin/Products/_component/EditProducts";
import ListProducts from "@/pages/Admin/Products/ListProducts";
import Page from "@/pages/Client/Home/Page";
import Page_Shop from "@/pages/Client/Shop/Page";
import Page_Detail_Products from "@/pages/Client/Products_Details/Page";
import Page_Cart from "@/pages/Client/Cart/Page";
import Page_Orders from "@/pages/Client/Order/Page";
import { Route, Routes } from "react-router-dom";
import Page_Admin from "@/pages/Admin/Dashboard/Page";
import ListCategory from "@/pages/Admin/Category/ListCategory";
import AddCategory from "@/pages/Admin/Category/_component/AddCategory";
import EditCategory from "@/pages/Admin/Category/_component/EditCategory";
import List_Auth from "@/pages/Admin/Auth/List_Auth";
import Order_Detail from "@/pages/Admin/Order/Order_Detail";
import Order_Detail_Client from "@/pages/Client/Profile/_component/Order_Detail";
import List_Order from "@/pages/Admin/Order/List_Order";
import Page_Profile from "@/pages/Client/Profile/Page";
import List_Orders from "@/pages/Client/Profile/_component/List_Orders";
import Profile from "@/pages/Client/Profile/_component/Profile";
import SignIn from "@/pages/Client/Auth/SignIn";
import SignUp from "@/pages/Client/Auth/SignUp";
import Mini_cart from "@/pages/Client/Cart/_component/Mini_cart";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayOutClient />}>
                    <Route index element={<Page />} />
                    <Route path="shops" element={<Page_Shop />} />
                    <Route path="shops/:id" element={<Page_Detail_Products />} />
                    <Route path="cart" element={<Page_Cart />} />
                    <Route path="cart/mini" element={<Mini_cart />} />
                    <Route path="orders" element={<Page_Orders />} />
                    <Route path="profile" element={<Page_Profile />}>
                        <Route index element={<Profile />} />
                        <Route path="list_orders" element={<List_Orders />} />
                        <Route path="address" element={<List_Orders />} />
                        <Route path="list_orders/:id" element={<Order_Detail_Client />} />
                    </Route>
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/admin" element={<LayOutAdmin />}>
                    <Route index element={<Page_Admin />} />
                    {/* Products */}
                    <Route path="products" element={<ListProducts />} />
                    <Route path="products/add" element={<AddProducts />} />
                    <Route path="products/:id" element={<EditProducts />} />
                    {/* Category */}
                    <Route path="categori" element={<ListCategory />} />
                    <Route path="categori/add" element={<AddCategory />} />
                    <Route path="categori/:id" element={<EditCategory />} />
                    {/* Order */}
                    <Route path="orders" element={<List_Order />} />
                    <Route path="orders/:id" element={<Order_Detail />} />
                    {/* Auth */}
                    <Route path="auth" element={<List_Auth />} />
                </Route>
            </Routes>
        </>
    );
};

export default Router;
