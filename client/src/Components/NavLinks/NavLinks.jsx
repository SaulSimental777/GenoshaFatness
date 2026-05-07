import React from 'react'
import links from '../../Utils/links'
import { NavLink  } from 'react-router-dom'
import { useDashboardContext } from '../../Pages/DashboardLayout'
import './NavLinks'

const NavLinks = ({isBigSideBar}) => {
  const {toggleSideBar} = useDashboardContext();

  return (
    <div className="nav-links">
    {links.map((link)=>{
      const{text, path, icon} = link
      return <NavLink to={path} key={text}
      className='nav-link' onClick={isBigSideBar ? null:toggleSideBar}>
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    })}
  </div>
  )
}

export default NavLinks