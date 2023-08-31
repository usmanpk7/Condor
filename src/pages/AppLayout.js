import React from 'react'
import Header from '../components/conversation/Header'
import Sidebar from '../components/conversation/Sidebar'
import Chat from './Chat'


export default function Applayout() {
  return (
    <div className='layout'>
      <Header />
      <Sidebar />
      <Chat />
    </div>
  )
}
