import React, { useState } from 'react';

import { useMode, tokens } from '../../theme';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { db } from "../../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore"; 

const CustomerShipCodeModal = ({customerid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        addCustomerShipCodeDoc(e)
        handleClose();
    };

    async function addCustomerShipCodeDoc(data) {
        try {
            await addDoc(collection(db, "customer-profile",customerid,"shippingcodes"), {
                Code: data.target.Code.value,
                Address1: data.target.Address1.value,
                Address2: data.target.Address2.value ?? "",
                City: data.target.City.value,
                State: data.target.State.value,
                ZipCode: data.target.ZipCode.value
            });
        } catch(e) {
            alert("Error saving shipping code.");
        }
    }

    return (
        <>
        <Button
            sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
            }}
                onClick={() => {handleShow();}
            }
        >
            <AddCircleIcon sx={{ mr: "10px" }} />
            Add New Size
        </Button>
        <Dialog open={show} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
            <DialogTitle>New Shipping Code</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Code"
                    label="Code"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="Address1"
                    label="Address 1"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="Address2"
                    label="Address 2"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="City"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="State"
                    label="State"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="ZipCode"
                    label="ZipCode"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                    type="submit">Add Shipping Code
                </Button>
            </DialogActions>
            </form>
        </Dialog>
        </>
    )
}

export default CustomerShipCodeModal