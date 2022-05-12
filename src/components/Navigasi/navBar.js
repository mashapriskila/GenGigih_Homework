import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slice/access-slice';
import Button from '../Button/btn';
import "./nav.css";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div>
       
        <h1>My Muse</h1>
          <Button className='logout' onClick={() => dispatch(logout())}>Logout</Button>
  
      </div>
    </nav>
  )
}
