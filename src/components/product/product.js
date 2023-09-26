import { useDispatch } from "react-redux";
import { cartActions } from "../../context/store/cartSlice";
export function Product ({products, numberOfProducts}) {
    // we need to add specific product to the cart 
    // add the whole product here
    const dispatch = useDispatch()
    
    const addItem = (item) => {
        dispatch(cartActions.addItem(item))
    }

    return (
        <>
        {
        products.map(
            ({name, price, _id, description}) => 
            <div key={_id}>
                <button onClick={() => {
                    addItem({_id, name, price, description});
                }}>addToCart</button> 
            </div>
        )
        }
        </>
    )
}

// products will also have functionalities for deleting and updating
// but only if logged in user is admin here