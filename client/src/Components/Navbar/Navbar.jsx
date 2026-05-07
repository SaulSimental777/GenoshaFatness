import React from 'react'
import './Navbar.css'
import { HiMenuAlt1 } from "react-icons/hi"
import { PiBarbellLight } from "react-icons/pi";
import { useDashboardContext } from '../../Pages/DashboardLayout';
import { IoSettings } from "react-icons/io5";
import { Link } from 'react-router-dom';
import UserSettingsPage from '../../Pages/UserSettingsPage';

const Navbar = () => {
  const {toggleSideBar} = useDashboardContext()
  return (
    <div className="navbar">
        <div className="nav-center">
            <button className="toggle-btn" onClick={toggleSideBar}>
                <HiMenuAlt1 color='#0099ff'/>
            </button>
            <div>
                <div className="logo">
                  <PiBarbellLight size={100} color='#0099ff'/>
                </div>
            </div>
            <div className="btn-container">
              <Link to="user-settings"><div><IoSettings size={30} color='#0099ff'/></div></Link>
            </div>
        </div>
    </div>

  )
}

export default Navbar