import axios from "axios";
import { Card, Spinner, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tuser } from "../types/userType";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { MdDelete, MdEdit } from "react-icons/md";
import { Pagination } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ManageUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<Tuser[]>([]);
    const [spiner, setspiner] = useState<boolean>(false);
    const search = useSelector((state: TRootState) => state.searchSlice.searchWord);
    const [curPage, setCurPage] = useState<number>(1);
    const [reload, setReload] = useState<boolean>(false);
    const { user, autoLogIn } = useAuth();
    { !user && autoLogIn(); }

    useEffect(() => {
        const getUsers = async () => {
            try {
                setspiner(true)
                const token = localStorage.getItem("token");
                axios.defaults.headers.common["x-auth-token"] = token;
                const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",);
                setUsers(response.data);

            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("something's wrong");
            } finally { setspiner(false) }
        };
        getUsers();
    }, [reload]);


    const filterUsers = () => {
        if (users) {
            return users.filter(
                (user) =>
                    user.name.first.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.middle?.toLowerCase().includes(search.toLowerCase()) ||
                    user.name.last.toLowerCase().includes(search.toLowerCase()) ||
                    user._id.toLowerCase().includes(search.toLowerCase()),
            );
        }
        return users;
    }

    const onPageChange = (page: number) => {
        setCurPage(page);
    }

    const filterByPage = () => {
        const start = (curPage - 1) * 12;
        const end = start + 12;
        return filterUsers().slice(start, end);
    }

    const deleteUser = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common["x-auth-token"] = token;
            const response = await axios.delete(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`);
            console.log(response.data);
            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("something went wrong");
        }
        setReload((reload => !reload));
    };

    const changeBussinessStatus = async (id: string) => { }

    return (
        <div className="flex flex-col items-center justify-start gap-2  bg-slate-400">
            <h1 className="text-2xl">Users Page</h1>


            <div className="w-[100%] flex gap-3 flex-wrap p-3 justify-center bg-slate-600">
                {users && filterByPage()?.map((user) => {
                    return (
                        <Card key={user._id} id={user._id} className="usersCard" imgSrc={user.image.url}>
                            <div>
                                <h2>{user.name.first} {user.name.middle} {user.name.last}</h2>
                                <p>ID: {user._id}</p>
                                <p> Phone: {user.phone} </p>
                                <p> Email: {user.email} </p>
                                <p> Adress: {user.address.state} {user.address.country} {user.address.city} {user.address.street} {user.address.houseNumber}</p>
                                <p> isBusiness: {user.isBusiness ? "yes" : "no"}</p>
                                <p> isAdmin: {user.isAdmin ? "yes" : "no"}</p>
                            </div>
                            <div className="flex justify-center" id="iconsdiv">
                                <MdEdit className="cursor-pointer text-2xl" onClick={() => navigate("/edit-user/" + user._id)}></MdEdit>
                                <MdDelete className="cursor-pointer text-2xl" onClick={() => { deleteUser(user._id) }}></MdDelete>
                                <button className="font-bold" onClick={() => { changeBussinessStatus(user._id) }}>isBis</button>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}
            <div className="flex overflow-x-auto sm:justify-center mb-3">
                <Pagination currentPage={curPage} totalPages={Math.ceil(filterUsers().length / 12)} onPageChange={onPageChange} />
            </div>

        </div>
    );
};

export default ManageUsers;







