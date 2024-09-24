import Servire from "@/components/layouts/Client/Servire"
import Relater_Products from "./_component/Relater_Products"
import Description from "./_component/Description"
import Info_Products from "./_component/Info_Products"
import Menu_Detail from "./_component/Menu_Detail"
import { useProducts } from "@/common/hooks/Products/useProducts"
import { useParams } from "react-router-dom"

const Page = () => {
    const { id } = useParams()
    const { data, isLoading } = useProducts(id)
    if (isLoading) return <div>Loading...</div>
    return (
        <main>
            <div className="dhn-container">
                <Menu_Detail />
                <Info_Products data_Detail={data} />
                <Description data_Detail={data} />
            </div>
            <Relater_Products />
            <Servire />
            <div className="mb-20" />
        </main>

    )
}

export default Page