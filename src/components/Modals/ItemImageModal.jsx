import React, { useState, useEffect } from 'react';

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
import { doc, updateDoc, getDoc } from 'firebase/firestore';


const ItemImageModal = ({itemid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    const [item, setItem] = useState({});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function openItemImage() {
        alert("Open Item Image");
    }

    async function setItemFromID() {
        try {
            const itemRef = doc(db, "items", itemid);
            const itemSnap = await getDoc(itemRef);
            if (itemSnap.exists()) {
            setItem(itemSnap.data());
            }
        } catch (err) {
            alert(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Submit");
        //addItemDoc(e)
        //handleReset();
    };

    useEffect(() => {
        setItemFromID();
    }, []);

    return (
        <>
        <Button 
            variant="contained"
            sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px"
            }}
            onClick={handleShow}
            >Item Image
        </Button>
        <Dialog open={show} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
            <DialogTitle>Item</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={item.Name}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                    Image
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                    type="submit">Upload Image
                </Button>
            </DialogActions>
            </form>
        </Dialog>
        </>
    )
}

export default ItemImageModal