import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { errorAlert, successAlert } from "../toastify/toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const Social = () => {
    const {signInWithGoogle, setUser} = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();
    
    const handleGoogleSignIn = async () => {
        try {
            const fbRes = await signInWithGoogle();
            setUser(fbRes.user);

            if(fbRes.user.email){
                const user = {
                    name: fbRes.user.displayName,
                    image: fbRes.user.photoURL,
                    email: fbRes.user.email,
                    role: "tourist"
                }

                const dbRes = await axiosPublic.get(`/users?email=${fbRes.user.email}`);

                if(dbRes.data.count === 0){
                    await axiosPublic.post("/users", user);
                }
            }
            successAlert("Continue with google success.");
            navigate(`${location.state ? location.state : '/'}`);
        } catch (error) {
            errorAlert("Can't sign in. Please try again.");
            console.log(error);
        }
    };

    return (
        <div className='flex gap-3 my-3 justify-center'>
            <button onClick={handleGoogleSignIn} className='p-3 bg-teal/20 rounded-md'>
                <FaGoogle className='text-2xl' />
            </button>
            <button className='p-3 bg-teal/20 rounded-md'>
                <FaFacebook className='text-2xl' />
            </button>
            <button className='p-3 bg-teal/20 rounded-md'>
                <FaGithub className='text-2xl' />
            </button>
        </div>
    );
};

export default Social;