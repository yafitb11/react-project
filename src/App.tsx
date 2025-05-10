
import MyFooter from "./components/footer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import ErrorPage from "./pages/error";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import RouteGuard from "./components/routguard";

function App() {
  return (
    <>

      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<RouteGuard>
          <Profile />
        </RouteGuard>}></Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      <br></br>
      <MyFooter></MyFooter>

    </>
  );
}

export default App;
