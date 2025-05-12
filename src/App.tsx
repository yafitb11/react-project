
import MyFooter from "./components/footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ErrorPage from "./pages/error";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import RouteGuard from "./components/routguard";
import Favorites from "./pages/Favorites";
import CreateCard from "./pages/createCard";
import CardDetails from "./pages/cardDetails";

function App() {
  return (
    <>

      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/*" element={<ErrorPage />} />

        <Route path="/home" element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/card/:id" element={<CardDetails />} />

        <Route path="/register" element={<Register />}></Route>

        <Route path="/profile" element={<RouteGuard>
          <Profile />
        </RouteGuard>}></Route>

        <Route path="/profile" element={<RouteGuard>
          <Favorites />
        </RouteGuard>}></Route>

        <Route path="/create-card" element={<RouteGuard isBiz={true}>
          <CreateCard />
        </RouteGuard>}></Route>

      </Routes>

      <br></br>
      <MyFooter></MyFooter>

    </>
  );
}

export default App;
