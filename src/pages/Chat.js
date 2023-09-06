import React, { useState } from 'react'
import '../CSS/ChatContainer.css'
import ChatDetails from '../components/conversation/ChatDetails'
import ChatMid from '../components/conversation/ChatMid'
import ChatHistory from '../components/conversation/ChatHistory'


export default function Chat() {

  return (
    <>
    <h3 className='chat-container'>
      <ChatDetails />
      <div className='chat-mid'> <ChatMid /></div>
      <ChatHistory />
    </h3>
    </>
  )
}
