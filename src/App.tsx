
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/Error";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RouteGuard from "./components/Routguard";
import Favorites from "./pages/Favorites";
import CreateCard from "./pages/CreateCard";
import CardDetails from "./pages/CardDetails";
import ManageUsers from "./pages/ManageUsers";
import MyCards from "./pages/MyCards";
import EditProfile from "./pages/EditProfile";
import EditCard from "./pages/EditCard";
import About from "./pages/About";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <>

      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/*" element={<ErrorPage />} />

        <Route path="/home" element={<Home />}></Route>

        <Route path="/about" element={<About />}></Route>

        <Route path="/signin" element={<SignIn />}></Route>

        <Route path="/card/:id" element={<CardDetails />} />

        <Route path="/register" element={<Register />}></Route>

        <Route path="/profile" element={<RouteGuard>
          <Profile />
        </RouteGuard>}></Route>

        <Route path="/favorites" element={<RouteGuard>
          <Favorites />
        </RouteGuard>}></Route>

        <Route path="/my-cards" element={<RouteGuard>
          <MyCards />
        </RouteGuard>}></Route>

        <Route path="/create-card" element={<RouteGuard isBiz={true}>
          <CreateCard />
        </RouteGuard>}></Route>

        <Route path="/manage-users" element={<RouteGuard isAdmin={true}>
          <ManageUsers />
        </RouteGuard>}></Route>

        <Route path="/edit-profile" element={<RouteGuard>
          <EditProfile />
        </RouteGuard>}></Route>

        <Route path="/edit-card/:id" element={<RouteGuard isBiz={true}>
          <EditCard />
        </RouteGuard>}></Route>

        <Route path="/edit-user/:id" element={<RouteGuard isAdmin={true}>
          <EditUser />
        </RouteGuard>}></Route>


      </Routes>

      <Footer></Footer>

    </>
  );
}

export default App;
