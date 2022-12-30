import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

//UI
import { Box, Button, TextField } from "@mui/material";

//FORM
import { useFormik, Field, FormikProvider } from 'formik';
import useMediaQuery from "@mui/material/useMediaQuery";
import FormControl from '@mui/material/FormControl';

//DB
import { db } from '../../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { useMode, tokens } from '../../../theme';
import { itemSchema } from '../../../schemas';

const ItemDetailsForm = ({item, itemid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);
    const [giftbox, setGiftbox] = useState(false);
    const [nitroCoffee, setNitroCoffee] = useState(false);
    const [displayNitroCoffeeLink, setDisplayNitroCoffeeLink] = useState(false);
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const onSubmit = (values, actions) => {
        if (values.itemtype === "Coffee Beans") {
            setGiftbox(false);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        } else if (values.itemtype === "Nitro Cold Coffee") {
            setGiftbox(false);
            setNitroCoffee(true);
            setDisplayNitroCoffeeLink(true);
        } else if (values.itemtype === "Gift Box") {
            setGiftbox(true);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        } else if (values.itemtype === "Other") {
            setGiftbox(false);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        }
        updateItemDoc(values);
    }

    async function updateItemDoc(values) {
        const itemRef = doc(db, "items", itemid);
        await updateDoc(itemRef, {
            Background: values.background,
            CoffeeItem: true,
            Description: values.description,
            DisplayNitroCoffeeLink: displayNitroCoffeeLink,
            Elevation: values.elevation,
            EnableItem: true,
            GiftBox: giftbox,
            GiftBoxItems: values.giftboxitems,
            ItemShoppingCartID: values.itemid,
            Name: values.name,
            NitroColdCoffee: nitroCoffee,
            Region: values.region,
            ItemType: values.itemtype,
            ImageFilePath: "",
            ImageName: "",
            ImageSize: ""
        });
        navigate("/items");
    }

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
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: true }}
                        margin="dense"
                        id="itemtype"
                        label="Item Type"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={formik.values.itemtype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{ gridColumn: "span 2" }}
                        
                    />
                    <label>
                    <Field type="radio" name="itemtype" value="Coffee Beans" />
                        Coffee Beans
                    </label>
                    <label>
                    <Field type="radio" name="itemtype" value="Nitro Cold Coffee" />
                        Nitro Cold Coffee
                    </label>
                    <label>
                    <Field type="radio" name="itemtype" value="Gift Box" />
                        Gift Box
                    </label>
                    <label>
                    <Field type="radio" name="itemtype" value="Other" />
                        Other
                    </label>
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
        </FormikProvider>
        
    )
}

export default ItemDetailsForm