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

import { db } from "../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 

const CouponModal = () => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [couponAmountType, setCouponAmountType] = useState('');

    const handleChange = (event) => {
        setCouponAmountType(event.target.value);
    };

    const handleReset = () => {
        setCouponAmountType("");
        handleClose();
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        addCouponDoc(e)
        handleReset();
      };

    async function addCouponDoc(data) {
        const couponData = {
            CanStackCoupon: true,
            CouponAmountType: couponAmountType,
            CouponCode: data.target.couponcode.value.toUpperCase(),
            CouponDescription: data.target.description.value,
            CouponDiscount: data.target.discountamount.value,
            ItemID: "noItem",
            ItemName: "",
            MinimumAmount: data.target.minimumamount.value,
            Type: "Invoice"
        };

        await setDoc(doc(db, "coupons", data.target.couponcode.value.toUpperCase()), couponData);
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
            Add New Coupon
        </Button>
        <Dialog open={show} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
            <DialogTitle>New Coupon</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please use this form to add a new coupon code and fill out all of the fields.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="couponcode"
                    label="Coupon Code"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="discountamount"
                    label="Discount Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="minimumamount"
                    label="Minimum Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Coupon Amount</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={couponAmountType}
                        label="Amount Type"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Percent">Percent (%)</MenuItem>
                        <MenuItem value="Amount">Dollar Amount ($)</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                    type="submit">Add Coupon
                </Button>
            </DialogActions>
            </form>
        </Dialog>
        </>

    )
}

export default CouponModal