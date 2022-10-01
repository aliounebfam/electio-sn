import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Buttons from './CustomButtonsForSnackbar';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />
    )
});

export default function CustomizedSnackbar({ text, color, duration, vertical = 'bottom', horizontal = 'right', buttons = false, onClick }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar key={vertical + horizontal} TransitionComponent={TransitionLeft} anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration !== null ? parseInt(duration) : null} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%', fontSize: "17px", flexWrap: "wrap", bgcolor: color == "warning" ? "#f3c122" : "#058863" }}
                action={buttons ?
                    <Buttons handleClose={handleClose} handleClick={onClick} /> : null
                }
            >
                {text}
            </Alert>
        </Snackbar>
    );
}
