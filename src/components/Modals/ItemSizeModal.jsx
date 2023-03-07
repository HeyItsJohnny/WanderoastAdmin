import React, { useState } from "react";

import { useMode, tokens } from "../../theme";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { db } from "../../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const ItemSizeModal = ({ itemid }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [itemSize, setItemSize] = useState("");

  const handleChange = (event) => {
    setItemSize(event.target.value);
  };

  const handleReset = () => {
    setItemSize("");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addItemSizeDoc(e);
    handleReset();
  };

  async function addItemSizeDoc(data) {
    await addDoc(collection(db, "items", itemid, "sizes"), {
      Name: itemSize,
      Price: data.target.price.value,
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
        onClick={() => {
          handleShow();
        }}
      >
        <AddCircleIcon sx={{ mr: "10px" }} />
        Add New Size
      </Button>
      <Dialog open={show} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Item Size</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={itemSize}
                label="Amount Type"
                onChange={handleChange}
                required
              >
                <MenuItem value="340G">340G</MenuItem>
                <MenuItem value="1000G">1000G</MenuItem>
                <MenuItem value="12 Cans">12 Cans</MenuItem>
                <MenuItem value="24 Cans">24 Cans</MenuItem>
                <MenuItem value="1 Box">1 Giftbox</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              type="submit"
            >
              Add Item Size
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ItemSizeModal;
