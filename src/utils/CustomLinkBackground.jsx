import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomLinkBackground({ text, path, className }) {
    return (
        <Link
            className={className + " underline decoration-violet-500 hover:decoration-2 underline-offset-[3px] bg-[length:100%_0%] bg-gradient-to-t from-violet-200 to-violet-300 hover:text-gray-900 transition-all duration-[360ms] hover:bg-[length:100%_100%] bg-bottom bg-no-repeat"}
            to={path}
        >
            {text}
        </Link>
    )
} '.'