import { Bounce, toast } from "react-toastify";

const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    theme: "light",
    transition: Bounce,
};

export const successAlert = (message) => {
    return toast.success(message, toastConfig);
};

export const warningAlert = (message) => {
    return toast.warning(message, toastConfig);
};

export const errorAlert = (message) => {
    return toast.error(message, toastConfig);
};