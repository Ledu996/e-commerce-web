// import states here
// REDUX - Complete state management tool with a single store as cds(don't know)
// Reducers - manages the state and returns the newly updated state
// Actions -  have two property types: which is a unique identifier and a payload witch has data
// Dispatch - is used to send actions to update the data 

// #Defining a store using react toolkit
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import paginationSlice from "./paginationSlice";
import orderSlice from "./orderSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({reducer: {
    cartState: cartSlice.reducer,
    productState: productSlice.reducer,
    paginationSlice: paginationSlice.reducer,
    orderSlice: orderSlice.reducer,
}});
