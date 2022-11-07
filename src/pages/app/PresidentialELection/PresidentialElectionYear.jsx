import { onSnapshot, query, where } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { electionCollectionRef } from '../../../services/dashboard/ElectionService';
import { getAllCandidateFromSpecificYear } from '../../../services/dashboard/VoterService';

export default function PresidentialElectionYear() {
    const { year } = useParams();
    const [election, setElection] = useState();
    const [candidates, setCandidates] = useState([]);
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

        const q = query(electionCollectionRef, where("year", "==", Number(year)));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setElection(doc.data());
            });
        });

        console.log(candidates);
    }, []);

    return (
        <div className='flex-1 bg-gray-300/25'>
            <div className="mx-auto max-w-[1200px]">
                <div className='flex-1 lg:p-12 p-8 lg:pb-5 pb-3 bg-gray-300/5'>
                    <div className='text-center select-none font-Hind text-xl md:text-2xl mb-4'>
                        <span className="bg-violet-600 text-white pt-[5px] px-2 rounded-md">
                            Élection présidentielle de {year}
                        </span>
                    </div>
                    <div className='pt-5 underline font-Hind font-medium text-xl'>
                        Statut de l'élection :
                        <span className={(election?.state == "stopped" ? "bg-red-600" : "bg-violet-700") + ' inline-block mb-4 text-white rounded-md px-2 pt-1 ml-3 text-md'}>
                            {
                                election?.state == "stopped" ? "Terminée" : "En cours"
                            }
                        </span>
                    </div>
                    <section className='pt-3'>
                        <h1 className='text-2xl font-Hind underline'>
                            Liste des candidats :
                        </h1>
                        <div class="pt-7 pb-14">
                            <div class="xl:container mx-auto px-6 md:px-12">
                                <div class="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {
                                        candidates?.map((candidate) => (
                                            <div key={candidate.id} class="rounded-xl group relative space-y-6 overflow-hidden">
                                                <img
                                                    class="mx-auto h-96 w-full grayscale object-cover transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                                    src={candidate.photo}
                                                    alt="woman"
                                                    loading="lazy"
                                                    width="640"
                                                    height="805"
                                                />
                                                <div class="absolute bottom-0 rounded-b-xl inset-x-0 h-32 min-h-fit max-h-32 mt-auto px-4 py-5 bg-gray-800 translate-y-16 transition duration-500 ease-in-out group-hover:translate-y-0">
                                                    <div className='text-center'>
                                                        <h4 class="text-xl font-Hind font-semibold text-white ">{candidate.lastName + " " + candidate.firstName}</h4>
                                                        <p class="mt-3 text-md text-gray-100 overflow-hidden overflow-ellipsis">{candidate.dateOfBirth + " à " + candidate.placeOfBirth}</p>
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
                        <h1 className='text-2xl font-Hind underline'>
                            Résultats provisoires :
                        </h1>
                    </section>
                </div>
            </div>
        </div>
    )
}
