// all for functionally for products will be stored here and and states
// see if we have a hook like a useEffect for redux
// filtering products by name, price(range), sort by (price, rating) etc...
// solution for range of min and max if min or max are included in the price show them
import { createSlice } from "@reduxjs/toolkit";

// see calculation for product individually
// lets do some kind of interface
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        name: '',
        totalQuantity: 0,
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
        setTotalQuantity: (state, action) => {
            const { payload: numberOfProducts } = action;
            state.totalQuantity = numberOfProducts;
        },
        getProductsByName: (state, action) => { // payload a string
            const { payload: productName } = action;
            // does not have to be one liner always it will come one day

            const filteredArray =  state.products.filter((item, idx, arr) =>
                item.name.toLowerCase().includes(state.name.trim().toLowerCase()) 
            ); // but if the condition does not match it will give us an empty array

            state.products = !filteredArray.length ? state.products : filteredArray;

        },
        getProductsByPrice: (state, action) => {
            const { payload: productPrice } = action;
            state.products = state.products.filter(({price}) => price <= productPrice)
        },
        getProductsByAscendingOrder: (state, action) => {
            state.products = state.products.sort((a, b) => a.price - b.price);
        },

        getProductsByCategory: (state, action) => {
            const {payload: productCategory} = action;
            state.products = state.products.filter(({category}) => category === productCategory)
        },
        getTopSoldProducts : (state, action) => {
            state.products = state.products
                    .sort((a, b) => b.numberOfSales - a.numberOfSales)
                    .slice(0, 5)
        },
        // Admin stuff
        createProduct: (state, action) => {},
        updateProduct: (state, action) => {},
        getProductById: (state, action) => {},
        deleteProduct: (state, action) => {},
    }
})

export const productActions = productSlice.actions;
export default productSlice;

