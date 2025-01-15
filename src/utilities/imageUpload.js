import axios from "axios";

export const imageUpload = async (image) => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const imgbbRes = await axios.post(image_hosting_api, image, {
        headers: {
            "content-type": "multipart/form-data"
        }
    });

    return imgbbRes;
}