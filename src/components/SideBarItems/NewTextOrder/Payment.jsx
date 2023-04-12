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
} from "@mui/material";
import { ColorModeContext, useMode, tokens } from "../../../theme";
import { db } from "../../../Firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

const Payment = ({ lastStep, backStep, customerID }) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [customer, setCustomer] = useState({});
  const [cards, setCards] = useState([]);

  const accessToken =
    "EAAAENZV--OM44fVuZzZNEQ_jEcXyo37mB8AFYE5QdVR6TtIBCMw--vjumzooHGQ";

  const setCustomerFromID = async () => {
    try {
      const customerRef = doc(db, "customer-profile", customerID);
      const customerSnap = await getDoc(customerRef);
      if (customerSnap.exists()) {
        setCustomer(customerSnap.data());
        getCustomerCreditCards(customerSnap.data().squareID);
      }
    } catch (err) {
      alert(err);
    }
  };

  /*
  const getCustomerCardsFromURL = async (squareID) => {
    const response = await fetch(`https://connect.squareup.com/v2/customers/${squareID}/cards`, {
      mode: 'no-cors',  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const cards = await response.json();
    return cards;
  };

  const fetchCustomerCards = async (squareID) => {
    const customerCards = await getCustomerCardsFromURL(squareID);
    setCards(customerCards.cards);
  };
  */

  const getCustomerCreditCards = async (squareID) => {
    const response = await fetch(`https://wanderoast-api.herokuapp.com/api/getCustomerCards/${squareID}`);
    const data = await response.json();
    console.log("START");
    console.log(data);
  };

  useEffect(() => {
    setCustomerFromID();
  }, []);

  return (
    <>
      <h1>
        PAYMENT: {customer.CustomerFirstName} {customer.CustomerLastName}
      </h1>
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <p>Card Type: {card.card_brand}</p>
            <p>Card Last 4 Digits: {card.last_4}</p>
          </div>
        ))}
      </div>
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
        {/*
        <Button
          sx={{
            backgroundColor: colors.grey[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={lastStep}
        >
          Submit
        </Button>
        */}
      </Box>
    </>
  );
};

export default Payment;
