import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Mynav = () => {
    const [path, setpath] = useState("/");
    const location = useLocation();

    useEffect(() => { setpath(location.pathname) }, [location.pathname])

    return (<>
        <Navbar fluid rounded className="bg-gray-800 text-white">
            <NavbarBrand as={Link} href="https://flowbite-react.com">
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    Flowbite React
                </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <Link to="/home" className={`${path === "/home" ? "text-blue-500" : 'text-white'}`}>
                    Home
                </Link>
                <Link to="/about" className={`${path === "/about" ? 'text-blue-500' : 'text-white'}`}>
                    About
                </Link>
                <Link to="/login" className={`${path === "/login" ? 'text-blue-500' : 'text-white'}`}>
                    Login
                </Link>
                <Link to="/register" className={`${path === "/register" ? 'text-blue-500' : 'text-white'}`}>
                    Register
                </Link>
            </NavbarCollapse >
        </Navbar >

    </>)

}
export default Mynav;