import React from 'react'
import '../../CSS/ChatContainer.css'



export default function ChatHistory() {
  return (
    <div className='chat-history'>
      <div className='detail-header'>
        <h5>History</h5>
        <button className='reply-btn'>Reply</button>
      </div>
      <p className='message'>Message</p>
    </div>
  )
}
