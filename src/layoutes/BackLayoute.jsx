import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdMenu } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import TouristSidebar from "../dashboard/TouristPage/SidebarRoutes/TouristSidebar";
import TourGuideSidebar from "../dashboard/TourGuidPage/SidebarRoutes/TourGuideSidebar";
import AdminSidebar from "../dashboard/AdminPage/SidebarRoutes/AdminSidebar";

const BackLayoute = () => {
    return (
        <section className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-5">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                    <MdMenu className="text-3xl"></MdMenu>
                </label>

                {/* dynamic content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu text-charcoal min-h-full w-80 bg-orange/90">
                    {/* logo */}
                    <nav className="border-b-2 border-white">
                        <Link to="/dashboard" className="flex items-center gap-2 mb-3">
                            <figure className="size-12 bg-white rounded-full flex items-center justify-center">
                                <img className="size-8 mx-auto" src={logo} alt="Logo" />
                            </figure>
                            <h2 className="text-2xl font-semibold text-teal">Explore Bangla</h2>
                        </Link>
                    </nav>
                    {/* routes */}
                    <main className="flex-grow">
                        {/* Sidebar content here */}

                        {/* TODO: conditionaly render here */}
                        {/* <TouristSidebar></TouristSidebar> */}
                        {/* <TourGuideSidebar></TourGuideSidebar> */}
                        <AdminSidebar></AdminSidebar>



                        <ul className="border-t-2 border-white">
                            <li><Link to="/"><FaHome className="text-2xl" />Home</Link></li>
                        </ul>
                    </main>
                    {/* footer */}
                    <footer className="my-3 border-t-2 border-white">
                        <p className="text-charcoal text-center mt-3">&copy; 2025 - Explore Bangla</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default BackLayoute;