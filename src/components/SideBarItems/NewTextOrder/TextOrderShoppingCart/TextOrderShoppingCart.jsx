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

//Cart System 
import { useSelector } from 'react-redux';

const TextOrderShoppingCart = ({ nextStep, backStep, shippingData }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const cartItems = useSelector(state => state.name);
  const cartSubtotal = cartItems.subtotal;
  const cartTotalQuantity = cartItems.totalquantity;
  const cartDiscount = cartItems.discount;
  const cartTotal = cartItems.total;
  const cartinternalComments = cartItems.internalComments;
  const cartcustnotes = cartItems.customerNotes;

  useEffect(() => {
  }, []);

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <List disablePadding>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary="Cart Information:"
            secondary={
              <div>
                <div>Total Quantity: {cartTotalQuantity}</div>
                <div>Subtotal: {currencyFormat(cartSubtotal)}</div>
                <div>Discount: {currencyFormat(cartDiscount)}</div>
                <div>Total: {currencyFormat(cartTotal)}</div>
              </div>
            }
          />
        </ListItem>
      </List>
      <TextOrderItemModal />
      
      {cartItems.cart.map((cart) => (
        <TextOrderShoppingCartItem cart={cart} />
      ))}
      
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
