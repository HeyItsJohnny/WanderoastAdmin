import React, {useState, useEffect} from 'react';

//UI
import { Box, Button, TextField } from "@mui/material";

//FORM
import { useFormik } from 'formik';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

//DB
import { db } from '../../../Firebase/firebase';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';

import { useMode, tokens } from '../../../theme';
import { itemSchema } from '../../../schemas';

const ItemDetailsForm = ({item}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [itemType, setItemType] = useState('');
    const [nameValue, setNameValue] = useState("");

    const onSubmit = (values, actions) => {
        console.log(values);
        console.log(actions);
    }

    useEffect(() => {
        setNameValue(item.Name);
    }, []);

    //Formik
    const formik = useFormik({
        initialValues: {
            name: item.Name,
            description: item.Description,
            region: item.Region,
            elevation: item.Elevation,
            background: item.Background,
            itemid: item.ItemShoppingCartID,
            itemtype: item.ItemType,
            giftboxitems: item.GiftBoxItems
        },
        enableReinitialize: true,
        validationSchema: itemSchema,
        onSubmit,
    })

    const handleItemTypeChange = (event) => {
        setItemType(event.target.value);
    };

    
    
    return (
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
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    required
                    id="itemid"
                    label="Item ID"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.itemid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    multiline
                    rows={4}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    margin="dense"
                    id="background"
                    label="Background"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.background}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                    multiline
                    rows={4}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="region"
                    label="Region"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="elevation"
                    label="Elevation"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.elevation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="dense"
                    id="giftboxitems"
                    label="# of Giftbox Items"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.giftboxitems}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    sx={{ gridColumn: "span 2" }}
                />
                <FormControl fullWidth>
                    <InputLabel>Item Type</InputLabel>
                        <Select
                            id="itemtype"
                            value={formik.values.itemtype}
                            label="Item Type"
                            onChange={formik.handleChange}
                            required
                        >
                            <MenuItem value="Coffee Beans">Coffee Beans</MenuItem>
                            <MenuItem value="Nitro Cold Coffee">Nitro Cold Coffee</MenuItem>
                            <MenuItem value="Gift Box">Gift Box</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                </FormControl>
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
    )
        {/*
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        id="name"
                        error={!!touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                        id="description"
                        error={!!touched.description && !!errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Region"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.region}
                        name="region"
                        id="region"
                        error={!!touched.region && !!errors.region}
                        helperText={touched.region && errors.region}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Elevation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.elevation}
                        name="elevation"
                        id="elevation"
                        error={!!touched.elevation && !!errors.elevation}
                        helperText={touched.elevation && errors.elevation}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Item ID"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.itemId}
                        name="itemId"
                        id="itemId"
                        error={!!touched.itemId && !!errors.itemId}
                        helperText={touched.itemId && errors.itemId}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Giftbox Items"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.giftBoxItems}
                        name="giftBoxItems"
                        id="giftBoxItems"
                        error={!!touched.giftBoxItems && !!errors.giftBoxItems}
                        helperText={touched.giftBoxItems && errors.giftBoxItems}
                        sx={{ gridColumn: "span 2" }}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Item Type</InputLabel>
                            <Select
                                id="itemType"
                                value={itemType}
                                label="Item Type"
                                onChange={handleItemTypeChange}
                            >
                                <MenuItem value="Coffee Beans">Coffee Beans</MenuItem>
                                <MenuItem value="Nitro Cold Coffee">Nitro Cold Coffee</MenuItem>
                                <MenuItem value="Gift Box">Gift Box</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                    </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Save
                    </Button>
                </Box>
                </form>
            )}
            </Formik>
        */}
    
}

export default ItemDetailsForm