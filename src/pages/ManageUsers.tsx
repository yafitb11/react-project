import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tuser } from "../types/userType";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";


const ManageUsers = () => {

    const [users, setUsers] = useState<Tuser[]>([]);
    const [spiner, setspiner] = useState<boolean>(false);
    const search = useSelector((state: TRootState) => state.searchSlice.searchWord);

    useEffect(() => {
        const getUsers = async () => {
            console.log("helloe");

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
    }, []);


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



    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Users Page</h1>


            <div className="w-[100%] flex gap-3 flex-wrap p-3 justify-center bg-slate-600">
                {users && filterUsers()?.map((user) => {
                    return (
                        <Card key={user._id} id={user._id} className="h-[500px] w-1/4 mycard" imgSrc={user.image.url}>
                            <h2>{user._id}</h2>
                            <h2>{user.name.first} {user.name.middle} {user.name.last}</h2>
                            <p> Phone: {user.phone} </p>
                            <p> Email: {user.email} </p>
                            <p> Password:{user.password}  </p>
                            <p> Adress: {user.address.state} {user.address.country} {user.address.city} {user.address.street} {user.address.houseNumber}</p>
                            <p> isBusiness: {user.isBusiness ? "yes" : "no"}</p>
                            <p> isAdmin: {user.isAdmin ? "yes" : "no"}</p>

                        </Card>
                    );
                })}
            </div>

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default ManageUsers;







