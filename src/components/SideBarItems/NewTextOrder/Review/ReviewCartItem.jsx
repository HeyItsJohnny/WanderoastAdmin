import React from "react";
import { Button, Typography, ListItem, ListItemText, Box } from "@mui/material";
import { useMode, tokens } from "../../../../theme";
import { useDispatch } from "react-redux";

const ReviewCartItem = ({ cart }) => {
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
      <Typography variant="body2">
        Price per Unit: {currencyFormat(cart.lineamount)}
      </Typography>
    </ListItem>
  </>
  )
};

export default ReviewCartItem;
