import React, { useState } from 'react';

import { useMode, tokens } from '../../theme';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

//DB
import { db, storage } from '../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';


const ItemImageModal = ({itemid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    function openItemImage() {
        alert("Open Item Image");
    }

    return (
        <Button 
            variant="contained"
            sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px"
            }}
            onClick={openItemImage}
            >Item Image
        </Button>
    )
}

export default ItemImageModal