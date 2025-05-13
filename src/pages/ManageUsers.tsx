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
            try {
                setspiner(true)
                const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck";

                const token = localStorage.getItem("token");

                if (adminToken == token) {
                    axios.defaults.headers.common["x-auth-token"] = token;
                    const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",);
                    setUsers(response.data);
                } else {
                    return (<>
                        <h1>you are not an admin!</h1>
                    </>)
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
                toast.error("something's wrong");
            } finally { setspiner(false) }
        };
        getUsers();
    }, []);


    return (
        <div className="flex flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Home Page</h1>
            <p className="text-lg">Welcome Home!</p>

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







