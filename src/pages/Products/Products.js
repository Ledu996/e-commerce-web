import { useState, useEffect } from "react";
import { fetchData } from "../../services/dataService";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../context/store/cartSlice";
import { productActions } from "../../context/store/productSlice";
import { paginationActions } from "../../context/store/paginationSlice";
import { Product } from "../../components/product/product";
import { CartIcon } from "../../components/cart/CartIcon/CartIcon";
import { Cart } from "../../components/cart/Cart";
import  { Pagination }   from "../../components/Pagination/Pagination";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import { FilterBox } from "../../components/Filters/FilterBox/FilterBox";

import "./style.css";


export function ProductsPage () {
    const products = useSelector(state => state.productState.products);
    const isCartOpen = useSelector(state => state.cartState.isOpen);
    const totalNumberOfProducts = useSelector(state => state.productState.totalQuantity);
    const page = useSelector(state => state.paginationSlice.currentPage);
    const limit = useSelector(state => state.paginationSlice.limit);
    const [ isSorted, setIsSorted ] = useState(false);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
        
    
    const setProducts = (items) => {
        dispatch(productActions.setProducts(items));
    }
    const setProductName = (value) => {
        dispatch(productActions.setName(value));
    }
    const getProductsByName = () => {
        dispatch(productActions.getProductsByName());
    }
    const getProductsByPrice = (price) => {
        dispatch(productActions.getProductsByPrice(price));
    }
    
    const displayProductsInAscOrder = () => {
        dispatch(productActions.getProductsByAscendingOrder());
    }

    useEffect(() => {
        const getData = async () => {

            const data = await fetchData({path: `http://localhost:5000/products/all`, method: 'get'})
            console.log('All Products ', data);
            const { results: { products, totalNumberOfProducts, categories } } = data;
            if (isSorted) {
                displayProductsInAscOrder();
                return;
            }
            setProducts(products);
            setCategories(categories);
            dispatch(productActions.setTotalQuantity(totalNumberOfProducts));
                
        }
        getData();
    }, [page, isSorted]) // executes when the states are changing

    // problem is in within the state, like it is always late, rendering problem
    // logic for filter is good but, you need to know how filter works
    // it is late a lot, behaves funny
    // just made a good pagination component and that is it :D
    
    return (
        <Layout>
            <Header />
            <div className="home__wrapper">
            {isCartOpen ?  <Cart/> : null }
            
            <FilterBox categories = {categories}/>
            <Product 
              products = { products } 
              currentPage = {page} 
              limit={limit}
              /> 
        </div>

        <Pagination 
              totalCount = {totalNumberOfProducts} 
              pageSize = {limit}
              currentPage = {page}
              onPageChange = {(value) => {
                dispatch(paginationActions.updatePageAndLimitNumber(value))
              }}
            /> 
        </Layout>

    )
}

/**
 * 
 * 
 * 
 * 
            <div className="home__filter_options">
            <input 
            className="search__input" 
            type="text" 
            placeholder="ProductName" 
            onChange={(e) => {
                setProductName(e.target.value);
                getProductsByName();
            }}/>
            <button onClick={() => {
                setIsSorted(prev => !prev);
            }}>Sort</button>
            <select>Category</select>
            </div>
 */