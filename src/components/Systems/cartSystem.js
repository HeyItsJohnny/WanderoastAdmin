import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalquantity: 0,
    subtotal: 0,
    discount: 0,
    couponCode: "",
    internalComments: "",
    customerNotes: "",
    total: 0
}

const cartSystem = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddCart:(state,action)=> {
            state.cart.push(action.payload);
            state.subtotal += action.payload.unitprice * action.payload.quantity;
            state.totalquantity += action.payload.quantity * 1;
            state.total = state.subtotal;
        },
        DeleteCart:(state,action)=> {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            state.subtotal -= action.payload.unitprice * action.payload.quantity;
            state.totalquantity -= action.payload.quantity * 1;
            state.total = state.subtotal;
        },
        ResetCart:(state) => {
            state.cart = [];
            state.totalquantity = 0;
            state.subtotal = 0;
            state.discount = 0;
            state.couponCode = "";
            state.internalComments = "";
            state.customerNotes = "";
            state.total = 0;
        },
        AddOneToCart:(state,action)=> {
            var item = state.cart.find(cart => cart.id === action.payload.id);
            item.quantity += 1;
            state.subtotal += action.payload.unitprice * 1;
            state.totalquantity += action.payload.quantity * 1;
            state.total = state.subtotal;
        },
        DeleteOneToCart:(state,action)=> {
            if (action.payload.quantity - 1 === 0 ) {
                state.cart = state.cart.filter((item) => item.id !== action.payload.id);
                state.subtotal -= action.payload.unitprice * 1;
                state.totalquantity -= action.payload.quantity * 1;
                state.total = state.subtotal;
                state.discount = 0;     //Reset the discount
            } else {
                var item = state.cart.find(cart => cart.id === action.payload.id);
                item.quantity -= 1;
                state.subtotal -= action.payload.unitprice * 1;
                state.totalquantity -= action.payload.quantity * 1;
                state.total = state.subtotal;
                state.discount = 0;     //Reset the discount
            } 
        },
        AddDiscountToCart:(state,action) => {
            state.discount = action.payload.discount;
            state.total = state.subtotal - state.discount;
        },
        RemoveDiscountFromCart:(state,action) => {
            state.discount = action.payload.discount;
            state.total = state.subtotal + state.discount;
        },
        RestDiscountFromCart:(state) => {
            state.discount = 0;
            //state.total = state.subtotal + state.discount;
        },
        AddCouponCodeToCart:(state,action) => {
            state.couponCode = action.payload.couponCode;
        },
        RemoveCouponCodeFromCart:(state,action) => {
            state.couponCode = action.payload.couponCode;
        },
        AddInternalComments:(state,action) => {
            state.internalComments = action.payload.internalComments;
        },
        AddCustomerNotes:(state,action) => {
            state.customerNotes = action.payload.customerNotes;
        },
    }
})

export const {AddCart,DeleteCart,AddOneToCart,DeleteOneToCart,AddDiscountToCart,RemoveDiscountFromCart,AddCouponCodeToCart,RemoveCouponCodeFromCart,ResetCart,RestDiscountFromCart, AddInternalComments, AddCustomerNotes} = cartSystem.actions;
export default cartSystem.reducer;