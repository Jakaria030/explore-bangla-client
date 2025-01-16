import { MdClose, MdMenu } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { successAlert } from "../toastify/toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOutUser, loading } = useAuth();
    const [role, setRole] = useState("tourist");

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    if (!loading && user){
        axiosSecure.get(`/users/role?email=${user?.email}`)
        .then(res => setRole(res.data.role))
    }

    const links = <>
        <NavLink to="/" className="border-b-2 border-base-300 md:border-teal">Home</NavLink>
        <NavLink to="/community" className="border-b-2 border-base-300 md:border-teal">Community</NavLink>
        <NavLink to="/trips" className="border-b-2 border-base-300 md:border-teal">Trips</NavLink>
        <NavLink to="/about" className="border-b-2 border-base-300 md:border-teal">About Us</NavLink>
    </>;

    const handleLogout = async () => {
        await signOutUser();
        successAlert("Logout successful.");
        navigate("/");
    };

    return (
        <section className="bg-teal py-5">
            <div className="max-w-8xl mx-auto px-5">
                <div className="flex items-center justify-between">
                    {/* left side content */}
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsOpen(true)} className="md:hidden">
                            <MdMenu className="text-3xl text-white "></MdMenu>
                        </button>


                        <Link to="/" className="flex items-center gap-2">
                            <figure className="size-12 bg-white rounded-full hidden sm:flex items-center justify-center">
                                <img className="size-8 mx-auto" src={logo} alt="Logo" />
                            </figure>
                            <h2 className="text-xl text-white font-semibold">Explore <span className="text-orange">Bangla</span></h2>
                        </Link>
                    </div>

                    {/* center content */}
                    <div className=" hidden md:flex">
                        <ul className="flex items-center gap-3 text-white text-lg">
                            {links}
                        </ul>
                    </div>

                    {/* right side content */}
                    <div>
                        {
                            (!loading && user) ? <div className="size-12 flex items-center justify-center">
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} role="button" className="size-12 rounded-full ring-2 ring-orange">
                                        <img className="rounded-full" src={user.photoURL} />
                                    </button>

                                    <ul tabIndex={0} className="dropdown-content menu bg-teal/80 rounded-b-md z-[1] mt-4 w-60 p-2 text-white shadow">
                                        <li className="text-center">{user.displayName}</li>
                                        <li className="text-center">{user.email}</li>
                                        <hr className="my-1" />
                                        <li><Link to={`/dashboard/${(role === 'admin' && 'admin-manage-profile') || (role === 'tour-guide' && 'tour-guide-manage-profile') || (role === 'tourist' && 'tourist-manage-profile')}`}>Dashboard</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div> : <Link to="/login"><button className="px-4 py-1 sm:py-2 bg-orange rounded-sm font-semibold text-white">Login</button></Link>
                        }
                    </div>
                </div>
            </div>

            {
                isOpen && <div className=" absolute min-h-screen top-0 w-[320px] bg-base-300 md:hidden p-5">
                    <div>
                        <button onClick={() => setIsOpen(false)} className="md:hidden">
                            <MdClose className="text-3xl text-charcoal" />
                        </button>
                        <ul className="flex flex-col gap-1 ">
                            {links}
                        </ul>
                    </div>
                </div>
            }
        </section>
    );
};

export default Navbar;