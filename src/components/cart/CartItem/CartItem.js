import { useSelector} from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../context/store/cartSlice";
import CloseIcon from "../../../assets/images/close (1).png";
import PlusIcon from "../../../assets/images/plus.png";
import MinusIcon from "../../../assets/images/minus-sign.png";

import "./style.css";

export function CartItem ({items}) {
    const dispatch = useDispatch();
    console.log('Cart Items ', items);
    const incItemQuantity = (id) => {
        dispatch(cartActions.increaseItemQuantity(id));
    }
    const decItemQuantity = (id) => {
        dispatch(cartActions.decreaseItemQuantity(id));
    }
    // buttons here are actions
    return (
        <>
            {items.map(item => {
                console.log('Cart item image ', item.image);
                let description = 
                    item.description.length > 50 ? 
                    `${item.description.slice(0, 20)} ...` : item.description;
                return (
                <div className = "cart__item" key={item._id}>
                    <div className="cart_item_info">
                        <img src = {item.image} alt = {"non"}/>
                        <span>{item.name}</span>
                    </div>
                    
                    <div className="cart__item__options">
                        <img className="plus__icon" src = {PlusIcon} onClick={() => {incItemQuantity(item._id)}}/>
                        <img className = "minus__icon" src = {MinusIcon}onClick = {() => {decItemQuantity(item._id)}} /> 
                        <span> <img className="multiple_icon" src = {CloseIcon} />{`${item.quantity}`}</span>
                        <img className = "close__item__icon"src = {CloseIcon} onClick={() => {
                        dispatch(cartActions.deleteItem({_id: item._id}))
                        }}/>
                    </div>
                </div>
                )
            })}
        </>
    )
}