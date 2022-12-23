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