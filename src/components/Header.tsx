import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { TRootState } from "../store/store";
import { searchActions } from "../store/searchSlice";
import { IoSearchSharp } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Navbar fluid rounded className="bg-slate-800">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          My App
        </span>
      </Navbar.Brand>

      <Navbar.Brand>
        <TextInput
          rightIcon={IoSearchSharp}
          type="search" onChange={(e) =>
            dispatch(searchActions.setSearchWord(e.target.value))}></TextInput>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to={"/"} href="/" className="text-white">
          Home
        </Navbar.Link>

        <Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-white">
          Sign In
        </Navbar.Link>

        <Navbar.Link as={Link} to={"/register"} href="/register" className="text-white">
          Register
        </Navbar.Link>


        {user !== null && (
          <Navbar.Link className="cursor-pointer text-white"
            onClick={() => dispatch(userActions.logout())}>
            Sign Out
          </Navbar.Link>)}

        {user !== null && (
          <Navbar.Link as={Link} to={"/profile"} href="/profile" className="text-white">
            Profile
          </Navbar.Link>
        )}


        {user !== null && (
          <Navbar.Link as={Link} to={"/favorites"} href="/favorites" className="text-white">
            Favorites
          </Navbar.Link>
        )}

        {user && user.isBusiness && (
          <Navbar.Link as={Link} to={"/create-card"} href="/create-card" className="text-white">
            Create Card
          </Navbar.Link>
        )}


      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;