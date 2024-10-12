import Router from './routes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <>
            <Router />
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default App
