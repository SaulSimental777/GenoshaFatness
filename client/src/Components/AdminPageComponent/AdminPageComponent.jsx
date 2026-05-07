import React from 'react'
import { Link } from 'react-router-dom';
import './AdminPageComponent.css'
import { IoFastFood } from "react-icons/io5";
import { GiMuscleUp } from "react-icons/gi";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { BsPatchPlusFill } from "react-icons/bs";


const AdminPageComponent = () => {
  return (
    <div className="admin-container">
        <div className="admin-container-top">
            <Link to= '/home/admin/add-food' style={{textDecoration: 'none', color: 'black'}}>
                <div className="admin-menu-container">
                    <div className="select-container">
                    <TbSquareRoundedPlusFilled size={75} color='#0099ff' className='select-icon'/>
                    <h1>Agregar Comida</h1>
                    </div>
                </div>
            </Link>
            <Link to= '/home/admin/add-workout' style={{textDecoration: 'none', color: 'black'}}>
                <div className="admin-menu-container">
                    <div className="select-container-large">
                        <BsPatchPlusFill size={75} color='#0099ff' className='select-icon-large'/>
                        <h1>Agregar Ejercicio</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="admin-container-bottom">
            <Link to= '/home/admin/all-food' style={{textDecoration: 'none', color: 'black'}}>
            <div className="admin-menu-container">
                <div className="select-container">
                    <IoFastFood size={75} color='#0099ff' className='select-icon'/>
                    <h1>Lista de Comidas</h1>
                </div>
            </div>
            </Link>
            <Link to= '/home/admin/all-workout' style={{textDecoration: 'none', color: 'black'}}>
            <div className="admin-menu-container">
                <div className="select-container-large">
                    <GiMuscleUp size={75} color='#0099ff' className='select-icon-large' />
                    <h1>Lista de Ejercicios</h1>
                </div>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default AdminPageComponent
