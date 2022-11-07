import { Link } from "react-router-dom";

export default function PresidentialElectionCardItem({ year }) {
    return (
        <Link to={year.toString()} className="hover:shadow-violet-600 transition-shadow duration-500 cursor-pointer p-6 sm:p-8 rounded-2xl border-gray-700 bg-gray-900 shadow-2xl ">
            <div className="relative overflow-hidden rounded-xl">
                <div className='bg-gray-800 text-white select-none h-60 flex justify-center items-center text-6xl italic font-Trykker'>
                    {year}
                </div>
            </div>
            <div className="mt-6 relative">
                <h3 className="text-2xl font-semibold font-Comfortaa text-gray-800 dark:text-white">
                    Élection de {year}
                </h3>
            </div>
        </Link>
    )
}
