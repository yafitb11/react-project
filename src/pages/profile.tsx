import { useSelector } from "react-redux";
import { TRootState } from "../store/store";

const Profile = () => {
    const user = useSelector((state: TRootState) => state.userSlice.user);

    return (
        <div className="flex min-h-screen flex-col items-center justify-start gap-2">
            <h1 className="text-2xl">Profile Page</h1>
            <p className="text-xl dark:text-white">Welcome {user?.name.first}</p>
            <p className="text-lg dark:text-white">
                name: {user?.name.first} {user?.name.middle} {user?.name.last} </p>
            <p className="text-lg dark:text-white">phone: {user?.phone}</p>
            <p className="text-lg dark:text-white">{user?.email}</p>
            <p className="text-lg dark:text-white">
                address:  {user?.address.state}  {user?.address.country}  {user?.address.city}  {user?.address.street}   {user?.address.houseNumber}  {user?.address.zip}
            </p>
        </div>
    );
};

export default Profile;
