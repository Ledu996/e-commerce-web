import { createSlice } from "@reduxjs/toolkit";

// cart slice
// this cart represent place where items for an order is stored
// this is different than a product, cart items are

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [], 
        totalQuantity: 0,
        isOpen: false,
        totalPrice: 0
    },
    reducers: { 
        
        getAllItems: (state, action) => { 
            return state.cart.map((item) => ({...item}) );
        }, 

        addItem: (state, action) => {
            // product {_id, quantity}
            const { payload } = action;
            console.log('Adding item ', payload);
            // map cannot go trough if array is empty, first we need to check if array is empty
            if (!state.cart.length) { // only if array length is equal to 0
                console.log('Not 0 anymore');
                state.cart = [...state.cart, {...payload, quantity: 1}]
                state.totalQuantity++;
                // cartSlice.caseReducers.updateTotalPrice();
                return; // end result array
            }
            // object is passed by reference, thats why you updated it's state, buy just reassigning a value
            // with find 
            const existingItem = state.cart.find(e => e._id === payload._id);
            if (!existingItem) {
                state.cart = [...state.cart, {...payload, quantity: 1}]
                state.totalQuantity++;
            } else {
                existingItem.quantity ++;
                state.totalQuantity++;
            }
        },

        updateItem: (state, action) => {
            const { payload } = action; // get the update name too
            state.cart.map((item) => {
                return item._id === payload._id ? {...item, name: 'updatedName'} : {...item}
            })
        },

        changeStatus: (state, action) => {
            console.log('FIRED EVENT')
            state.isOpen = !state.isOpen;
            console.log('Is open', state.isOpen);
        },

        deleteItem: (state, action) => {
            // can do it with filter, also with splice
            const { payload: { _id } } = action;
            const element = state.cart.findIndex(el => el._id === _id);
            
            state.totalQuantity = state.totalQuantity - state.cart[element].quantity;
            state.cart = state.cart.filter((item) => _id !== item._id);
        },
        clearAll: (state, action) => {
            state.cart = [];
            state.totalQuantity = 0;
        },

        increaseItemQuantity: (state, action) => {
            const { payload } = action;
            // update a element state, value
            state.cart.map((e) => e._id === payload ? (e.quantity++, state.totalQuantity++): false)
        },
        // if elements quantity is 0 remove it
        // decreasing last item quantity will shift down the others
        decreaseItemQuantity: (state, action) => {
            // something is wrong here
            const { payload } = action;
            state.cart.map((e, idx, arr) => {
                // something is wrong
                // splice receives an id not the whole element
               return e._id === payload ? 
                      (e.quantity === 1) ? 
                      (state.cart.splice(idx, 1), state.totalQuantity--)
                    : (e.quantity--, state.totalQuantity--)
                    : e;
            } )
            
        },
        // when we add new element to the array, the total price restarts to value of last added element
        calculateTotalAmount: (state, action) => {
            state.totalPrice = state.cart.reduce((acc, currentValue, idx, arr) => {
                return acc +  currentValue.price * currentValue.quantity;
            }, 0)
             // console.log('Total price adding ', state.totalPrice)
        }

    }
})

// deal with structure of a page start making components

export const cartActions = cartSlice.actions;
export default cartSlice;
