import { useEffect, useState, createContext } from "react";
import { fetchData } from "../services/dataService";
import { useSelector, useDispatch } from "react-redux";
// import { addItem, clearAll, getAllItems } from "../context/store"; 
// here we manage states for an order, that we want to send to a backend
// products array, always has to stay, meaning when we refresh the page, they will stay


export function CreateOrder () { // pass a cart with products
    const [ address, setAddress ] = useState({});
    const [ stores, setStores ] = useState([]); // [{stores}]
    const [ deliveryTypes, setDeliveryTypes ] = useState('');
    const [ cartItems, setCartItems ] = useState([]);
    const cart = useSelector((state) => state.cartState.cart);
    
    const dispatch = useDispatch();
    console.log('Cart ', cart);
    // save orders somewhere, inside of local storage :)
    // different address, updates the current state of address
    const totalAmount = 0; // calculate it here because user has to see it 

    // update item 
    // delete
    // clearAll
    // additem
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await fetchData({
                path: 'http://localhost:5000/orders/get-store-address/64ff01c0966fc1524c8d6eff', 
                method: 'get'
            })
            
            const {results: {address: {address: {street, number, municipality, city }}, shops}} = data;
            setStores(shops.map((shop) => ({...shop})));
            setAddress(prev => ({...prev, street, number, municipality, city  }))

        }
        fetchUserData();
        // arrange data to certain states 
    }, [])

    return (
        <>
        <form onSubmit= { async (e) => { // this is for posting data 
            e.preventDefault();
            await fetchData({path: 'http://localhost:5000/order/create', method: 'post', body: {
                address,
                stores,
                deliveryTypes,
                cartItems,
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
                {stores.map(({name}, idx) =>  <option key={idx}>{name}</option>)}
            </select>
            <select>
                <option>{'pick-up'}</option>
                <option>{'delivery'}</option>
            </select>
            {cart.map((item) => <li>{item.name}</li>)}
            {/* Cancel Button */}
            {/* List of Products selected <List of products> */}
            <button type = 'submit'>Create</button>
        </form>
        </>
    )
}

// Do not lose time here too much
// See how to make an order from a frontend, after that go back to backend
// Also see the plan for the project to keep developing 
// prepare some questions fo tomorrow's interview

