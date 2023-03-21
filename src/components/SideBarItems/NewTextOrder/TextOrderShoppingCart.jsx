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
  List
} from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../../../theme";

const TextOrderShoppingCart = ({ nextStep, backStep, shippingData }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <>
    <List disablePadding>
    <ListItem style={{ padding: '10px 0' }}>
      <ListItemText primary="Shipping Info:" secondary={
        <div>
          <div>{shippingData.ShippingName}</div>
          <div>{shippingData.ShippingAddress1}</div>
          <div>{shippingData.ShippingAddress2}</div>
          <div>{shippingData.ShippingCity}, {shippingData.ShippingState} {shippingData.ShippingZipCode}</div>
          <br></br>
          <div>{shippingData.Email}</div>
          <div>{shippingData.PhoneNo}</div>
        </div>
      }/>
    </ListItem>
    </List>
    
    <h1>SHOPPING CART</h1>
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
}

export default TextOrderShoppingCart