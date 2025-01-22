import { MdMenu } from "react-icons/md";

const HeaderTitle = ({ title }) => {
    return (
        <section className="flex items-center px-5 bg-teal/80 py-5 sticky top-0 backdrop-blur-lg z-40">
            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden text-left">
                <MdMenu className="text-3xl text-black "></MdMenu>
            </label>
            <h2 className="sm:text-2xl mx-auto text-center text-white capitalize font-bold">{title}</h2>
        </section>
    );
};

export default HeaderTitle;