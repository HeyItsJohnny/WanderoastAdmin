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
import { itemSchema } from '../../../schemas';

import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";

const ItemDetailsForm = ({item, itemid}) => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);
     const [imageUpload, setImageUpload] = useState(null);
    const navigate = useNavigate();

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const onSubmit = (values, actions) => {
        updateItemDoc(values);
    }

    async function updateItemDoc(values) {
        const itemRef = doc(db, "items", itemid);
        await updateDoc(itemRef, {
            Background: values.background ?? "",
            CoffeeItem: true,
            Description: values.description,
            DisplayNitroCoffeeLink: false,
            Elevation: values.elevation ?? "",
            EnableItem: true,
            GiftBox: false,
            GiftBoxItems: values.giftboxitems,
            ItemShoppingCartID: values.itemid,
            Name: values.name,
            NitroColdCoffee: false,
            Region: values.region ?? "",
            ItemType: values.itemtype
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

    const uploadImage = () => {
        //alert("Uploading Image");
        if (imageUpload == null) return;
        const imageRef = ref(storage, `itemImageStorage/itemImage_${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //Add Image to DB
                updateItemPicture(url,imageUpload.name);
            });
        });
    }

    async function updateItemPicture(url,PicName) {
        const itemRef = doc(db, "items", itemid);
        await updateDoc(itemRef, {
            ImageFilePath: url,
            ImageName: PicName
        });
        refreshPage();
    }

    function refreshPage() {
        window.location.reload(false);
      }
    
    return (
        <>
        <Card
            raised
            sx={{
                maxWidth: 350,
                margin: "0 auto",
                padding: "0.1em",
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image={item.ImageFilePath}
                alt={"alt"}
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
            <input
                type="file"
                onChange={(event) => {
                setImageUpload(event.target.files[0]);
            }}
            />
            <button onClick={uploadImage}>Upload Image</button>
        </Card>
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
        </>
    )
}

export default ItemDetailsForm