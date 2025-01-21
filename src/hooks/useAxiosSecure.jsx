import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
    // baseURL: "https://explore-bangla-server-phi.vercel.app"
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useAuth();

    // request interceptor for add authorization token
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    // intercepts 401 and 403
    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async(error) => {
        const status = error.response.status;
        console.log("Status error in the interceptors", status);
        
        if(status === 401 || status === 403){
            await signOutUser();
            navigate("/login");
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;