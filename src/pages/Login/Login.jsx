import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import loginImage from "../../assets/login-register.jpg";
import { MdEmail } from "react-icons/md";
import Social from "../../components/Social";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { errorAlert, successAlert } from "../../toastify/toastify";
import Spinner from "../../components/Spinner";

const Login = () => {
    const { signInUser, setUser } = useAuth();
    const [isEyeOpen, setIsEyeOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const handleLogin = async (data) => {
        try{
            setIsLoading(true);
            const fbRes = await signInUser(data.email, data.password);
            setUser(fbRes.user);

            reset();
            successAlert("Login successful.");
            navigate("/")
        } catch(error){
            errorAlert("Email or password invalid!");
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-5 py-5 sm:py-10 md:py-12 lg:py-16">
            <div className="border border-teal grid grid-cols-1 md:grid-cols-2">
                <figure className="relative">
                    <img className="max-h-fit" src={loginImage} />
                    <div className="absolute w-full top-1/2 -translate-y-1/2 bg-black/30 p-5">
                        <h2 className="text-2xl text-white font-bold text-center ">Access Your Adventure - Login to Explore</h2>
                    </div>
                </figure>

                <div className="flex flex-col justify-center px-5 mt-5 md:mt-0">
                    {/* heading */}
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-teal">Login Your Account</h2>

                    {/* form */}
                    <div className="max-w-5xl pt-5">
                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3 text-center">
                            <label className="input input-bordered flex items-center gap-2">
                                <MdEmail className="text-xl opacity-70" />
                                <input type="email" {...register("email", { required: "Email is required." })} className="grow" placeholder="Email" />
                            </label>
                            <p className="text-left text-red-600">{errors.email?.message}</p>

                            <label className="input input-bordered flex items-center gap-2">
                                <FaKey className="text-xl opacity-70" />
                                <input type={`${isEyeOpen ? "password" : "text"}`} {...register("password", { required: "Password is required." })} className="grow" placeholder="Password" />
                                {
                                    isEyeOpen ? <FaEye className="opacity-70 cursor-pointer" onClick={() => setIsEyeOpen(false)}></FaEye> : <FaEyeSlash className="opacity-70 cursor-pointer" onClick={() => setIsEyeOpen(true)}></FaEyeSlash>
                                }
                            </label>
                            <p className="text-left text-red-600">{errors.password?.message}</p>

                            <button type="submit" className="w-32 h-12 rounded-full text-lg font-semibold text-white bg-teal active:scale-95 duration-100 ease-in-out transition-all">{isLoading ? <Spinner></Spinner> : "Login"}</button>
                        </form>
                    </div>

                    <div className="divider pt-5">OR</div>

                    {/* social icons */}
                    <Social></Social>
                    <p className="text-center my-5">Don"t have an account? <Link to="/register" className="font-semibold underline text-teal">Register</Link></p>

                </div>
            </div>
        </section>
    );
};

export default Login;