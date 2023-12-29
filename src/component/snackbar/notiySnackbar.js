import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotifySnackbar = ({open, handleClose, message, messageType}) => {
    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                   {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NotifySnackbar