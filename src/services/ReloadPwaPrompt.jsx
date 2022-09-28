import { useRegisterSW } from 'virtual:pwa-register/react'
import CustomizedSnackbar from '../utils/CustomSnackbar';

function ReloadPrompt() {
    const intervalMS = 60 * 60 * 1000; // Chaque 1h de temps
    const {
        offlineReady: [offlineReady],
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW(
        {
            onRegistered(r) {
                r && setInterval(() => {
                    r.update()
                }, intervalMS)
            }
        }
    )

    return (
        <>
            {(offlineReady || needRefresh)
                && <>
                    {offlineReady
                        ? <CustomizedSnackbar text="L'application est prête à fonctionner hors ligne" color='success' duration='3000' />
                        : <CustomizedSnackbar text='Nouveau contenu disponible, veuillez cliquer sur recharger pour mettre à jour.' duration={null} color='warning' buttons={true} onClick={() => updateServiceWorker(true)} />
                    }
                </>
            }
        </>
    )
}

export default ReloadPrompt

