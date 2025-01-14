import { FaImage, FaKey, FaUser } from "react-icons/fa";
import regisertImage from "../../assets/login-register.jpg";
import { MdEmail } from "react-icons/md";
import Social from "../../components/Social";
import { Link } from "react-router-dom";


const Register = () => {
    return (
        <section className="max-w-5xl mx-auto px-5 py-5 sm:py-10 md:py-12 lg:py-16">
            <div className="border border-teal grid grid-cols-1 md:grid-cols-2">
                <figure className="relative">
                    <img className="max-h-fit" src={regisertImage} />
                    <div className="absolute w-full top-1/2 -translate-y-1/2 bg-black/30 p-5">
                        <h2 className="text-2xl text-white font-bold text-center ">Your Journey, Your Story Let the Adventure Begin!</h2>
                    </div>
                </figure>

                <div className='flex flex-col justify-center px-5 mt-5 md:mt-0'>
                    {/* heading */}
                    <h2 className='text-2xl md:text-3xl font-bold text-center text-teal'>Create An Account</h2>

                    {/* form */}
                    <div className='max-w-5xl pt-5'>
                        <form className='space-y-3 text-center'>
                            <label className='input input-bordered flex items-center gap-2'>
                                <FaUser className='text-xl opacity-70' />
                                <input type='text' name='name' className='grow' placeholder='Name' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaImage className='text-xl opacity-70' />
                                <input type='url' name='photoURL' className='grow' placeholder='Photo' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <MdEmail className='text-xl opacity-70' />
                                <input type='email' name='email' className='grow' placeholder='Email' required />
                            </label>

                            <label className='input input-bordered flex items-center gap-2'>
                                <FaKey className='text-xl opacity-70' />
                                <input type='password' name='password' className='grow' placeholder='Password' required />
                            </label>

                            <button className='w-32 h-12 rounded-full text-lg font-semibold text-white bg-teal active:scale-95 duration-100 ease-in-out transition-all'>Register</button>
                        </form>
                    </div>

                    <div className='divider pt-5'>OR</div>

                    {/* social icons */}
                    <Social></Social>  
                    <p className="text-center">Already have an account? <Link to="/login" className="font-semibold underline text-teal">Login</Link></p>

                </div>
            </div>
        </section>
    );
};

export default Register;