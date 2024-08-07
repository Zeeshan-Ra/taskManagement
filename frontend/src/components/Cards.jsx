import axios from 'axios';
import React from 'react'
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdAddBox } from "react-icons/md";

const Cards = ({ home, setInputDiv, Task, setUpdatedData, setTask }) => {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }


    const handsleCompleteTask = async (id) => {
        try {
            const response = await axios.put(`https://taskmanagementbackend-0x02.onrender.com/api/v2/update-comp-task/${id}`, {}, { headers });
        } catch (error) {
            console.log(error)
        }
    }

    const handleImportant = async (id) => {
        try {
            const response = await axios.put(`https://taskmanagementbackend-0x02.onrender.com/api/v2/update-imp-task/${id}`, {}, { headers });
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://taskmanagementbackend-0x02.onrender.com/api/v2/delete-task/${id}`, { headers });
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id, title, desc) => {
        setInputDiv("fixed");
        setUpdatedData({ id: id, title: title, desc: desc })
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {Task && Task.map((items, i) => (
                    <div className='flex flex-col justify-between bg-slate-100 text-gray-800 rounded-xl p-4'>
                        <div >
                            <h3 className='text-2xl font-semibold'>{items.title}</h3>
                            <p className='text-gray-500 my-2 text-m'>{items.desc}</p>
                        </div>
                        <div className='mt-4 w-full flex items-center'>
                            <button className={`${items.complete === false ? "bg-red-500" : "bg-green-500"} text-sm text-white px-2 py-1 rounded`} onClick={() => handsleCompleteTask(items._id)}>{items.complete === true ? "Completed" : "Incomplete"}</button>
                            <div className='p-2 w-3/6 text-lg flex justify-around'>
                                <button onClick={() => handleImportant(items._id)} className={`${items.important === false ? "text-slate-800" : "text-red-600"}`}><FaHeart /></button>
                                <button onClick={() => handleUpdate(items._id, items.title, items.desc)}><FaEdit /></button>
                                <button onClick={() => handleDelete(items._id)}><MdDeleteForever /></button>
                            </div>
                        </div>
                    </div>
            ))}
            {home === "true" && (<div onClick={() => setInputDiv("fixed")} className='flex flex-col justify-center items-center bg-slate-100 text-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300'>
                <MdAddBox className='text-5xl' />
                <h2 className='text-2xl font-bold mt-4'>ADD TASK</h2>
            </div>)}
        </div>
    )
}

export default Cards
