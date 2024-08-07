import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { RiCheckDoubleLine } from "react-icons/ri";
import { TbNotebookOff } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import axios from 'axios';


const Sidebar = () => {
    const data = [
        {
            title: "All Tasks",
            icon: <CgNotes />,
            link: "/"
        },
        {
            title: "Important Tasks",
            icon: <MdLabelImportantOutline />,
            link: "/importantTasks"
        },
        {
            title: "completed Tasks",
            icon: <RiCheckDoubleLine />,
            link: "/completedTasks"
        },
        {
            title: "Incompleted Tasks",
            icon: <TbNotebookOff />,
            link: "/incompletedTasks"
        }
    ];


    const [Task, setTask] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        navigate("/login")
    };

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:8200/api/v2/get-all-task",
                    { headers }
                );
                setTask(response.data.data);    
            } catch (error) {
                console.log(error)
            }
        };
        fetch();
    })

    return (
        <>
            {
                Task && (
                    <div>
                        <h2 className='text-xl font-extrabold'>{Task.username}</h2>
                        <h4 className='my-1 text-gray-300 font-bold'>{Task.email}</h4>
                        <hr />
                    </div>
                )
            }
            <div>
                {data.map((items, i) => (
                    <Link to={items.link} key={i} className='my-6 font-bold flex gap-3 items-center cursor-pointer hover:scale-90 transition-all duration-300'>
                        {items.icon}{items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button className='bg-gray-600 text-white font-semibold w-full rounded p-2' onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar
