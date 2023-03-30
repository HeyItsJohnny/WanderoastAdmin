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
import { ColorModeContext, useMode, tokens } from "../../../../theme";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import TextOrderShoppingCartItem from "./TextOrderShoppingCartItem";
import TextOrderItemModal from "../../../Modals/TextOrderItemModal";

//Firebase
import { db } from "../../../../Firebase/firebase";

const TextOrderShoppingCart = ({ nextStep, backStep, shippingData }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);
  const [itemSize, setItemSizes] = useState([]);

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
      //setItemSizeData(itemsList);
    });
  };

  /*
  const setItemSizeData = (itemsList) => {
    console.log("Start.");
    for (var key in itemsList) {
      fetchItemSizeData(
        itemsList[key].Name,
        itemsList[key].id,
        itemsList[key].ItemID,
        itemsList[key].ItemType
      );
      //console.log("NAME: " + items[key].Name + " ID: " + items[key].id);
    }
  };

  const fetchItemSizeData = async (itemname, itemid, itemscid, itemtype) => {
    //console.log("2. NAME: " + itemname+ " ID: " + itemid);
    const itemSizeCollection = query(collection(db, "items", itemid, "sizes"));
    onSnapshot(itemSizeCollection, (querySnapshot) => {
      const itemSizeList = [];
      querySnapshot.forEach((doc) => {
        var itemSizeData = {
          id: doc.id,
          ItemID: itemid,
          ItemShoppingCartID: itemscid,
          ItemName: itemname,
          ItemType: itemtype,
          ItemSizeName: doc.data().Name,
          ItemSizePrice: doc.data().Price,
        };
        itemSizeList.push(itemSizeData);
      });
      setItemSizes(itemSizeList);
    });
  };
  */

  useEffect(() => {
    fetchItemData();
  }, []);

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <List disablePadding>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary="Shipping Info:"
            secondary={
              <div>
                <div>{shippingData.ShippingName}</div>
                <div>{shippingData.ShippingAddress1}</div>
                <div>{shippingData.ShippingAddress2}</div>
                <div>
                  {shippingData.ShippingCity}, {shippingData.ShippingState}{" "}
                  {shippingData.ShippingZipCode}
                </div>
                <br></br>
                <div>{shippingData.Email}</div>
                <div>{shippingData.PhoneNo}</div>
              </div>
            }
          />
        </ListItem>
      </List>
      <TextOrderItemModal />
      {/*
      {items.map((item) => (
        <TextOrderShoppingCartItem item={item} />
      ))}
      */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={backStep}
        >
          Back
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
          onClick={nextStep}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default TextOrderShoppingCart;
