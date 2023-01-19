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
import { orderSchema } from '../../../schemas';

//Components
import Header from "../../Header/Header";

const OrderDetailsForm = ({order, orderid}) => {
  const [theme ] = useMode();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const onSubmit = (values, actions) => {
    console.log("UPDATE");
    console.log(values.FirstName);
    updateOrderDoc(values);
  }

  async function updateOrderDoc(values) {
    //console.log("Order ID: " + orderid);  //Order ID is identified
    try{
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
    } catch(e) {
      alert("error: " + e)
    }
     
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
        OrderType: order.OrderType,
        OrderDate: order.OrderDate && order.OrderDate.toDate().toDateString(),
        PaymentStatus: order.PaymentStatus,
        PhoneNo: order.PhoneNo,
        ShipName: order.ShippingName,
        ShipAddress1: order.ShippingAddress1,
        ShipAddress2: order.ShippingAddress2,
        ShipCity: order.ShippingCity,
        ShipState: order.ShippingState,
        ShipZip: order.ShippingZipCode,
        OrderStatus: order.Status,
        Subtotal: order.Subtotal,
        ShippingCost: order.ShippingCost,
        Tax: order.Tax,
        Total: order.Total,
        TrackingNo: order.TrackingNo
    },
    enableReinitialize: true,
    validationSchema: orderSchema,
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
              InputProps={{ readOnly: true }}
              margin="dense"
              id="OrderDate"
              label="Order Date"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.OrderDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl fullWidth>
              <TextField
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: true }}
                  margin="dense"
                  id="OrderStatus"
                  label="Status"
                  type="text"
                  fullWidth
                  variant="filled"
                  value={formik.values.OrderStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ gridColumn: "span 1" }}
                  
              />
              <label>
                <Field type="radio" name="OrderStatus" value="Order Created" />
                Order Created
              </label>
              <label>
                <Field type="radio" name="OrderStatus" value="Incomplete/Issue" />
                Incomplete/Issue
              </label>
              <label>
                <Field type="radio" name="OrderStatus" value="Order Shipped" />
                Order Shipped
              </label>
              <label>
                <Field type="radio" name="OrderStatus" value="Delivered" />
                Delivered
              </label>
              <label>
                <Field type="radio" name="OrderStatus" value="Refunded" />
                Refunded
              </label>
            </FormControl>
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              id="OrderType"
              label="Order Type"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.OrderType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 1" }}
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
              id="ShipName"
              label="Shipping Name"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.ShipName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            
            <TextField
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
              margin="dense"
              id="PaymentStatus"
              label="PaymentStatus"
              type="text"
              fullWidth
              variant="filled"
              value={formik.values.PaymentStatus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
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
          <Box display="flex" justifyContent="end" mt="20px">
            <Button 
                variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px"
                }}
                type="submit">Save
            </Button>
          </Box>
        </form>
      </FormikProvider>
    )
}

export default OrderDetailsForm