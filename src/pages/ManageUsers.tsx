import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Tuser } from "../types/userType";


const ManageUsers = () => {

    const [users, setUsers] = useState<Tuser[]>([]);
    const [spiner, setspiner] = useState<boolean>(false);

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


    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Users Page</h1>

            {users?.map((user) => {

                return (
                    <Card key={user._id} id={user._id} className="h-[500px] w-1/4">
                        <h2>{user.name.first}</h2>


                    </Card>
                );
            })}

            {spiner && (
                <Spinner color="purple" aria-label="Purple spinner example" />
            )}

        </div>
    );
};

export default ManageUsers;







