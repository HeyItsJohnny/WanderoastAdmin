import React, { useState } from "react";

import { useMode, tokens } from "../../theme";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { db } from "../../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const OrderStatusChange = ({ selectedNewOrderStatus }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orderStatus, setOrderStatus] = useState("");

  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const handleReset = () => {
    setOrderStatus("");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedNewOrderStatus({orderStatus});
    handleReset();
  };

  /*
  function changeOrderStatus() {
    if (selectedOrders.length === 0) {
      alert("Nothing was selected.");
    } else {
      for (var key in selectedOrders) {
        console.log(selectedOrders[key].FullName);
      }
    }
  }
  */

  return (
    <>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={() => {
          handleShow();
        }}
      >
        <ChangeCircleIcon sx={{ mr: "10px" }} />
        Change Status
      </Button>
      <Dialog open={show} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Change Status</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderStatus}
                label="New Order Status"
                onChange={handleChange}
                required
              >
                <MenuItem value="Order Created">Order Created</MenuItem>
                <MenuItem value="Incomplete/Issue">Incomplete/Issue</MenuItem>
                <MenuItem value="Order Shipped">Order Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Refunded">Refunded</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default OrderStatusChange;
