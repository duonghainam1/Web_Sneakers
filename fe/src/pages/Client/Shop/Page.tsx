import Servire from "@/components/layouts/Client/Servire"
import Menu_Shop from "./_component/Menu_Shop"
import SideBar_shop from "./_component/SideBar_shop"
import Products from "./_component/Products"

const Page = () => {
    return (
        <main>
            <Menu_Shop />
            <div className="lg:lg:mx-28">
                <div className="flex flex-col lg:flex-row gap-4">
                    <SideBar_shop />
                    <Products />
                </div>
            </div>
            <Servire />

            <div className="mb-20" />
        </main>

    )
}

export default Page