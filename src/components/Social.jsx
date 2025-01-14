import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Social = () => {
    return (
        <div className='flex gap-3 my-3 justify-center'>
            <button className='p-3 bg-teal/20 rounded-md'>
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