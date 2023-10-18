// you have time for this, please think about your health
// use context file
import { useSelector} from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem/CartItem";
import { useEffect } from "react";
import { cartActions } from "../../context/store/cartSlice";
import { orderActions } from '../../context/store/orderSlice';
import { useDispatch } from "react-redux";
import CloseIcon from "../../assets/images/close (1).png";
import "./style.css";

// whenever cart changes calculate the price (think it is good now)
// problem with quantity, when I decrease quantity of an element to 0,
// another element quantity get decreased too
export function Cart () {
    const cart = useSelector(state => state.cartState.cart);
    const isOpen = useSelector(state => state.cartState.isOpen);
    const totalPrice = useSelector(state => state.cartState.totalPrice);
    // navigated to other page but the state stayed the same, lucky me
    const dispatch = useDispatch();

    const clearAllItems = () => {
        dispatch(cartActions.clearAll())
    }
    const calculateTotalAmount = () => {
        dispatch(cartActions.calculateTotalAmount());
    }

    const closeCart = () => {
        dispatch(cartActions.changeStatus());

    }
    
    useEffect(() => {
        calculateTotalAmount();
    }, [cart])
    
    const navigate = useNavigate()
    return (
    
    <div className={`cart__wrapper ${isOpen ? 'active' : ''}`}>
        
        <div className = "close__cart_function">
            <img src = {CloseIcon} onClick={() => {
                closeCart();
            }}/>
        </div>
        
        <div className="cart__item__list">
            <CartItem items = {cart}/>
        </div>

        <div className="item__order">
            <div className="item__price_wrapper">
                <span className="price__text">Total:</span>
                <span className="price__tag">{`${totalPrice.toFixed(2)}`}</span>
            </div>
            <div className="order__wrapper_buttons">
                <button className="proceed__order__btn" onClick = {() => {
                    dispatch(orderActions.setOrderItems(cart))
                    navigate('/order/create');
                }}>Order
                </button>
                {/*<button className="delete__order__btn" onClick={() => {
                    clearAllItems();
                }}>Clear
            </button>*/}
        </div>
     </div>
    </div>
    )
}

// let's finish this with redux as we started