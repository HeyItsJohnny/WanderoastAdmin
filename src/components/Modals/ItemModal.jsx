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
import { addDoc, collection } from "firebase/firestore";

const ItemModal = () => {
    const [theme ] = useMode();
    const colors = tokens(theme.palette.mode);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [giftbox, setGiftbox] = useState(false);
    const [nitroCoffee, setNitroCoffee] = useState(false);
    const [displayNitroCoffeeLink, setDisplayNitroCoffeeLink] = useState(false);
    const [itemType, setItemType] = useState('');

    const handleReset = () => {
        setItemType("");
        handleClose();
      };
    
    const handleChange = (event) => {
        setItemType(event.target.value);
        if (event.target.value === "Coffee Beans") {
            setGiftbox(false);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        } else if (event.target.value === "Nitro Cold Coffee") {
            setGiftbox(false);
            setNitroCoffee(true);
            setDisplayNitroCoffeeLink(true);
        } else if (event.target.value === "Gift Box") {
            setGiftbox(true);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        } else if (event.target.value === "Other") {
            setGiftbox(false);
            setNitroCoffee(false);
            setDisplayNitroCoffeeLink(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addItemDoc(e)
        handleReset();
      };

    async function addItemDoc(data) {
        const docRef = await addDoc(collection(db, "items"), {
           Background: "",
           CoffeeItem: true,
           Description: data.target.description.value,
           DisplayNitroCoffeeLink: displayNitroCoffeeLink,
           Elevation: data.target.elevation.value,
           EnableItem: true,
           GiftBox: giftbox,
           GiftBoxItems: data.target.giftboxitems.value,
           ItemShoppingCartID: data.target.itemid.value,
           Name: data.target.name.value,
           NitroColdCoffee: nitroCoffee,
           Region: data.target.region.value,
           ItemType: itemType,
           ImageFilePath: "",
           ImageName: "",
           ImageSize: ""
        });
        addItemSizes(docRef.id, data);
    }

    function addItemSizes(ItemID, data) {
        if (data.target.bag340.value !== "") {
            addSizeToDB(ItemID, "340G", data.target.bag340.value);
        }
        if (data.target.bag1000.value !== "") {
            addSizeToDB(ItemID, "1000G", data.target.bag1000.value);
        }
        if (data.target.cans12.value !== "") {
            addSizeToDB(ItemID, "12 Cans", data.target.cans12.value);
        }
        if (data.target.cans24.value !== "") {
            addSizeToDB(ItemID, "24 Cans", data.target.cans24.value);
        }
        if (data.target.giftboxprice.value !== "") {
            addSizeToDB(ItemID, "1 Box", data.target.giftboxprice.value);
        }
        
    }

    async function addSizeToDB(ItemID, name, price) {
        await addDoc(collection(db, "items", ItemID, "sizes"), {
            Name: name,
            Price: price
         });
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
        Add New Item
    </Button>
    <Dialog open={show} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Name"
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
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Details
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="region"
                label="Region"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="elevation"
                label="Elevation"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="background"
                label="Background"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="itemid"
                label="Item ID"
                type="number"
                fullWidth
                variant="standard"
                required
            />
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Bag Prices
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="bag340"
                label="340g Bag"
                type="number"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="bag1000"
                label="1000g Bag"
                type="number"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Nitro Cold Coffee Can Prices
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="cans12"
                label="12 Cans"
                type="number"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="cans24"
                label="24 Cans"
                type="number"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogContent>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Item Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={itemType}
                        label="Item Type"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Coffee Beans">Coffee Beans</MenuItem>
                        <MenuItem value="Nitro Cold Coffee">Nitro Cold Coffee</MenuItem>
                        <MenuItem value="Gift Box">Gift Box</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
            </FormControl>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Giftbox
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="giftboxprice"
                label="Gift Box Price"
                type="number"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="giftboxitems"
                label="Gift Box Items"
                type="number"
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
                type="submit">Add Item
            </Button>
        </DialogActions>
        </form>
    </Dialog>
    </>
  )
}

export default ItemModal