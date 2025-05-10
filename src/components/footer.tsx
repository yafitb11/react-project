import { IoInformationCircleSharp } from "react-icons/io5";

const MyFooter = () => {
    return (
        <div className="flex flex-col items-center dark:text-white dark:bg-black">
            <IoInformationCircleSharp className="text-2xl"></IoInformationCircleSharp>
            <h3>about</h3>
        </div>
    )

}

export default MyFooter;