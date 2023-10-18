import { createSlice } from "@reduxjs/toolkit";

// getters and setters for the properties
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderItems: [], // cartItems
        address: {
            street: '',
            municipality: '',
            city: '',
        },
        stores: [],
        pickedStore: {_id: '', workingHours: {from: '', to: ''}, name: ''},
        additionalMessage: '',
        deliveryTypes: [],
        paymentTypes: [],
        pickedDelivery: '',
        payment: ''
    },
    reducers: {
        setOrderItems: (state, action) => {
            const {payload: orderItems} = action;
            state.orderItems = [...orderItems];
        },
        setCurrentAddress: (state, action) => {
            state.address = {...action.payload};
            console.log('Address has been set', state.address);
        },
        setStores: (state, action) => {
            state.stores = [...action.payload];
        },
        setDeliveryTypes: (state, action) => {
            state.deliveryTypes = [...action.payload];
        },
        setPaymentTypes: (state, action) => {
            state.paymentTypes = [...action.payload];
        },

        updateAddress: (state, action) => {},
        isStoreOpen: (state, action) => {
            // compare date of order with, stores workingHours
            if(new Date() > state.pickedStore.from || new Date() < state.pickedStore.to) {
                return 'Error'
            }
        },
    }
})

export const orderActions = orderSlice.actions;
export default orderSlice;
