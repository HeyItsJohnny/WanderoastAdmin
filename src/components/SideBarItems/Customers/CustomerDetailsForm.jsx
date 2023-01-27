import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

//UI
import { Box, Button, TextField, Card, CardActionArea, CardMedia } from "@mui/material";

//FORM
import { useFormik, Field, FormikProvider } from 'formik';
import useMediaQuery from "@mui/material/useMediaQuery";
import FormControl from '@mui/material/FormControl';

//DB
import { db, storage } from '../../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { useMode, tokens } from '../../../theme';


const CustomerDetailsForm = ({customer, customerid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const onSubmit = (values, actions) => {
        updateCustomerDoc(values);
    }

    async function updateCustomerDoc(values) {
        
        const custRef = doc(db, "customer-profile", customerid);
        await updateDoc(custRef, {
            CustomerFirstName: values.CustomerFirstName,
            CustomerLastName: values.CustomerLastName,
            Email: values.Email,
            PhoneNo: values.PhoneNo,
            squareID: values.squareID ?? "",
            ShippingName: values.ShippingName,
            ShippingAddress1: values.ShippingAddress1,
            ShippingAddress2: values.ShippingAddress2 ?? "",
            ShippingCity: values.ShippingCity,
            ShippingState: values.ShippingState,
            ShippingZipCode: values.ShippingZipCode
        });
        navigate("/customers");
    }

    //Formik
    const formik = useFormik({
        initialValues: {
            CustomerFirstName: customer.CustomerFirstName,
            CustomerLastName: customer.CustomerLastName,
            Email: customer.Email,
            PhoneNo: customer.PhoneNo,
            squareID: customer.squareID,
            ShippingName: customer.ShippingName,
            ShippingAddress1: customer.ShippingAddress1,
            ShippingAddress2: customer.ShippingAddress2,
            ShippingCity: customer.ShippingCity,
            ShippingState: customer.ShippingState,
            ShippingZipCode: customer.ShippingZipCode
        },
        enableReinitialize: true,
        onSubmit,
    })

    return (
        <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="FirstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.CustomerFirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="LastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.CustomerLastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="Email"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="PhoneNo"
                    label="Phone No."
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.PhoneNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="ShippingName"
                    label="Ship to Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="squareID"
                    label="Square ID"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.squareID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="ShippingAddress1"
                    label="Ship to Address 1"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingAddress1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="ShippingAddress2"
                    label="Ship to Address 2"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingAddress2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="ShippingCity"
                    label="Ship to City"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingCity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="ShippingState"
                    label="Ship to State"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingState}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 1" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="Shipping"
                    label="Ship to Zip Code"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.ShippingZipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 1" }}
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button 
                    variant="contained"
                    sx={{
                        backgroundColor: colors.greenAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                    type="submit">Save
                </Button>
            </Box>
        </form>
        </FormikProvider>
    )
}

export default CustomerDetailsForm