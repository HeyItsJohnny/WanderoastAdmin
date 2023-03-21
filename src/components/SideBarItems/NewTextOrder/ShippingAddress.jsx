import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useMode, tokens } from "../../../theme";

import { db } from "../../../Firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

//FORM
import { useFormik, FormikProvider } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShippingAddress = ({ setAddressAndContinue, backStep, customerID }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [customer, setCustomer] = useState({});

  const onSubmit = (values) => {
    //Next Step & Get set the Shipping Values
    setAddressAndContinue(values);
  };

  const setCustomerFromID = async () => {
    try {
      const customerRef = doc(db, "customer-profile", customerID);
      const customerSnap = await getDoc(customerRef);
      if (customerSnap.exists()) {
        setCustomer(customerSnap.data());
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setCustomerFromID();
  }, []);

  //Formik
  const formik = useFormik({
    initialValues: {
      ShippingName: customer.ShippingName,
      ShippingAddress1: customer.ShippingAddress1,
      ShippingAddress2: customer.ShippingAddress2,
      ShippingCity: customer.ShippingCity,
      ShippingState: customer.ShippingState,
      ShippingZipCode: customer.ShippingZipCode,
      Email: customer.Email,
      PhoneNo: customer.PhoneNo,
    },
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShippingName"
              label="Ship to Name"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShippingAddress1"
              label="Ship to Address 1"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingAddress1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              id="ShippingAddress2"
              label="Ship to Address 2"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingAddress2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShippingCity"
              label="Ship to City"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingCity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShippingState"
              label="Ship to State"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingState}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShippingZipCode"
              label="Ship to Zip Code"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingZipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="Email"
              label="Email"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="PhoneNo"
              label="Phone No."
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.PhoneNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
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
              type="submit"
            >
              Next
            </Button>
          </Box>
        </form>
      </FormikProvider>
    </>
  );
};

export default ShippingAddress;
