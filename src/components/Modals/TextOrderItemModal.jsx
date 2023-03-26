import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Paper,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../../theme";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//Firebase
import { db } from "../../Firebase/firebase";

const TextOrderItemModal = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);
  const [itemSizes, setItemSizes] = useState([]);

  const [showItemSelection, setShowItemSelection] = useState(false);
  const [showItemSizeSelection, setShowItemSizeSelection] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemSize, setSelectedItemSize] = useState("");

  const handleItemSelectionClose = () => setShowItemSelection(false);
  const handleItemSelectionShow = () => setShowItemSelection(true);

  const handleItemSizeSelectionClose = () => setShowItemSizeSelection(false);
  const handleItemSizeSelectionShow = () => setShowItemSizeSelection(true);

  const fetchItemData = async () => {
    const itemsCollection = query(collection(db, "items"), orderBy("Name"));
    onSnapshot(itemsCollection, (querySnapshot) => {
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        var itemData = {
          id: doc.id,
          ItemID: doc.data().ItemShoppingCartID,
          Name: doc.data().Name,
          ItemType: doc.data().ItemType,
        };
        itemsList.push(itemData);
      });
      setItems(itemsList);
    });
  };

  const fetchItemSizeData = async (itemid) => {
    const itemSizesCollection = query(collection(db, "items",itemid,"sizes"), orderBy("Name"));
    onSnapshot(itemSizesCollection, (querySnapshot) => {
      const itemSizeList = [];
      querySnapshot.forEach((doc) => {
        var itemSizeData = {
          id: doc.id,
          Name: doc.data().Name,
          Price: doc.data().Price,
        };
        itemSizeList.push(itemSizeData);
      });
      setItemSizes(itemSizeList);
      handleItemSelectionClose();
      handleItemSizeSelectionShow();
    });
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  const handleItemSelectionSubmit = (e) => {
    //e.preventDefault();
    //console.log("2. SELECTED ITEM: " + selectedItem);
    fetchItemSizeData(selectedItem);
    //selectedItem("");
  };

  const handleItemSizeSelectionSubmit = (e) => {
    //e.preventDefault();
    //console.log("2. SELECTED ITEM: " + selectedItem);
    //fetchItemSizeData(selectedItem);
    //selectedItem("");
  };

  const handleItemSelectionChange = (event) => {
    setSelectedItem(event.target.value);

  };

  const handleItemSizeSelectionChange = (event) => {
    setSelectedItem(event.target.value);

  };

  const checkItem = () => {
    console.log("3. SELECTED ITEM: " + selectedItem);
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Reset Cart
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => {
            handleItemSelectionShow();
          }}
        >
          Add Item
        </Button>
      </Box>
      <Dialog open={showItemSelection} onClose={handleItemSelectionClose}>
        <form onSubmit={handleItemSelectionSubmit}>
          <DialogTitle>Add to Shopping Cart</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Item</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedItem}
                label="Item"
                onChange={handleItemSelectionChange}
                required
              >
                {items.map((item) => (
                  <MenuItem value={item.id}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              Choose Size
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/*
      <Dialog open={showItemSizeSelection} onClose={handleItemSizeSelectionClose}>
        <form onSubmit={handleItemSizeSelectionSubmit}>
          <DialogTitle>Choose Size</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sizes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedItemSize}
                label="Item"
                onChange={handleItemSizeSelectionChange}
                required
              >
                {itemSizes.map((item) => (
                  <MenuItem value={item.id}>
                    {item.Name} - {item.Price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              Add Item to Shopping Cart
            </Button>
          </DialogActions>
        </form>
      </Dialog>
            */}
    </>
  );
};

export default TextOrderItemModal;
