import { IoInformationCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const linkToAbout = () => { navigate("/about"); }

    return (
        <div className="mt-5 flex items-center justify-center dark:text-white dark:bg-black">
            <IoInformationCircleSharp className="text-2xl"></IoInformationCircleSharp>
            <h3 onClick={linkToAbout} className="cursor-pointer">About</h3>
        </div>
    )

}

export default Footer;