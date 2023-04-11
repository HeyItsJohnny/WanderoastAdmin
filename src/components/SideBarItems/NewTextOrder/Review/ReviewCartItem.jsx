import React from "react";
import { Typography, ListItem, ListItemText } from "@mui/material";

const ReviewCartItem = ({ cart }) => {
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <>
    <ListItem style={{ padding: "10px 0" }} key={cart.id}>
      <ListItemText
        primary={cart.name + " (Size: " + cart.size + ")"}
        secondary={
          <div>
            <div>Quantity: {cart.quantity}</div>
            <div>Unit Price: {currencyFormat(cart.unitprice)}</div>
          </div>
        }
      />
      <Typography variant="body2">
        Total: {currencyFormat(cart.lineamount)}
      </Typography>
    </ListItem>
  </>
  )
};

export default ReviewCartItem;
