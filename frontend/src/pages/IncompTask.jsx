import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import axios from 'axios'

const IncompTask = () => {

  const [Task, setTask] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:8200/api/v2/get-incomplete-task",
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
    <div>
      <Cards home={"false"} Task={Task}/>
    </div>
  )
}

export default IncompTask
