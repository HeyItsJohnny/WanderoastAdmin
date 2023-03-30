import React from "react";
import {
  Button,
  Typography,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useMode, tokens } from "../../../../theme";

//Firebase

const TextOrderShoppingCartItem = ({ cart }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  
  return (
    <>
      <ListItem style={{ padding: "10px 0" }} key={cart.id}>
        <ListItemText
          primary={cart.name}
          secondary={
            <div>
              <div>Quantity: {cart.quantity}</div>
              <div>Size: {cart.size}</div>
            </div>
          }
        />
        <Typography variant="body2">{currencyFormat(cart.lineamount)}</Typography>
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
