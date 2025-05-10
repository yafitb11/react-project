import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();
    const goHome = () => { navigate("/") }
    return <>
        <h1>Error 404!!</h1>
        <p>page not found</p>

        <Button onClick={goHome}>go home</Button>
        <Link to="/about">go to about</Link>

    </>

}

export default ErrorPage;