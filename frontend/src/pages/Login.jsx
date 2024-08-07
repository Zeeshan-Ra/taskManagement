import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

  const [data, setData] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/")
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const submit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required")
      }
      else {
        const response = await axios.post("http://localhost:8200/api/v1/login", data);
        setData({ username: "", password: "" })
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded-xl bg-purple-500 shadow-2xl'>
          <h2 className='flex justify-center font-semibold text-3xl my-3'>Login</h2>
          <input type='usernamer' name='username' placeholder='Enter Username' className='bg-white w-full rounded px-3 py-2 my-3' value={data.username} required onChange={handleChange} />
          <input type='password' name='password' placeholder='Enter password' className='bg-white text-black w-full rounded px-3 py-2 my-3' value={data.password} required onChange={handleChange} />
          <div className='flex justify-center'><button className='bg-blue-400 text-xl font-semibold text-white px-3 py-2 my-3 rounded w-48' onClick={submit}>Login</button></div>
          <p>Don't have an account? <span className='text-blue-800'><Link to="/signup">Register</Link></span></p>
      </div>
    </div>
  )
}

export default Login
