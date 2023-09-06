import React from 'react'
import Header from '../components/conversation/Header'
import Sidebar from '../components/conversation/Sidebar'
import { Outlet } from "react-router-dom";


export default function Applayout() {
  return (
    <div className='layout'>
     <Header />
    <Sidebar />

       <Outlet />  {/* Must Use For Routing */}

    </div>
  )
}
