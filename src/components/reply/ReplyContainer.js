import React, { useContext } from 'react'
import { FaTimes, FaChevronLeft  } from 'react-icons/fa'
import { BsPen } from 'react-icons/bs'; // Bootstrap Icons
import { BsCameraVideo } from 'react-icons/bs'; // Bootstrap Icons
import { AiOutlineAudio } from 'react-icons/ai'

import '../../CSS/ReplyContainer.css'
import { useNavigate } from 'react-router';
import { GlobalContext } from '../../contextApi/Context';

export default function ReplyContainer() {
  const {selectedUser}=useContext(GlobalContext)
  const navigate=useNavigate()

  return (
    <div className='reply-container'>
      <div className='reply-header'>
      <h3 className='user-name'>
  <span className='back-icon'>
    <FaChevronLeft onClick={()=>navigate(-1)}/>
    </span>
  Start Conversation with{' '}
   <span className='selected-user'>
  {selectedUser ? `${selectedUser.firstName.charAt(0).toUpperCase() + selectedUser.firstName.slice(1)} ${selectedUser.lastName.charAt(0).toUpperCase() + selectedUser.lastName.slice(1)}` : ''}
  </span>
</h3>

        <FaTimes onClick={()=>navigate(-1)} />
      </div>

      <div className='reply-body'>
        <p>Send a new message</p>

        <div className='respond-type'>
          <h4>How Would you like to respond?</h4>
          <div className='respond-icon'>
            <div className='video-icon'> <BsCameraVideo  className='icon'/> 
            <span className='text'>Video</span>
             </div>

            <div className='audio-icon'> <AiOutlineAudio  className='icon'/> 
            <span className='text'>Audio</span> 
            </div>

            <div className='text-icon' onClick={()=>navigate('/reply-text-preview')}> <BsPen  className='icon' />
             <span className='text'>Text</span>
              </div>

          </div>
          <h4>You can practice and review before sending</h4>
        </div>
      </div>
    </div>
  )
}
