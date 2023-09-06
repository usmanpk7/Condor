import React, { useContext, useEffect, useState } from 'react'
import '../../CSS/ChatContainer.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'; // Correct package: 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'; // Correct package: 'react-icons/fi'
import { FaSync, FaTimes } from 'react-icons/fa';
import {FiUserPlus} from 'react-icons/fi'
import Modal from 'react-modal';
import { useAddUser } from '../../Hooks/useAddUser';
import { useGetUser } from '../../Hooks/useGetUser';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../../contextApi/Context';
import ActiveContacts from './ActiveContacts';
import CloseContacts from './CloseContacts';




const customStyles1 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'400px'
  },
};

const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'500px'
  },
};


export default function ChatDetails() {
  const [activeTab, setActiveTab] = useState('active');
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [firstName, setfirstName]=useState('')
  const [lastName, setlastName]=useState('')
  const [email, setEmail]=useState('')
  const [selectedItem, setSelectedItem]=useState(null)
  const [query, setQuery]=useState('')

// Retrieve selectedUser from local storage when the component mounts
useEffect(() => {
  const storedUser = localStorage.getItem("selectedUser");
  if (storedUser) {
    setSelectedUser(JSON.parse(storedUser));
  }
}, []);

  const {setSelectedUser, updateSelectedUser}=useContext(GlobalContext)

  const navigate=useNavigate()
  
  const {addNewUser}=useAddUser()

  const { data: contacts } = useGetUser(query);


  function openFirstModal() {
    setFirstModalIsOpen(true);
  }

  function closeFirstModal() {
    setFirstModalIsOpen(false);
  }

  function openSecondModal() {
    setSecondModalIsOpen(true);
  }

  function closeSecondModal() {
    setSecondModalIsOpen(false);
  }

  const handleItemClick = (id) => {
    setSelectedItem(id);

    const user = contacts.find((contact) => contact._id === id);

    // Set the selected user's data
    // setSelectedUser(user);
   updateSelectedUser(user)
  };

  function handleAddUser(e){
    e.preventDefault()

      if(!firstName || !lastName || !email) return

      console.log(firstName, lastName, email)


      addNewUser(
        { firstName, lastName, email},
        {
        onSettled:()=>{
          setEmail('')
          setfirstName('')
          setlastName('')
        }
      }
       )

  }

  const activeTabContent = (
    <ActiveContacts />
  );

  const closeTabContent = (
    <CloseContacts />
  );
  return (
    <div className='chat-details'>
       <div className='detail-header'>
        <h5>Conversation</h5>
        <div className='icons'>
          <AiOutlinePlusCircle onClick={openFirstModal} />
          <FiFilter />
          <FaSync />
        </div>
       </div>

       <div className='tabs'>
       <p
          className={activeTab === 'active' ? 'active-tab' : ''}
          onClick={() => setActiveTab('active')}
        >
            Active
        </p>
        <p
          className={activeTab === 'close' ? 'active-tab' : ''}
          onClick={() => setActiveTab('close')}
        >
          Close
        </p>
       </div>
       
       {activeTab === 'active' ? activeTabContent : closeTabContent}

       {/* First Modal */}

       <Modal
       isOpen={firstModalIsOpen}
       onRequestClose={closeFirstModal}
       style={customStyles1}
       contentLabel="First Modal"
      >
         <div className='modal-header'>
          <h5>Contact</h5>
          <FaTimes  className='cross-icon' onClick={closeFirstModal}/>
         </div>

        <form className='modal-form' onSubmit={(e)=>e.preventDefault()}>
          <input type='text' placeholder='Search' value={query} 
          onChange={(e) => setQuery(e.target.value)}/>
          <FiUserPlus className='userplus-icon' onClick={openSecondModal} />
        </form>

        <ul className='contact-detail'>
  {contacts ? (
    contacts.map((contact) => (
      <li
        className={`contact-item ${selectedItem === contact._id ? 'selected' : ''}`}
        key={contact._id}
        onClick={() => handleItemClick(contact._id)}
      >
        <div className='name'>
          <span>{contact.firstName} {contact.lastName}</span>
        </div>
        <p className='email'>{contact.email}</p>
      </li>
    ))
  ) : (
    <p>Loading contacts...</p>
  )}
    </ul>
    
      <button className='apply-btn' onClick={()=>navigate('/reply')}>Apply</button>
      {/* <ReplyContainer selectedUser={selectedUser} /> */}
      </Modal>


      {/* Second Modal */}

      <Modal
        isOpen={secondModalIsOpen}
        onRequestClose={closeSecondModal}
        style={customStyles2}
        contentLabel="Second Modal"
      >
       
        <div className='modal-header'>
          <h5>Add New Contact</h5>
          <FaTimes className='cross-icon' onClick={closeSecondModal} />
        </div>

        <form onSubmit={handleAddUser}>
          <div className='parent'>
            <div className='child'>
          <label>First Name</label>
          <input type='text' required className='input-field'
           placeholder='Enter First Name' value={firstName}
           onChange={(e)=>setfirstName(e.target.value)}
            />
          </div>
           
           <div className='child'>
          <label>Last Name</label>
          <input type='text' required className='input-field'
           placeholder='Enter Last Name' value={lastName}
           onChange={(e)=>setlastName(e.target.value)}
           />
           </div>
          </div>
           
           <div className='email-part'>
          <label>Email</label>
          <input type='email' required className='input-field-email' 
          placeholder='Enter Email' value={email}
          onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className='btns'>
          <button className='cancel' onClick={closeSecondModal}>Cancel</button>
          <button className='add' type='submit'>Add Contact</button>
          </div>

        </form>
        
      </Modal>
    </div>
  )
}
