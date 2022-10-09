import React from 'react'
import { NavLink } from 'react-router-dom'
export default function AsideNavbarItem({ icon, text, path }) {
    return (
        <div className='relative'>
            <NavLink to={path} className={({ isActive }) =>
                (isActive ? "before:absolute before:w-[5px] before:h-14 before:bg-violet-600 before:rounded-r-md before:-inset-x-6 before:-inset-y-[14px] text-white" : "text-gray-400 hover:text-white") + " flex items-center space-x-3"
            } end>
                {icon}
                <span>
                    {text}
                </span>
            </NavLink>
        </div >
    )
}
