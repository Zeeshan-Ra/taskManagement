import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-4'>
      <div className=' w-1/6 border-r-2 border-transparent  rounded-xl p-4 flex flex-col justify-between'><Sidebar /></div>
      <div className=' w-5/6 border-l-2 border-transparent shadow-xl shadow-purple-900 rounded-xl p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
