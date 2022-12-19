import React, { useState } from 'react';

import { useMode, tokens } from '../../theme';
import { Button, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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

    const [coffeeItem, setCoffeeItem] = useState(false);
    const [giftbox, setGiftbox] = useState(false);
    const [enableItem, setEnableItem] = useState(false);
    const [nitroCoffee, setNitroCoffee] = useState(false);
    const [displayNitroCoffeeLink, setDisplayNitroCoffeeLink] = useState(false);

    const handleReset = () => {
        //setCouponAmountType("");
        handleClose();
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
           EnableItem: enableItem,
           GiftBox: giftbox,
           GiftBoxItems: data.target.giftboxitems.value,
           ItemShoppingCartID: data.target.itemid.value,
           Name: data.target.name.value,
           NitroColdCoffee: nitroCoffee,
           Region: data.target.region.value,
           ImageFilePath: "",
           ImageName: "",
           ImageSize: ""
        });
        addItemSizes(docRef.id);
    }

    async function addItemSizes(ItemID) {

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
                Coffee Item
            </DialogContentText>
            <Checkbox value={coffeeItem} onClick={() => {setCoffeeItem(!coffeeItem);}}/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Enable Item
            </DialogContentText>
            <Checkbox value={enableItem} onClick={() => {setEnableItem(!enableItem);}}/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Nitro Cold Coffee
            </DialogContentText>
            <Checkbox value={nitroCoffee} onClick={() => {setNitroCoffee(!nitroCoffee);}}/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Display Nitro Coffee Link
            </DialogContentText>
            <Checkbox value={displayNitroCoffeeLink} onClick={() => {setDisplayNitroCoffeeLink(!displayNitroCoffeeLink);}}/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Giftbox
            </DialogContentText>
            <Checkbox value={giftbox} onClick={() => {setGiftbox(!giftbox);}}/>
        </DialogContent>
        <DialogContent>
            <DialogContentText>
                Giftbox
            </DialogContentText>
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