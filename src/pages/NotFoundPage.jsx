import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-900" >
            <h1 className="text-9xl font-extrabold text-white tracking-widest" > 404</h1 >
            <div className="bg-violet-800 text-white px-3 text-base rounded rotate-12 absolute" >
                Page non trouvée ou inexistante
            </div >
            <Link to="/">
                <button className="mt-5" >
                    <div
                        className="relative inline-block text-sm font-medium text-white group active:text-gray-200 focus:outline-none focus:ring"
                    >
                        <span
                            className="absolute inset-0 transition-transform translate-x-[2.75px] translate-y-[3.5px] bg-violet-800 group-hover:translate-y-0 group-hover:translate-x-0"
                        >

                        </span >

                        <span className="relative block px-8 py-3 bg-violet-800 border border-current" >
                            Retourner à l'accueil
                        </span >
                    </div>
                </button >
            </Link>
        </main >
    )
}
