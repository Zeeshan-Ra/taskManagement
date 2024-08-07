import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImpTasks from "./pages/ImpTasks";
import CompTask from "./pages/CompTask";
import IncompTask from "./pages/IncompTask";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup"
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";


function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    else if (isLoggedIn === false) {
      navigate("/signup")
    }
  }, [])

  return (
    <div className="bg-purple-500 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />} >
          <Route index element={<AllTask />} />
          <Route path="/importantTasks" element={<ImpTasks />} />
          <Route path="/completedTasks" element={<CompTask />} />
          <Route path="/incompletedTasks" element={<IncompTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
