import React, { useState } from "react";

//Light/Dark Mode
import { ColorModeContext, useMode, tokens } from "../../../../theme";
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

//Components
import Topbar from "../../../NAVBars/TopBar";
import Sidebar from "../../../NAVBars/SideBar";
import Header from "../../../Header/Header";
import SelectCustomer from "../SelectCustomer";
import ShippingAddress from "../ShippingAddress";
import TextOrderShoppingCart from "../TextOrderShoppingCart/TextOrderShoppingCart";
import Payment from "../Payment";
import Review from "../Review";

//Firebase
import { db } from "../../../../Firebase/firebase";

//UI
import useStyles from "./styles";

const steps = [
  "Select Customer",
  "Shipping Address",
  "Shopping Cart",
  "Review",
  "Payment",
];

const NewTextOrder = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();

  //Data
  const [customerID, setCustomerID] = useState("");
  const [shippingData, setShippingData] = useState({});
  const [orderData, setOrderData] = useState({});

  //Steps -
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //Steps +

  //Set Customer ID -
  const setCustomerAndContinue = (data) => {
    setCustomerID(data);
    nextStep();
  }
  //Set Customer ID +

  //Set Address -
  const setAddressAndContinue = (data) => {
    setShippingData(data);
    nextStep();
  }
  //Set Address +

  function getStepContent() {
    switch (activeStep) {
      case 0:
        return <SelectCustomer setCustomerAndContinue={setCustomerAndContinue} />;
      case 1:
        return <ShippingAddress setAddressAndContinue={setAddressAndContinue} backStep={backStep} customerID={customerID} />;
      case 2:
        return <TextOrderShoppingCart nextStep={nextStep} backStep={backStep} shippingData={shippingData} />;
      case 3:
        return <Review nextStep={nextStep} backStep={backStep} />;
      case 4:
        return <Payment lastStep={lastStep} backStep={backStep} />;
      default:
        return <h1>Something went wrong.</h1>;
    }
  }

  const Confirmation = () => (
    <>
      <div>
        <Typography variant="h5">Order Submitted!</Typography>
      </div>
    </>
  );

  const lastStep = (data) => {
    nextStep();
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Box m="20px">
              {/* HEADER */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Header title="NEW TEXT ORDER" subtitle="LIVE. LAUGH. LOVE." />
              </Box>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography variant="h4" align="center">
                    New Text Order
                  </Typography>
                  <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                      <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length ? (
                    <Confirmation />
                  ) : (
                    getStepContent()
                  )}
                </Paper>
              </main>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default NewTextOrder;
