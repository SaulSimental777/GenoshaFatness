import React from 'react'
import './BigSidebar.css'
import { PiBarbellLight } from "react-icons/pi";
import NavLinks from '../NavLinks/NavLinks'
import { useDashboardContext } from '../../Pages/DashboardLayout'



const BigSidebar = () => {
  const {showSidebar} = useDashboardContext();
  return (
    <div className="sidebar">
        <div className='sidebar-container show-sidebar'>
        <div className="content">
          <header>
            <PiBarbellLight size={75} color='#0099ff'/>
          </header>
          <NavLinks isBigSideBar/>
        </div>
    </div>
    </div>

  )
}

export default BigSidebar