import React from 'react';
import '../../CSS/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaComment, FaSignOutAlt } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { MdOutlineLocalLibrary } from 'react-icons/md';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className='sidebar'>
      <Link
        to='/conversation'
        className={`logo ${location.pathname === '/conversation' ? 'active' : ''}`}
      >
        <FaComment />
      </Link>
      <Link
        to='/video'
        className={`logo ${location.pathname === '/video' ? 'active' : ''}`}
      >
        <FiVideo />
      </Link>
      <Link
        to='/contact'
        className={`logo ${location.pathname === '/contact' ? 'active' : ''}`}
      >
        <RiContactsBook2Fill />
      </Link>
      <Link
        to='/library'
        className={`logo ${location.pathname === '/library' ? 'active' : ''}`}
      >
        <MdOutlineLocalLibrary />
      </Link>
      <Link
        to='/login'
        className={`logo ${location.pathname === '/login' ? 'active' : ''}`}
      >
        <FaSignOutAlt />
      </Link>
    </aside>
  );
}
