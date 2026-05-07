import React from 'react'
import './SmallSideBar.css'
import { PiBarbellLight } from "react-icons/pi";
import { useDashboardContext } from '../../Pages/DashboardLayout';
import NavLinks from '../NavLinks/NavLinks';
import { FaTimes } from 'react-icons/fa'

const SmallSideBar = () => {
  const {showSidebar, toggleSideBar} = useDashboardContext();
  return (
    <div className="small-sidebar">
      <div className={showSidebar ?
      'sidebar-container show-sidebar':'sidebar-container'}>
          <div className="content">
            <button type='button' className='close-btn' onClick={toggleSideBar}>
              <FaTimes/>
            </button>
            <header>
              <PiBarbellLight size={100} color='#0099ff'/>
            </header>
            <NavLinks/>
          </div>
      </div>
    </div>

  )
}

export default SmallSideBar