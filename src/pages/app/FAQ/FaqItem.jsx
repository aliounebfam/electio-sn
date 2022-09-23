import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';


export default function FaqItem({ question, content, isContentVisible }) {

    const [isFaqItemOpen, setIsFaqItemOpen] = useState(false);

    useEffect(() => {
        setIsFaqItemOpen(isContentVisible);
    }, [])

    const handleClick = () => setIsFaqItemOpen(!isFaqItemOpen);

    return (
        <Tooltip title="Cliquez pour voir le contenu" placement='top' arrow>
            <div onClick={handleClick} className={isFaqItemOpen ? "transition-all duration-300 bg-white border border-gray-200 shadow-lg shadow-violet-600/30 cursor-pointer hover:bg-gray-50" : "shadow-sm transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100"}>
                <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6">
                    <span className="flex text-lg text-violet-900 font-Hind"> {question} </span>

                    <svg className={isFaqItemOpen ? "rotate-180 w-6 h-6 text-gray-400" : "w-6 h-6 text-gray-400"} xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div className={isFaqItemOpen ? "px-4 pb-5 sm:px-6 sm:pb-6" : "hidden px-4 pb-5 sm:px-6 sm:pb-6"} >
                    <p>{content}</p>
                </div>
            </div >
        </Tooltip>
    )
}