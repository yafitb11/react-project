import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type RouteGuardProps = {
    children: ReactNode;
    isBiz?: boolean;
    isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
    const { children, isBiz, isAdmin } = props;

    const user = useSelector((state: TRootState) => state.userSlice.user);

    if (!user) {
        return (
            <div>
                <h1>you are not logged in, please log-in.</h1>
                <Link to="/login">log in</Link>
            </div>)
    }

    if (isBiz && !user.isBusiness) {
        return <Navigate to="/" />;
    }
    if (isAdmin && !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};


export default RouteGuard;