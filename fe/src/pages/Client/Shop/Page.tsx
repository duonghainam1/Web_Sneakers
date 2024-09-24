import Servire from "@/components/layouts/Client/Servire"
import Menu_Shop from "./_component/Menu_Shop"
import Pagination from "./_component/Pagination"
import SideBar_shop from "./_component/SideBar_shop"
import Products from "./_component/Products"

const Page = () => {
    return (
        <main>
            <Menu_Shop />
            <div className="dhn-container">
                <div className="flex gap-4">
                    <SideBar_shop />
                    <Products />
                </div>
                <Pagination />
            </div>
            <Servire />

            <div className="mb-20" />
        </main>

    )
}

export default Page