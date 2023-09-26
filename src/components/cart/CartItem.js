import { useSelector} from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { cartActions } from "../../context/store/cartSlice";


export function CartItem ({items}) {
    const dispatch = useDispatch();

    const incItemQuantity = (id) => {
        console.log('Id passed ', id);
        dispatch(cartActions.increaseItemQuantity(id));
    }
    const decItemQuantity = (id) => {
        dispatch(cartActions.decreaseItemQuantity(id));
    }
    // buttons here are actions
    return (
        <>
            {items.map(item => {

                let description = 
                    item.description.length > 50 ? 
                    `${item.description.slice(0, 20)} ...` : item.description;
                return (
                <div>
                    <li>{item.name}</li>
                    <li>{item.quantity}</li>
                    <li>{description}</li>
                    <button onClick={() => {incItemQuantity(item._id)}}>+</button>
                    <button onClick = {() => {decItemQuantity(item._id)}}>-</button> 
                </div>
                )
            })}
        </>
    )
}