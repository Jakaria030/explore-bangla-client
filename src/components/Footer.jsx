import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <section className="bg-teal py-10">
            <footer className="max-w-8xl mx-auto px-5">
                <div className="footer gap-5 md:gap-10">
                    <nav>
                        <Link to="/" className="flex items-center gap-2">
                            <figure className="size-12 bg-white rounded-full flex items-center justify-center">
                                <img className="size-8 mx-auto" src={logo} alt="Logo" />
                            </figure>
                            <h2 className="text-xl text-white font-semibold">Explore <span className="text-orange">Bangla</span></h2>
                        </Link>
                        <p className="text-white">Explore Bangla: Your Trusted Travel Guide.</p>
                        <address className="text-white">Katiadi, Kishoreganj - 2310</address>
                    </nav>

                    <nav>
                        <h6 className="text-xl font-semibold uppercase opacity-100 text-white">Services</h6>
                        <Link to="/" className="link link-hover text-white text-md">Home</Link>
                        <Link to="/community" className="link link-hover text-white text-md">Community</Link>
                        <Link to="/trips" className="link link-hover text-white text-md">Trips</Link>
                        <Link to="/about" className="link link-hover text-white text-md">About Us</Link>
                    </nav>

                    <nav>
                        <h6 className="text-xl font-semibold uppercase opacity-100 text-white">Social</h6>
                        <div className="grid grid-flow-col gap-4">
                            <Link to="https://www.facebook.com/gulam.jakaria.732339">
                                <FaFacebook className="text-2xl text-white"></FaFacebook>
                            </Link>
                            <Link to="https://www.linkedin.com/in/gulam-jakaria-e4/">
                                <FaLinkedin className="text-2xl text-white"></FaLinkedin>
                            </Link>
                            <Link to="https://github.com/Jakaria030">
                                <FaGithub className="text-2xl text-white"></FaGithub>
                            </Link>
                        </div>
                    </nav>
                </div>
            </footer>
        </section>
    );
};

export default Footer;