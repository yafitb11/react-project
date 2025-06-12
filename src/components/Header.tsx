import { Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { searchActions } from "../store/searchSlice";
import { IoSearchSharp } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <Navbar fluid rounded className="bg-slate-800">
      <Navbar.Brand as={Link} to={"/about"} href="/about">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          BCard
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

        {!user && (<Navbar.Link as={Link} to={"/signin"} href="/signin" className="text-white">
          Sign In
        </Navbar.Link>)}

        {!user && (
          <Navbar.Link as={Link} to={"/register"} href="/register" className="text-white">
            Register
          </Navbar.Link>)}


        {user !== null && (
          <Navbar.Link className="cursor-pointer text-white"
            onClick={() => {
              dispatch(userActions.logout());
              localStorage.setItem("token", "");
            }}>
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

        {user !== null && (
          <Navbar.Link as={Link} to={"/my-cards"} href="/my-cards" className="text-white">
            My Cards
          </Navbar.Link>
        )}

        {user && user.isBusiness && (
          <Navbar.Link as={Link} to={"/create-card"} href="/create-card" className="text-white">
            Create Card
          </Navbar.Link>
        )}

        {user && user.isAdmin && (
          <Navbar.Link as={Link} to={"/manage-users"} href="/manage-users" className="text-white">
            Manage Users
          </Navbar.Link>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;