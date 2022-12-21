import React, {useState, useEffect} from 'react';

//UI
import { Box, Button, TextField } from "@mui/material";

//FORM
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

//DB
import { db } from '../../../Firebase/firebase';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';

const ItemDetailsForm = ({item}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    //const [item, setItem] = useState({});
    const [itemType, setItemType] = useState('');

    /*
    const setItemFromURL = async () => {
        try {
            const itemRef = doc(db, "items", itemid);
            const itemSnap = await getDoc(itemRef);
            if (itemSnap.exists()) {
                setItem(itemSnap.data());
            }
        } catch (err) {
            alert(err);
        }
    };
    */
   console.log(item);

    const handleFormSubmit = (values) => {
        console.log("HIT..");
        console.log(values);
    };

    const handleItemTypeChange = (event) => {
        setItemType(event.target.value);
    };

    //Form Functions

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("required"),
        description: yup.string().required("required"),
        region: yup.string(),
        elevation: yup.string(),
        itemType: yup.string().required("required"),
        itemId: yup.number().required("required"),
        giftBoxItems: yup.number()
    });

    const initialValues = {
        name: item.Name,
        description: item.Description,
        region: "",
        elevation: "",
        itemType: "",
        itemId: 0,
        giftBoxItems: 0
    };

    /*
    useEffect(() => {
        setItemFromURL();
    }, []);
    */
    
    return (
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
    )
}

export default ItemDetailsForm