import React, { useState } from "react";

import { useMode, tokens } from "../../theme";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import { db } from "../../Firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const OrderStatusChange = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [itemSize, setItemSize] = useState("");

  const handleChange = (event) => {
    setItemSize(event.target.value);
  };

  const handleReset = () => {
    setItemSize("");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //addItemSizeDoc(e);
    handleReset();
  };

  /*
  async function addItemSizeDoc(data) {
    await addDoc(collection(db, "items", itemid, "sizes"), {
      Name: itemSize,
      Price: data.target.price.value,
    });
  }*/

  return <div>OrderStatusChange</div>;
};

export default OrderStatusChange;
