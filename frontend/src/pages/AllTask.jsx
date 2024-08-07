import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import { MdAddBox } from "react-icons/md";
import InputData from '../components/InputData';
import axios from 'axios';

const AllTask = () => {


  const [inputDiv, setInputDiv] = useState("hidden");
  const [Task, setTask] = useState();
  
  const [updatedData, setUpdatedData] = useState({id: "", title:"", desc:""});

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
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  })


  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddBox className='text-3xl hover:scale-125 transition-all duration-300' />
          </button>
        </div>
        {Task && <Cards home={"true"} setInputDiv={setInputDiv} Task={Task.tasks} setUpdatedData={setUpdatedData} setTask={setTask}  />}
      </div>
      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData}  />
    </>
  )
}

export default AllTask
