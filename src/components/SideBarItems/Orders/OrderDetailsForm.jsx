import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

//UI
import { Box, Button, TextField } from "@mui/material";

//FORM
import { useFormik, Field, FormikProvider } from 'formik';
import useMediaQuery from "@mui/material/useMediaQuery";
import FormControl from '@mui/material/FormControl';

//DB
import { db } from '../../../Firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { useMode, tokens } from '../../../theme';
import { itemSchema } from '../../../schemas';

//Components
import Header from "../../Header/Header";

const OrderDetailsForm = ({order, orderid}) => {
  const [theme ] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const onSubmit = (values, actions) => {
    updateOrderDoc(values);
  }

  async function updateOrderDoc(values) {
    const itemRef = doc(db, "orders", orderid);
    await updateDoc(itemRef, {
      CustomerFirstName: values.FirstName,
      CustomerLastName: values.LastName,
      CustomerNotes: values.CustomerNotes,
      Email: values.Email,
      FullName: values.FirstName + " " + values.LastName,
      InternalComments: values.InternalComments,
      OrderType: values.OrderType,
      PaymentStatus: values.PaymentStatus,
      PhoneNo: values.PhoneNo,
      ShippingAddress1: values.ShipAddress1,
      ShippingAddress2: values.ShipAddress2,
      ShippingCity: values.ShipCity,
      ShippingName: values.ShipName,
      ShippingState: values.ShipState,
      ShippingZipCode: values.ShipZip,
      Status: values.OrderStatus,
      TrackingNo: values.TrackingNo
    });
    navigate("/orders");
  }

  const formik = useFormik({
    initialValues: {
        FirstName: order.CustomerFirstName,
        LastName: order.CustomerLastName,
        CustomerNotes: order.CustomerNotes,
        Discount: order.Discount,
        DiscountCode: order.DiscountCode,
        Email: order.Email,
        InternalComments: order.InternalComments,
        //OrderType: order.OrderType,
        //OrderDate: order.OrderDate,
        //PaymentStatus: order.PaymentStatus,
        PhoneNo: order.PhoneNo,
        ShipAddress1: order.ShippingAddress1,
        ShipAddress2: order.ShippingAddress2,
        ShipCity: order.ShippingCity,
        ShipState: order.ShippingState,
        ShipZip: order.ShippingZipCode,
        //OrderStatus: order.Status,
        Subtotal: order.Subtotal,
        ShippingCost: order.ShippingCost,
        Tax: order.Tax,
        Total: order.Total,
        TrackingNo: order.TrackingNo
    },
    enableReinitialize: true,
    validationSchema: itemSchema,
    onSubmit,
})

    return (
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
              id="FirstName"
              label="First Name"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.FirstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="LastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.LastName}
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
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              id="InternalComments"
              label="Internal Comments"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.InternalComments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
              multiline
              rows={4}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              id="CustomerNotes"
              label="Customer Notes"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.CustomerNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
              multiline
              rows={4}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShipAddress1"
              label="Shipping Address 1"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipAddress1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShipAddress2"
              label="Shipping Address 2"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipAddress2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShipCity"
              label="Shipping City"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipCity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShipState"
              label="Shipping State"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipState}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="ShipZip"
              label="Shipping Zip Code"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipZip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="TrackingNo"
              label="Tracking #"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.TrackingNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="DiscountCode"
              label="Discount Code"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.CouponCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="Discount"
              label="Discount ($)"
              type="number"
              fullWidth
              variant="filled"
              value={formik.values.Discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="Subtotal"
              label="Subtotal"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.Subtotal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="ShippingCost"
              label="Shipping Cost"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShippingCost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="Tax"
              label="Tax"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.Tax}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              required
              id="Total"
              label="Total"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.Total}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
            />
          </Box>
        </form>
      </FormikProvider>
    )
}

export default OrderDetailsForm