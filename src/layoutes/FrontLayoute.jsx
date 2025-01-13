import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FrontLayoute = () => {
    return (
        <section className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="flex-grow">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </section>
    );
};

export default FrontLayoute;