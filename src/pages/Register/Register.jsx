import { FaEye, FaEyeSlash, FaImage, FaKey, FaUser } from "react-icons/fa";
import regisertImage from "../../assets/login-register.jpg";
import { MdEmail } from "react-icons/md";
import Social from "../../components/Social";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [isEyeOpen, setIsEyeOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const handleRegister = async (data) => {
        // console.log(data.image[0]);

        try {
            setIsLoading(true);

            // image upload in imgbb site
            const imageFile = { image: data.image[0] };
            const imgbbRes = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            });

            if (imgbbRes.data.success) {
                const newUser = {
                    name: data.name,
                    image: imgbbRes.data.data?.display_url,
                    email: data.email,
                    role: "tourist"
                };

                const createFbRes = await createUser(data.email, data.password);

                if (createFbRes.user?.email) {
                    // user profile update in firebase
                    await updateUserProfile({ displayName: newUser.name, photoURL: newUser.image });
                }

                // user informations upload in database
                const dbRes = await axiosPublic.post("/users", newUser);
                
                reset();
                navigate("/");
                // TODO toast alert set here
                alert('Success')
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-5 py-5 sm:py-10 md:py-12 lg:py-16">
            <div className="border border-teal grid grid-cols-1 md:grid-cols-2">
                <figure className="relative">
                    <img className="max-h-fit" src={regisertImage} />
                    <div className="absolute w-full top-1/2 -translate-y-1/2 bg-black/30 p-5">
                        <h2 className="text-2xl text-white font-bold text-center "> Join the Journey - Start Your Adventure Today!</h2>
                    </div>
                </figure>

                <div className="flex flex-col justify-center px-5 mt-5 md:mt-0">
                    {/* heading */}
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-teal">Create An Account</h2>

                    {/* form */}
                    <div className="max-w-5xl pt-5">
                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-3 text-center">
                            <label className="input input-bordered flex items-center gap-2">
                                <FaUser className="text-xl opacity-70" />
                                <input type="text" {...register("name", { required: "Name is required." })} className="grow" placeholder="Name" />
                            </label>
                            <p className="text-left text-red-600">{errors.name?.message}</p>

                            <label className="input input-bordered flex items-center gap-2">
                                <FaImage className="text-xl opacity-70" />
                                <input type="file" {...register("image", { required: "Image is required." })} className="grow" placeholder="Photo" />
                            </label>
                            <p className="text-left text-red-600">{errors.image?.message}</p>

                            <label className="input input-bordered flex items-center gap-2">
                                <MdEmail className="text-xl opacity-70" />
                                <input type="email" {...register("email", { required: "Email is required." })} className="grow" placeholder="Email" />
                            </label>
                            <p className="text-left text-red-600">{errors.email?.message}</p>

                            <label className="input input-bordered flex items-center gap-2">
                                <FaKey className="text-xl opacity-70" />
                                <input type={`${isEyeOpen ? 'password' : 'text'}`} {...register("password", { required: "Password is required.", pattern: { value: passwordRegex, message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character." } })} className="grow" placeholder="Password" />
                                {
                                    isEyeOpen ? <FaEye className="opacity-70 cursor-pointer" onClick={() => setIsEyeOpen(false)}></FaEye> : <FaEyeSlash className="opacity-70 cursor-pointer" onClick={() => setIsEyeOpen(true)}></FaEyeSlash>
                                }
                            </label>
                            <p className="text-left text-red-600">{errors.password?.message}</p>

                            <button type="submit" className="w-32 h-12 rounded-full text-lg font-semibold text-white bg-teal active:scale-95 duration-100 ease-in-out transition-all">{isLoading ? <Spinner></Spinner> : "Register"}</button>
                        </form>
                    </div>

                    <div className="divider pt-5">OR</div>

                    {/* social icons */}
                    <Social></Social>
                    <p className="text-center">Already have an account? <Link to="/login" className="font-semibold underline text-teal">Login</Link></p>

                </div>
            </div>
        </section>
    );
};

export default Register;