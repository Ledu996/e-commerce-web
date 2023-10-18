import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../context/store/cartSlice";
import cart from "../../../assets/images/bag.png";
import "./style.css"

export function CartIcon () {
    
    const quantity = useSelector(state => state.cartState.totalQuantity);
    const dispatch = useDispatch()
    
    const showModal = () => {
        dispatch(cartActions.changeStatus());
    }
    
    return (
        <div className="shopping__cart" onClick = {showModal}>
                <img  src = {cart} alt = {"cart"} />
                <div className="cart__quantity_wrapper">
                <span>{quantity}</span>
            </div>
        </div>
    )
}