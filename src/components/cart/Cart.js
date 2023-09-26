// you have time for this, please think about your health
// use context file
import { useSelector} from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";
import { useEffect } from "react";
import { cartActions } from "../../context/store/cartSlice";
import { useDispatch } from "react-redux";

// whenever cart changes calculate the price (think it is good now)
// problem with quantity, when I decrease quantity of an element to 0,
// another element quantity get decreased too
export function Cart () {
    const cart = useSelector(state => state.cartState.cart);
    const totalPrice = useSelector(state => state.cartState.totalPrice);
    // navigated to other page but the state stayed the same, lucky me
    const clearAllItems = () => {
        dispatch(cartActions.clearAll())
    }
    const calculateTotalAmount = () => {
        dispatch(cartActions.calculateTotalAmount());
    }

    console.log(cart);
    
    const dispatch = useDispatch();
    useEffect(() => {
        calculateTotalAmount();
    }, [cart])
    
    const navigate = useNavigate()
    return (
    <>
    <CartItem items = {cart}/>
    <p>{`total: ${totalPrice.toFixed(2)}`}</p>
    <button onClick = {() => {
                    // use navigate does not refresh the page, that's why the states stays
                    navigate('/order/create');
                }}>Order</button>
    <button onClick={() => {
        clearAllItems();
    }}>Clear</button>
    </>
    )
}

// let's finish this with redux as we started