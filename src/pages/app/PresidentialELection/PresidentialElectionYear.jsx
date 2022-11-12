import { Skeleton } from '@mui/material';
import { doc, onSnapshot, query, where } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { electionCollectionRef } from '../../../services/dashboard/ElectionService';
import { getAllCandidateFromSpecificYear } from '../../../services/dashboard/VoterService';
import { db } from '../../../services/firebase';

export default function PresidentialElectionYear() {
    const { year } = useParams();
    const [election, setElection] = useState();
    const [candidates, setCandidates] = useState([]);
    const [voteData, setVoteData] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const getCandidates = () => {
        setIsFetchingData(true)
        getAllCandidateFromSpecificYear(new Date().getFullYear())
            .then((response) => {
                if (!response.error)
                    setCandidates(response)
                else
                    enqueueSnackbar(response.message, { variant: 'error' })
            })
            .finally(() => setIsFetchingData(false))
    };

    useEffect(() => {
        getCandidates();

        const electionQuery = query(electionCollectionRef, where("year", "==", Number(year)));
        onSnapshot(electionQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setElection(doc.data());
            });
        });

        onSnapshot(doc(db, "votes", year.toString()), (doc) => {
            setVoteData(doc.data())
        });

    }, []);


    candidates.sort(
        (first, second) => {
            if (voteData.candidates[first.id] == undefined) {
                voteData.candidates[first.id] = 0
            }
            if (voteData.candidates[second.id] == undefined) {
                voteData.candidates[second.id] = 0
            }

            if (voteData.candidates[first.id] > voteData.candidates[second.id])
                return -1
            else if (voteData.candidates[first.id] < voteData.candidates[second.id])
                return 1
            else
                if (first.firstName > second.firstName)
                    return 1
                else
                    return -1
        }
    )


    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className="mx-auto max-w-[1200px]">
                <div className='flex-1 lg:p-12 p-8 lg:pb-5 pb-3 bg-gray-300/5'>
                    <div className='text-center select-none font-Hind text-xl md:text-2xl mb-4'>
                        <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                            Élection présidentielle de {year}
                        </span>
                    </div>
                    <div className='pt-5  font-Hind font-medium text-2xl'>
                        Statut de l'élection :
                        <span className={(election?.state == "stopped" ? "bg-red-600" : "bg-violet-700") + ' inline-block mb-4 text-white rounded-md px-2 pt-1 ml-3 text-md'}>
                            {
                                election?.state == "stopped" ? "Terminée" : "En cours"
                            }
                        </span>
                    </div>
                    <section className='pt-7'>
                        <h1 className='text-2xl font-Hind '>
                            Liste des candidats :
                        </h1>
                        <div className="pt-3 pb-14">
                            <div className="xl:container mx-auto px-6 md:px-12">
                                <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {
                                        isFetchingData ? (
                                            <>
                                                <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"380px"} />
                                                <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"380px"} />
                                                <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"380px"} />
                                                <Skeleton animation="wave" sx={{ bgcolor: '#334155', borderRadius: "12px", color: "red" }} variant="rounded" height={"380px"} />
                                            </>
                                        ) :
                                            candidates?.map((candidate) => (
                                                <div key={candidate.id} className="rounded-xl group relative space-y-6 overflow-hidden">
                                                    <img
                                                        className="mx-auto h-96 w-full grayscale object-cover transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                                        src={candidate.photo}
                                                        alt="woman"
                                                        loading="lazy"
                                                        width="640"
                                                        height="805"
                                                    />
                                                    <div className="absolute bottom-0 rounded-b-xl inset-x-0 h-32 min-h-fit max-h-32 mt-auto px-4 py-5 bg-gray-800 translate-y-16 transition duration-500 ease-in-out group-hover:translate-y-0">
                                                        <div className='text-center'>
                                                            <h4 className="text-xl font-Hind font-semibold text-white ">{candidate.lastName + " " + candidate.firstName}</h4>
                                                            <p className="mt-3 text-md text-gray-100 overflow-hidden overflow-ellipsis">{candidate.dateOfBirth + " à " + candidate.placeOfBirth}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h1 className='text-2xl font-Hind '>
                            {"Résultats " + (election?.state == "stopped" ? "définitifs" : "provisoires") + " :"}
                        </h1>
                        <div>
                            <span className='text-xl font-Hind mt-3 block italic'>Nombre total de votes par candidat</span>
                            <ul className='list-decimal list-outside text-xl ml-10 space-y-5 mt-2'>
                                {
                                    candidates.map(
                                        (candidate, index) => (
                                            <Fragment key={candidate.id}>

                                                <li key={candidate.id}>
                                                    {candidate.lastName + " " + candidate.firstName} : {voteData.candidates[candidate.id] ? voteData.candidates[candidate.id] : 0}
                                                </li>
                                            </Fragment>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
