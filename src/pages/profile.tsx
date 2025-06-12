import { Button, Card } from "flowbite-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, autoLogIn } = useAuth();
    const navigate = useNavigate();
    const moveToEditProfilePage = () => { navigate('/edit-profile'); }
    { !user && autoLogIn(); }

    return (
        <div className="flex min-h-screen flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Profile Page</h1>
            <p className="text-xl dark:text-white">Welcome {user?.name.first}</p>
            {user && <Card className="usersCard" imgSrc={user.image.url}>

                <p>Name: {user.name.first} {user.name.middle} {user.name.last}</p>
                <p> Phone: {user.phone} </p>
                <p> Email: {user.email} </p>
                <p> Adress: {user.address.state} {user.address.country} {user.address.city} {user.address.street} {user.address.houseNumber}</p>
                <p> isBusiness: {user.isBusiness ? "yes" : "no"}</p>
            </Card>}

            <Button onClick={moveToEditProfilePage} className="mb-1">Edit your details</Button>
        </div>
    );
};

export default Profile;
