/* eslint-disable no-unused-vars */
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
const LoginAlert = ({dialogOpen, handleDialogClose}) => {
    return (
        <div>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-login">
                <DialogContent>
                    <DialogContentText id="alert-login">
                        <Alert severity="error">User are not registered. Please login the user.</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='btn-light rounded_6 px-2 py-2  btn1 fs_09 me-3' onClick={handleDialogClose}>Cancel</button>
                    <Link to={'/login'} >
                        <button onClick={handleDialogClose} className='btn_darksecondary py-2 px-3 btn1 fs_09 rounded_6' autoFocus>  Login
                        </button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginAlert