import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../Access_Token/access-slice.';
import Btn from '../Button/btn';
import '../../App.css'

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="container navbar__nav">
       
        <div className="navbar__menu">
          <Btn onClick={() => dispatch(logout())}>Logout</Btn>
        </div>
      </div>
    </nav>
  )
}
