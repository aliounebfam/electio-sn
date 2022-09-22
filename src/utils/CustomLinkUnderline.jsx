import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function CustomLinkUnderline({ text, path, className, isNavLink = false }) {

    return (
        isNavLink ? <NavLink
            className={({ isActive }) =>
                isActive ? (className + " select-none underline decoration-violet-600 underline-offset-[9px] decoration-2 bg-gray-800 p-3 rounded-md") : (className + " before:absolute relative before:bg-violet-600 before:w-full before:h-[1.8px] before:origin-[100%_50%] before:top-full before:left-0 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 hover:before:origin-[0_50%]")
            }
            to={path}
            end>
            {text}
        </NavLink> : <Link
            className={className + " before:absolute relative before:bg-violet-600 before:w-full before:h-[1.8px] before:origin-[100%_50%] before:top-full before:left-0 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 hover:before:origin-[0_50%]"}
            to={path}
        >
            {text}
        </Link>
    )
}