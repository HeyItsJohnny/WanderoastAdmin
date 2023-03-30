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
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { ShoppingCartItem } from "../Systems/shoppingCartModel";
import { nanoid } from "nanoid";
import { DeleteCart, AddCart } from "../Systems/cartSystem";
import { useDispatch } from "react-redux";

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

  const [showSelection, setShowSelection] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemSize, setSelectedItemSize] = useState("");

  const [item, setItem] = useState({});
  const [itemSize, setItemSize] = useState({});

  const handleClose = () => setShowSelection(false);
  const handleShow = () => setShowSelection(true);

  //Shopping Cart -
  const dispatch = useDispatch();
  var newCartItem = ShoppingCartItem(
    nanoid(),
    "",
    "",
    "",
    0,
    "",
    0,
    0,
    true,
    ""
  );
  //Shopping Cart +

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
    const itemSizesCollection = query(
      collection(db, "items", itemid, "sizes"),
      orderBy("Name")
    );
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
    });
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  const handleItemSelectionChange = (event) => {
    setSelectedItem(event.target.value);
    getSelectedItem(event.target.value);
    fetchItemSizeData(event.target.value);
  };

  const handleItemSizeSelectionChange = (event) => {
    setSelectedItemSize(event.target.value);
    getSelectedItemSize(selectedItem, event.target.value);
  };

  const handleReset = () => {
    setSelectedItem("");
    setSelectedItemSize("");
    handleClose();
  };

  const getSelectedItem = async (itemID) => {
    try {
      const itemRef = doc(db, "items", itemID);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        setItem(itemSnap.data());
      }
    } catch (err) {
      alert(err);
    }
  };

  const getSelectedItemSize = async (itemID, itemSizeID) => {
    try {
      const itemSizeRef = doc(db, "items", itemID, "sizes", itemSizeID);
      const itemSizeSnap = await getDoc(itemSizeRef);
      if (itemSizeSnap.exists()) {
        setItemSize(itemSizeSnap.data());
      }
    } catch (err) {
      alert(err);
    }
  };

  function addToCart() {
    newCartItem.itemID = selectedItem;
    newCartItem.itemShoppingCartID = item.ItemShoppingCartID;
    newCartItem.name = item.Name;
    newCartItem.quantity = 1;
    newCartItem.size = itemSize.Name;
    newCartItem.unitprice = itemSize.Price;
    newCartItem.lineamount = itemSize.Price * 1;
    newCartItem.imageURL = item.ImageFilePath;
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
            handleShow();
          }}
        >
          Add Item
        </Button>
      </Box>
      <Dialog open={showSelection} onClose={handleClose}>
        <DialogTitle>Add to Shopping Cart</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Item</InputLabel>
            <Select
              id="demo-simple-select"
              value={selectedItem}
              label="Item"
              onChange={handleItemSelectionChange}
              required
            >
              {items.map((item) => (
                <MenuItem value={item.id}>{item.Name}</MenuItem>
              ))}
            </Select>
            <Select
              id="demo-simple-select"
              value={selectedItemSize}
              label="Size"
              onChange={handleItemSizeSelectionChange}
              required
            >
              {itemSizes.map((item) => (
                <MenuItem value={item.id}>
                  {item.Name} - ${item.Price}
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
            onClick={() => {
              addToCart();
              dispatch(AddCart(newCartItem));
              handleReset();
            }}
          >
            Choose Size
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TextOrderItemModal;
