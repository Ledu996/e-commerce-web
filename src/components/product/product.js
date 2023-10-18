import { useDispatch } from "react-redux";
import { cartActions } from "../../context/store/cartSlice";
import { listOfCurrencies, findAppropriateCurrency } from "../../helpers/currencyData";
import "./style.css";

// have a userSlcie
export function Product ({products, numberOfProducts, currentPage, limit}) {
    // we need to add specific product to the cart 
    // add the whole product here
    console.log('Current page ', currentPage);
    const dispatch = useDispatch()
    const startIndex = (currentPage - 1) * limit; // 0
    const lastIndex = startIndex + limit;
    const addItem = (item) => {
        dispatch(cartActions.addItem(item))
    }
    console.log('Spliced array ', products.slice(currentPage, 10));
    // in sort there is condition if ascending or descending
    // was giving me an error, redux, cannot mutate state directly
    // task for tomorrow, have to see how to avoid, problem with sorting
    // on button click
    // when I change the page useEffect connects
    // maybe create states where it has true for both ascending and descending order
    // sort elements when fetched, clue dependency array
    // check if redux needs more states, and see that 
    // above is finished
    // here I need to take a look at flex box again


    return (
        <div className="product__list">
        {
        [...products]
        .slice(startIndex, lastIndex)
        .map(
            ({name, price, _id, description, images}) => { 
                const image = images.map((image) => {
                    console.log('Image is here ', image);
                     return  !image ? {image: 'NA'} : {image: image}
                })[0]
                // console.log('End result ',  image);
            return (
            <div className="product__item" key={_id}>
                <img className = "product__image" src= {images[0]}  alt = "non"/>
                <h3>{name}</h3>
                <p>{description.slice(1, 40)}</p>
                <div className="product__price__wrapper">
                <span>{(findAppropriateCurrency(price) * price).toFixed(2)}</span>
                <button onClick={() => {
                    addItem({_id, name, price, description, image: image});
                }}>addToCart</button> 
                </div>
            </div>
            )
        })
        }
        </div>
    )
}

// products will also have functionalities for deleting and updating
// but only if logged in user is admin here