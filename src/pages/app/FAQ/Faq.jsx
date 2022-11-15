import React from 'react'
import CustomLinkBackground from '../../../utils/CustomLinkBackground';
import FaqItem from './FaqItem';

export default function Faq() {
    return (
        <section className=" bg-gray-300/25 flex-1 py-10 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl font-Comfortaa lg:text-[37px]">Foire Aux Questions (FAQ)</h2>
                    <p className="text-center mt-4 text-[18px] leading-relaxed font-Trykker text-gray-600">
                        Bienvenue sur la page reprenant les questions fréquemment posées.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    <FaqItem
                        question={"Comment voir les résultats ? "}
                        content={"Accédez à la page des élections présidentielles puis sélectionnez la date à laquelle vous voudrez voir ses résultats."}
                    />
                    <FaqItem
                        question={"J'ai déjà ma carte d'électeur. Comment faire pour me connecter ?"}
                        content={"La plateforme ne gère pas encore ce cas."}
                    />
                </div>
                <p className="text-center text-gray-700 font-Trykker text-[18px] mt-9">Vous n'avez pas trouvé de réponse à ce que vous cherchiez ? &nbsp;
                    <CustomLinkBackground text="Contactez-nous" path={'/contact'} className="text-violet-900 font-extrabold font-Comfortaa" />
                </p>
            </div>
        </section>

    )
}

