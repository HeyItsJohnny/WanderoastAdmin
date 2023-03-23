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
import { collection, query, onSnapshot } from "firebase/firestore";

//Firebase
import { db } from "../../../../Firebase/firebase";

const TextOrderShoppingCartItem = ({ item }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  
  return (
    <>
      <ListItem style={{ padding: "10px 0" }} key={item.id}>
        <ListItemText
          primary={item.Name}
          secondary={
            <div>
              <div>Quantity: 0</div>
            </div>
          }
        />
        <Typography variant="body2">$0.00</Typography>
      </ListItem>
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
          Subtract
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
          Add
        </Button>
      </ListItem>
    </>
  );
};

export default TextOrderShoppingCartItem;
