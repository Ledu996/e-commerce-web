import { useState, useEffect } from "react";
import { fetchData } from "../services/dataService";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../context/store/cartSlice";
import { productActions } from "../context/store/productSlice";
import { Product } from "../components/product/product";
import { Cart } from "../components/cart/Cart";


// try to make a functional home page with all the components needed for here
// also try to implement products functionalities with redux, and states
// see what is going on with the post method of axios
// but do not jump from place to place finish what you intended on backend

export function Home () {
    const products = useSelector(state => state.productState.products);
    const quantity = useSelector(state => state.cartState.totalQuantity);
    const isCartOpen = useSelector(state => state.cartState.isOpen)
    const dispatch = useDispatch();
    
    const showModal = () => {
        dispatch(cartActions.changeStatus());
    }
    const setProducts = (items) => {
        dispatch(productActions.setProducts(items));
    }
    const setProductName = (value) => {
        dispatch(productActions.setName(value));
    }
    const getProductsByName = () => {
        // console.log(productName);
        dispatch(productActions.getProductsByName());
    }
    const getProductsByPrice = () => {
        dispatch(productActions.getProductsByPrice(100));
    }
    console.log('Total quantity ', quantity);
    
    useEffect(() => {
        const getData = async () => {
            const data = await fetchData({path: 'http://localhost:5000/products/all', method: 'get'})
            const { results } = data;
            setProducts(results);
        }
        getData();
    }, []) // executes only one time, after component renders

    // problem is in within the state, like it is always late, rendering problem
    // logic for filter is good but, you need to know how filter works
    // it is late a lot, behaves funny
    return (
        <div>
            <button onClick = {showModal}>{`Number Of Items ${quantity}`}</button>
            {isCartOpen ?  <Cart/> : null }
            <input type="text" placeholder="ProductName" onChange={(e) => {
                // muito estranho
                setProductName(e.target.value);
                getProductsByName();
                console.log('Hello There');

            }}/>
            <Product products = { products } /> 
        </div>
    )
}