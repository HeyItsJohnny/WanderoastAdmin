import * as yup from "yup";

const passwordRules = /^(?=.*\d) (?=.*[a-z]) (?=.*[A-Z]) . {5,}$/;

export const itemSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    region: yup.string(),
    elevation: yup.string(),
    itemid: yup.number().required("Required"),
    background: yup.string(),
    giftboxitems: yup.number(),
    itemtype: yup.string()
});

export const orderSchema = yup.object().shape({
    FirstName: yup.string().required("Required"),
    LastName: yup.string().required("Required"),
    ShipAddress1: yup.string().required("Required"),
    ShipAddress2: yup.string(),
    Email: yup.string().required("Required"),
    PhoneNo: yup.string().required("Required"),
    ShipCity: yup.string().required("Required"),
    ShipState: yup.string().required("Required"),
    ShipZip: yup.string().required("Required"),
});