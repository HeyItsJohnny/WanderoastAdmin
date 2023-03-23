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
import { ColorModeContext, useMode, tokens } from "../../../theme";
import { collection, query, onSnapshot } from "firebase/firestore";
import TextOrderShoppingCartItem from "./TextOrderShoppingCartItem";

//Firebase
import { db } from "../../../Firebase/firebase";

const TextOrderShoppingCart = ({ nextStep, backStep, shippingData }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [items, setItems] = useState([]);

  const fetchItemData = async () => {
    const itemsCollection = query(collection(db, "items"));
    onSnapshot(itemsCollection, (querySnapshot) => {
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        var hasImage = true;
        if (doc.data().ImageFilePath === "") {
          hasImage = false;
        }
        var itemData = {
          id: doc.id,
          Name: doc.data().Name,
          ItemType: doc.data().ItemType,
          HasImage: hasImage,
        };
        itemsList.push(itemData);
      });
      setItems(itemsList);
    });
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <>
    {/*
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
    */}
      {items.map((item) => (
        <TextOrderShoppingCartItem item={item} />
      ))}
      {/*
      <ListItem style={{ padding: "10px 0" }}>
        <Button
          type="button"
          size="small"
          sx={{
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "5px 10px",
          }}
          onClick={() => {
            alert("Subtract One");
          }}
        >
          -
        </Button>
        <Button
          type="button"
          size="small"
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "5px 10px",
          }}
          onClick={() => {
            alert("Add One");
          }}
        >
          +
        </Button>
      </ListItem>
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
