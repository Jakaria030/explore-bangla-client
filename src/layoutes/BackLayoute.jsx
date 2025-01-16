import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaHome } from "react-icons/fa";
import TouristSidebar from "../dashboard/TouristPage/SidebarRoutes/TouristSidebar";
import TourGuideSidebar from "../dashboard/TourGuidPage/SidebarRoutes/TourGuideSidebar";
import AdminSidebar from "../dashboard/AdminPage/SidebarRoutes/AdminSidebar";
import useAdmin from "../hooks/useAdmin";
import useTourGuide from "../hooks/useTourGuide";
import useTourist from "../hooks/useTourist";

const BackLayoute = () => {
    const {isAdmin, isAdminLoading} = useAdmin();
    const {isTourGuide, isTourGuideLoading} = useTourGuide();
    const {isTourist, isTouristLoading} = useTourist();

    return (
        <section className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                {/* dynamic content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu text-charcoal min-h-full w-64 sm:w-80 bg-teal/80 backdrop-blur-lg">
                    {/* logo */}
                    <nav className="border-b-2 border-white">
                        <Link to="/dashboard" className="flex items-center gap-2 mb-3">
                            <figure className="size-12 bg-white rounded-full flex items-center justify-center">
                                <img className="size-8 mx-auto" src={logo} alt="Logo" />
                            </figure>
                            <h2 className="text-2xl font-semibold text-white">Explore Bangla</h2>
                        </Link>
                    </nav>
                    {/* routes */}
                    <main className="flex-grow">
                        {/* Sidebar content here */}

                        { !isAdminLoading && isAdmin && <AdminSidebar></AdminSidebar> }
                        { !isTourGuideLoading && isTourGuide && <TourGuideSidebar></TourGuideSidebar> }
                        { !isTouristLoading && isTourist && <TouristSidebar></TouristSidebar>}
                        

                        <ul className="border-t-2 text-white border-white">
                            <li><Link to="/"><FaHome className="text-2xl" />Home</Link></li>
                        </ul>
                    </main>
                    {/* footer */}
                    <footer className="my-3 border-t-2 border-white">
                        <p className="text-white text-center mt-3">&copy; 2025 - Explore Bangla</p>
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default BackLayoute;