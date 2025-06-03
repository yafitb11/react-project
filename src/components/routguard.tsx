import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";

type RouteGuardProps = {
    children: ReactNode;
    isBiz?: boolean;
    isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
    const { children, isBiz, isAdmin } = props;

    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col items-center p-3 gap-2  bg-slate-400">
                <h1>you are not logged in, please log-in.</h1>
                <Link to="/login" className="cursor-pointer font-bold">log in</Link>
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