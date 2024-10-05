import Footer from "@/components/layouts/Client/Footer"
import Header from "@/components/layouts/Client/Header"
import { Outlet } from "react-router-dom"

const LayOutClient = () => {
    return (
        <div className="conten-wrapper max-w-screen-2xl text-base mx-auto h-auto px-2">
            <Header />
            <div className="mt-24">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default LayOutClient