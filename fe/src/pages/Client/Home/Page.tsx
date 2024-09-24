import Servire from "@/components/layouts/Client/Servire"
import Banner from "./_component/Banner"
import Category from "./_component/Category"
import Customer from "./_component/Customer"
import Date from "./_component/Date"
import Instagram from "./_component/Instagram"
import Products from "./_component/Products"

const Page = () => {
    return (


        <main>
            <Banner />
            <Category />
            <Products />
            <Date />
            <Customer />
            <Instagram />
            <Servire />
            <div className="mb-20" />
        </main>



    )
}

export default Page