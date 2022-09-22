import React from 'react'
import CustomLink from '../../../utils/CustomLinkBackground';
import FaqItem from './FaqItem';

export default function Faq() {
    return (
        <section className=" bg-gray-100 flex-1 py-10 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl font-Comfortaa lg:text-5xl">Foire Aux Questions (FAQ)</h2>
                    <p className="text-center mt-4 text-[18px] leading-relaxed font-Trykker text-gray-600">
                        Bienvenue sur la page reprenant les questions fréquemment posées.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    <FaqItem
                        question={"Comment voir les résultats ? "}
                        content={"Amet minim mollit non deserunt ullamco est sit"}
                    />
                    <FaqItem
                        question={"J'ai déjà ma carte d'électeur. Comment faire pour me connecter ?"}
                        content={"Amet minim mollit non deserunt ullamco est sit do amet sint. Velit officia consequat duis enim velit mollit."}
                    />
                </div>
                <p className="text-center text-gray-700 font-Trykker text-[18px] mt-9">Vous n'avez pas trouvé de réponse à ce que vous cherchiez ? &nbsp;
                    <CustomLink text="Contactez-nous" path={'/contact'} className="text-violet-900 font-extrabold font-Comfortaa" />
                </p>
            </div>
        </section>

    )
}

