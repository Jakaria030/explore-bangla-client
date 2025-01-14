import { FaKey } from "react-icons/fa";
import loginImage from "../../assets/login-register.jpg";
import { MdEmail } from "react-icons/md";
import Social from "../../components/Social";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section className="max-w-5xl mx-auto px-5 py-5 sm:py-10 md:py-12 lg:py-16">
            <div className="border border-teal grid grid-cols-1 md:grid-cols-2">
                <figure className="relative">
                    <img className="max-h-fit" src={loginImage} />
                    <div className="absolute w-full top-1/2 -translate-y-1/2 bg-black/30 p-5">
                        <h2 className="text-2xl text-white font-bold text-center ">Access Your Adventure - Login to Explore</h2>
                    </div>
                </figure>

                <div className='flex flex-col justify-center px-5 mt-5 md:mt-0'>
                    {/* heading */}
                    <h2 className='text-2xl md:text-3xl font-bold text-center text-teal'>Login Your Account</h2>

                    {/* form */}
                    <div className='max-w-5xl pt-5'>
                        <form className='space-y-3 text-center'>
                            <label className='input input-bordered flex items-center gap-2'>
                                <MdEmail className='text-xl opacity-70' />
                                <input type='email' name='email' className='grow' placeholder='Email' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaKey className='text-xl opacity-70' />
                                <input type='password' name='password' className='grow' placeholder='Password' required />
                            </label>

                            <button className='w-32 h-12 rounded-full text-lg font-semibold text-white bg-teal active:scale-95 duration-100 ease-in-out transition-all'>Login</button>
                        </form>
                    </div>

                    <div className='divider pt-5'>OR</div>

                    {/* social icons */}
                    <Social></Social>  
                    <p className="text-center my-5">Don't have an account? <Link to="/register" className="font-semibold underline text-teal">Register</Link></p>

                </div>
            </div>
        </section>
    );
};

export default Login;