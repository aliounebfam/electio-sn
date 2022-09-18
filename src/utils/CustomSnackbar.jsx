import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Buttons from './CustomButtonsForSnackbar';
import { useEffect } from 'react';

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
    useEffect(() => {
        let element;
        if (color == "warning") {
            element = document.getElementsByClassName("css-19whtgm-MuiPaper-root-MuiAlert-root")[0];
            if (element !== undefined) {
                element.style.backgroundColor = '#ffa345';
            }
        }
        if (color == "success") {
            element = document.getElementsByClassName("css-1w7ppv8-MuiPaper-root-MuiAlert-root")[0];
            if (element !== undefined) {
                element.style.backgroundColor = '#2f5f32';
            }
        }

        if (element !== undefined) {
            element.style.fontSize = '17px';
            element.style.flexWrap = 'wrap';
        }
    }, [])

    return (
        <Snackbar key={vertical + horizontal} TransitionComponent={TransitionLeft} anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration !== 'null' ? parseInt(duration) : null} onClose={handleClose}>
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}
                action={buttons ?
                    <Buttons handleClose={handleClose} handleClick={onClick} /> : null
                }
            >
                {text}
            </Alert>
        </Snackbar>
    );
}
