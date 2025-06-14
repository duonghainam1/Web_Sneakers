import Servire from "@/components/layouts/Client/Servire"
import Relater_Products from "./_component/Relater_Products"
import Description from "./_component/Description"
import Info_Products from "./_component/Info_Products"
import { useProducts } from "@/common/hooks/Products/useProducts"
import { useParams } from "react-router-dom"
import { Spin } from "antd"
import Menu_Detail from "./_component/Menu_Detail"

const Page = () => {
    const { id } = useParams()
    const { data, isLoading } = useProducts(id)

    if (isLoading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    return (
        <main>
            <div className="lg:mx-28">
                <Menu_Detail data_Detail={data} />
                <Info_Products data_Detail={data} />
                <Description data_Detail={data} />
            </div>
            <Relater_Products data_Detail={data} isLoading={isLoading} />
            <Servire />
            <div className="mb-20" />
        </main>

    )
}

export default Page