import { useEffect, useState, createContext } from "react";
import { fetchData } from "../services/dataService";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../context/store/orderSlice";
// import { addItem, clearAll, getAllItems } from "../context/store"; 
// here we manage states for an order, that we want to send to a backend
// products array, always has to stay, meaning when we refresh the page, they will stay

// create an order and also see how to send data appropriately
// concentrate on this first
// stay hard
export function CreateOrder () { // pass a cart with products
    const orderItems = useSelector(state => state.orderSlice.orderItems);
    const address = useSelector(state => state.orderSlice.address);
    const deliveryTypes = (state => state.orderSlice.deliveryTypes);
    const stores = useSelector(state => state.orderSlice.stores);

    const dispatch = useDispatch();
    // save orders somewhere, inside of local storage :)
    // different address, updates the current state of address
    // think about money converter it would be great to have
    const totalAmount = 0; // calculate it here because user has to see it 

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await fetchData({
                path: 'http://localhost:5000/orders/get-store-address/', 
                method: 'get'
            })
            console.log('Fetched from order ', data)
            
            const {results: {
                address: {address: {street, number, municipality, city }}, 
                stores,
                deliveryTypes,
                paymentTypes
            }} = data;
            dispatch(orderActions.setStores(stores));
            dispatch(orderActions.setCurrentAddress({street, number, municipality, city}));
            dispatch(orderActions.setDeliveryTypes(deliveryTypes));
            dispatch(orderActions.setPaymentTypes(paymentTypes));
        }
        fetchUserData();
        // arrange data to certain states 
    }, [])

    return (
        <>
        <form onSubmit= { async (e) => { // this is for posting data 
            e.preventDefault();
            await fetchData({path: 'http://localhost:5000/orders/create', method: 'post', body: {
                orderItems,
                address,
                stores,
                deliveryTypes,
            }});
            // await createAnOrder
        } }>
            <textarea placeholder = "additional Info"/>
            {/*<form>
                {
                    Object.keys(address).map((key) => {
                        return (
                            <>
                                <label>{key}:</label>
                                <input placeholder = {key} defaultValue = {address[key]}/>
                            </>
                        )
                    })
                }
            <button>Change address</button>
            </form>*/}
            <select defaultValue={'Select Shop'}> {/* CREATE COMPONENT SELECT    */}
                {
                    stores
                    .map(({name}, idx) => <option key={idx} value={name}>{name}</option>)
                }
            </select>
            <select>
                <option>{'pick-up'}</option>
                <option>{'delivery'}</option>
            </select>
            {orderItems.map((item) => <li>{item.name}</li>)}
            {/* Cancel Button */}
            {/* List of Products selected <List of products> */}
            <button type = 'submit'>Create</button>
        </form>
        </>
    )
}



