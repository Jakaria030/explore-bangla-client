import { FaSearch } from "react-icons/fa";
import Spinner from "../../../components/Spinner";
import useUsers from "../../../hooks/useUsers";
import HeaderTitle from "../../components/HeaderTitle";
import Select from "react-select"
import { useState } from "react";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const ManageUsers = () => {
    const [searchKey, setSearchKey] = useState("");
    const [filterKey, setFilterKey] = useState("");
    const [page, setPage] = useState(1);

    const { users, isLoading } = useUsers(searchKey, filterKey, page, 10);

    const options = [
        { value: "admin", label: "Admin" },
        { value: "tour-guid", label: "Tour-guid" },
        { value: "tourist", label: "Tourist" }
    ];

    const handlPrev = () => {
        if(page > 1){
            setPage(page - 1);
        }
    }

    const handleNext = () => {
        setPage(page + 1);
    }

    console.log(page);

    return (
        <section>
            {/* heading title */}
            <HeaderTitle title={"Manage user"}></HeaderTitle>

            {/* search and filter */}
            <div className="max-w-5xl mx-auto px-5 py-10">
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <label className="input input-bordered rounded-sm flex items-center gap-2 w-full">
                        <input onChange={(e) => setSearchKey(e.target.value)} type="text" className="grow" placeholder="Enter name or email to search." />
                        <FaSearch className="h-4 w-4 opacity-70"></FaSearch>
                    </label>
                    <div className="w-full">
                        <Select options={options} onChange={(e) => setFilterKey(e.value)} />
                    </div>
                </div>
            </div>

            {/* user table */}
            <div className="max-w-5xl mx-auto px-5">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-lg text-black/80 bg-teal/40">
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isLoading &&
                                users.map((user, indx) => <tr key={indx} className="hover:bg-teal/20">
                                    <td>{indx + 1}</td>
                                    <td>
                                        <div className="size-12 rounded-md">
                                            <img className="rounded-md" src={user.image} />
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        (!isLoading && users.length === 0) && <h1 className="flex items-center justify-center text-2xl text-white py-5 bg-red-400">User Not Found</h1>
                    }
                </div>
            </div>

            {/* pagination */}
            <div className="max-w-5xl mx-auto px-5 py-10">
                <div className="flex justify-between items-center">
                    <button onClick={handlPrev} disabled={page === 1} className={` ${page===1 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}><MdKeyboardArrowLeft className="text-2xl" />Prev</button>
                    <button onClick={handleNext} disabled={users.length < 10} className={`${users.length < 10 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}>Next<MdOutlineKeyboardArrowRight className="text-2xl" /></button>
                </div>
            </div>
        </section>
    );
};

export default ManageUsers;