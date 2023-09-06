import React from 'react'
import '../../CSS/Header.css'
import { useLogout } from '../../Hooks/useLogout'
// import logout from '../../Services/logout'

export default function Header() {

  const {logout}=useLogout()

  return (
    <div className='chat-header'>
       <h3 className='heading'>Conversations</h3>
       <div className='setting'>
       <p className='user-name'>User Name</p>
       <button className='logout' onClick={logout}>Logout</button>
       </div>
    </div>
  )
}
