import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';

const Signup = () => {

  
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/")
  } 

  const [data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are required")
      }
      else {
        const response = await axios.post("http://localhost:8200/api/v1/signup", data);
        setData({ username: "", email: "", password: "" })
        console.log(response);
        navigate("/login")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded-xl bg-purple-500 shadow-2xl '>
        <h2 className='flex justify-center font-semibold text-3xl my-3'>Register</h2>
        <input type='usernamer' name='username' placeholder='Enter Username' className='bg-white w-full rounded px-3 py-2 my-3' value={data.username} onChange={handleChange} />
        <input type='email' name='email' placeholder='Enter Email' className='bg-white w-full rounded px-3 py-2 my-3' required value={data.email} onChange={handleChange} />
        <input type='password' name='password' placeholder='Enter password' className='bg-white w-full rounded px-3 py-2 my-3' value={data.password} required onChange={handleChange} />
        <div className='flex justify-center'><button className='bg-blue-400 text-xl font-semibold text-white px-3 py-2 my-3 rounded w-48' onClick={submit}>Signup</button></div>
        <p>Already have an account? <span className='text-blue-800'><Link to="/login">Login</Link></span></p>
      </div>
    </div>
  )
}

export default Signup
