import { Skeleton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllElectionsInProgressStateOrInStoppedState } from '../../../services/dashboard/ElectionService'
import PresidentialElectionCardItem from './PresidentialElectionCardItem'
import { Tooltip } from '@mui/material';

export default function PresidentialElection() {

    const [elections, setElections] = useState([]);
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        getAllElectionsInProgressStateOrInStoppedState()
            .then(r => {
                if (r) {
                    if (r.length != 1 || !r.includes(undefined))
                        setElections(r)
                }
            })
            .finally(() => setIsFetching(false));
    }, [])


    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className='relative shadow-lg shadow-violet-600/10 bg-gray-800'>
                <img src="./assets/images/drapeau-senegal.jpg" className='rounded-sm drop-shadow-2xl h-56 w-full object-cover backdrop-blur-md object-center' alt="drapeau du Sénégal" loading="lazy" />
                <div aria-hidden="true" style={{ backgroundColor: "rgba(17, 24, 39,0.5)" }} className={"absolute inset-0 w-full h-56 backdrop-blur-sm "}></div>
            </div>
            <div className="mx-auto max-w-[1200px]">
                <div className='flex-1 lg:p-12 p-8 lg:pb-5 pb-3 bg-gray-300/5'>
                    <div className='text-center select-none font-Hind text-xl md:text-2xl uppercase mb-4'>
                        <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                            Liste des élections présidentielles
                        </span>
                    </div>
                </div>

                <section className="pb-10">
                    <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-6 pt-0">
                        <div className={(isFetching || !elections.length == 0) ? "grid gap-8 sm:grid-cols-2 md:grid-cols-3" : "h-64"}>
                            {
                                isFetching ?
                                    (
                                        <>
                                            <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"360px"} />
                                            <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"360px"} />
                                            <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"360px"} />
                                        </>
                                    ) : elections.length == 0 ?
                                        (
                                            <>
                                                <Tooltip title="Aucune élection en cours ou terminée" placement='top' arrow followCursor>
                                                    <lottie-player src="./assets/lotties/not-found.json" background="transparent" speed="1" loop autoplay></lottie-player>
                                                </Tooltip>
                                            </>
                                        ) :
                                        elections?.map(election => (
                                            <PresidentialElectionCardItem key={election?.id} year={election?.year} />
                                        ))
                            }
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
