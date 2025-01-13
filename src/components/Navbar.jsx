import { MdClose, MdMenu } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {

    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/community">Community</NavLink>
        <NavLink to="/trips">Trips</NavLink>
        <NavLink to="/about">About Us</NavLink>
    </>;

    return (
        <section className="bg-teal py-5">
            <div className="max-w-8xl mx-auto px-5">
                <div className="flex items-center justify-between">
                    {/* left side content */}
                    <div className="flex items-center gap-2">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="md:hidden">
                                <MdMenu className="text-3xl text-white "></MdMenu>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-md dropdown-content bg-gray rounded-sm z-[1] border-t-4 border-orange mt-5 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2">
                            <figure className="size-12 bg-white rounded-full hidden sm:flex items-center justify-center">
                                <img className="size-8 mx-auto" src={logo} alt="Logo" />
                            </figure>
                            <h2 className="text-xl text-white font-semibold">Explore <span className="text-orange">Bangla</span></h2>
                        </Link>
                    </div>

                    {/* right side content */}
                    <div className="flex items-center gap-5">
                        <div className=" hidden md:flex">
                            <ul className="flex items-center gap-3 text-white text-lg">
                                {links}
                            </ul>
                        </div>
                        <button className="px-4 py-1 sm:py-2 bg-orange rounded-sm font-semibold text-white">Login</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;