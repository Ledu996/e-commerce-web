// all for functionally for products will be stored here and and states
// see if we have a hook like a useEffect for redux
// filtering products by name, price(range), sort by (price, rating) etc...
// solution for range of min and max if min or max are included in the price show them
import { createSlice } from "@reduxjs/toolkit";

// see calculation for product individually
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        name: ''
    },
    reducers: {
        setName: (state, action) => {
            // updates better here, than with the set state
            const { payload: productName }  = action;
            console.log('Name of product here ', productName);
            state.name = productName;
        },
        setProducts: (state, action) => {
            const { payload } = action;
            console.log(payload);
            state.products = [...payload];
        },
        getProductsByName: (state, action) => { // payload a string
            const { payload: productName } = action;
            console.log('Product name ', state.name);
            // does not have to be one liner always it will come one day
            const filteredArray =  state.products.filter((item, idx, arr) =>
                item.name.toLowerCase().includes(state.name.trim().toLowerCase()) 
            ); // but if the condition does not match it will give us an empty array
            console.log('Filtered products ', state.products.length);
            state.products = !filteredArray.length ? state.products : filteredArray;

        },
        getProductsByPrice: (state, action) => {
            const { payload: productPrice } = action;
            state.products = state.products.filter(({price}) => price <= productPrice)
            console.log('Products by price ', state.products);
        },
        getProductsByCategory: (state, action) => {
            const {payload: productCategory} = action;
            state.products = state.products.filter(({category}) => category === productCategory)
        },
        createProduct: (state, action) => {},
        updateProduct: (state, action) => {},
        getProductById: (state, action) => {},
        deleteProduct: (state, action) => {},
    }
})

export const productActions = productSlice.actions;
export default productSlice;

// try to do something new, watch more videos about redux
// finish this stuff with products 
// se to figure out some stuff on backend and practice more
// Relax and take care, tchau
