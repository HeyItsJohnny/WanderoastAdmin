import React from "react";
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
import ReviewCartItem from "./ReviewCartItem";
import TextOrderShoppingCartItem from "../TextOrderShoppingCart/TextOrderShoppingCartItem";

//Cart System
import { useSelector } from "react-redux";

const Review = ({ nextStep, backStep, shippingData }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const cartItems = useSelector((state) => state.name);
  const cartSubtotal = cartItems.subtotal;
  const cartTotalQuantity = cartItems.totalquantity;
  const cartDiscount = cartItems.discount;
  const cartTotal = cartItems.total;
  const cartinternalComments = cartItems.internalComments;
  const cartcustnotes = cartItems.customerNotes;

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
      <List disablePadding>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText
              primary="Customer Information:"
              secondary={
                <div>
                  <div>{shippingData.ShippingName}</div>
                  <div>{shippingData.ShippingAddress1}</div>
                  <div>{shippingData.ShippingAddress2}</div>
                  <div>{shippingData.ShippingCity}, {shippingData.ShippingState} {shippingData.ShippingZipCode}</div>
                  <div>Email: {shippingData.Email}</div>
                  <div>Phone No.: {shippingData.PhoneNo}</div>
                </div>
              }
            />
          </ListItem>
          <Box sx={{ flex: "1 1 auto" }} />
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
        </Box>
      </List>

      {cartItems.cart.map((cart) => (
        <ReviewCartItem cart={cart} />
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

export default Review;
