import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const InputData = ({ inputDiv, setInputDiv, updatedData, setUpdatedData }) => {

    const [Data, setData] = useState({ title: "", desc: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }


    useEffect(() => {
        setData({ title: updatedData.title, desc: updatedData.desc })
    }, [updatedData])

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const submitTask = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All fields are required")
        }
        else {
            await axios.post("https://taskmanagementbackend-0x02.onrender.com/api/v2/create-task", Data, { headers })
        };
        setData({ title: "", desc: "" });
        setInputDiv("hidden")
    };

    const updateTask = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All fields are required")
        }
        else {
            await axios.put(`https://taskmanagementbackend-0x02.onrender.com/api/v2/update-task/${updatedData.id}`, Data, { headers })
        };
        setUpdatedData({ id: "", title: "", desc: "" })
        setInputDiv("hidden");
        setData({ title: "", desc: "" });
        alert("Updated Successfully")
    }

    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-700 opacity-80 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-3/6 bg-slate-900 p-4 rounded'>
                    <div className='flex justify-end'><button onClick={() => { setInputDiv("hidden"); setUpdatedData({ id: "", title: "", desc: "" }); setData({ title: "", desc: "" }) }} className='text-2xl'><RxCross2 /></button></div>
                    <input type='text' placeholder='Title' name='title' className='px-3 py-2 w-full rounded my-3 text-slate-900' value={Data.title} onChange={change} />
                    <textarea name='desc' cols={30} rows={10} placeholder='Description...' className='px-3 py-2 w-full rounded my-3 text-slate-900' value={Data.desc} onChange={change}></textarea>
                    <div className='flex justify-center'>
                        {
                            updatedData.id === "" ? <button className='px-3 py-2 bg-blue-400 rounded text-white font-semibold' onClick={submitTask}>Submit</button> :
                                <button className='px-3 py-2 bg-blue-400 rounded text-white font-semibold' onClick={updateTask}>Update</button>
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

export default InputData
