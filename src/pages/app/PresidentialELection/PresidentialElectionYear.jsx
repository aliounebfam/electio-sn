import { useParams } from 'react-router-dom'

export default function PresidentialElectionYear() {

    const { year } = useParams();

    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className="mx-auto max-w-[1200px]">
                <div className='flex-1 lg:p-12 p-8 lg:pb-5 pb-3 bg-gray-300/5'>
                    <div className='text-center select-none font-Hind text-xl md:text-2xl mb-4'>
                        <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                            Élection présidentielle de {year}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
