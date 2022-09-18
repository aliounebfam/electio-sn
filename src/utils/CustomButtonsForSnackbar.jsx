import { Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';

const Buttons = ({ handleClose, handleClick }) => {

    return (
        <StyledEngineProvider injectFirst>
            <>
                <Button onClick={handleClick} className="text-black font-[550] transition-colors duration-300 hover:bg-slate-100 h-max mr-3 mt-[1px]" variant="text" color="secondary" size="small">
                    Recharger
                </Button>
                <Button onClick={handleClose} className="text-black font-[550] transition-colors duration-300 hover:bg-slate-100 h-max mt-[1px] " size="small">
                    Fermer
                </Button>
            </>
        </StyledEngineProvider>
    )
}

export default Buttons;