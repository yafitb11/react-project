import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../store/store";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { userActions } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const user = useSelector((state: TRootState) => state.userSlice.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const login = async (form: { email: string, password: string }) => {
        try {
            const token = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
                form,
            );
            console.log(token.data);
            localStorage.setItem("token", token.data);

            const parsedToken = jwtDecode(token.data) as {
                _id: string;
            };

            axios.defaults.headers.common["x-auth-token"] = token.data;

            const res = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
                parsedToken._id,
            );
            console.log(res.status);

            dispatch(userActions.login(res.data));

            if (res.status === 200) {
                toast.success("Sign In Succseeded", { autoClose: 2000, });
                navigate('/');
            }

        } catch (error) {
            console.log(error);
            toast.error("Sign In Failed", { autoClose: 2000, });
        }
    };

    return { user, login }
};

export default useAuth;