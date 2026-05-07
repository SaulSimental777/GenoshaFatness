import React from 'react'

import { ImStatsDots } from "react-icons/im";
import { LuPencilLine } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { BiFoodMenu } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { FaNewspaper } from "react-icons/fa6";



const links = [
    {
        text:'Estadisticas', 
        path: '.', 
        icon:<ImStatsDots/>,
    },
    {
        text:'Registro diario', 
        path: 'daily-log', 
        icon:<LuPencilLine/>
    },
    {
        text:'Rutinas', 
        path: 'routine-list', 
        icon:<FaList/>
    },
    {
        text:'Ejercicios', 
        path: 'workout-list', 
        icon:<LiaDumbbellSolid/>
    },
    {
        text:'Recetas', 
        path: 'recipe-list', 
        icon:<BiFoodMenu/>
    },
    {
        text: 'Alimentos',
        path: 'food-list',
        icon: <IoFastFood/>

    },
    {
        text: 'Instructor Virtual',
        path: 'virtual-instructor',
        icon:<TbMessageChatbot/>

    },
    {
        text: 'Noticias',
        path: 'fitness-news',
        icon: <FaNewspaper/>
    },
    {
        text: 'Admin',
        path: 'admin',
        icon:<RiAdminLine/>

    }
]

export default links;