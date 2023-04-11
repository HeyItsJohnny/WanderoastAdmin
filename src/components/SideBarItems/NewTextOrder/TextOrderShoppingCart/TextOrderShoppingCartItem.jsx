import React from "react";
import {
  Button,
  Typography,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import { useMode, tokens } from "../../../../theme";
import { AddOneToCart, DeleteOneToCart } from '../../../Systems/cartSystem';
import { useDispatch } from 'react-redux';

//Firebase

const TextOrderShoppingCartItem = ({ cart }) => {
  const [theme ] = useMode();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

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
        <Typography variant="body2">Total Amount: {currencyFormat(cart.lineamount)}</Typography>
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
            dispatch(DeleteOneToCart(cart));
          }}
        >
          Subtract
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
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
            dispatch(AddOneToCart(cart));
          }}
        >
          Add
        </Button>
      </ListItem>
    </>
  );
};

export default TextOrderShoppingCartItem;
