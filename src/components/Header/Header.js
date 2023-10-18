import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartIcon } from "../cart/CartIcon/CartIcon"
import { HomeHeader } from "./HomeHeader/HomeHeader";
import { ProductHeader } from "./ProductHeader/ProductHeader";
import LogoImage from "../../assets/images/5e1810155461c7a12672d9b7aca66d48.png"
import HamburgerMenu from "../../assets/images/hamburger.png";
import { LanguagePicker } from "../Language/LanguagePicker";
import "./style.css";


export function Header() {
    const location = useLocation();
        // create different kind of header when width of the browser reaches mobile device width
    return (

        <>
            {
            location.pathname === '/products' 
            ? <ProductHeader /> : <HomeHeader />}
        </>
       
    )
}


/* <header className = "users__header">
            <div className="logo__container">
                {/*<img src = {LogoImage} style={{width: '100px'}}/>}
            </div>
            
            <div className="nav__container">
                {homeHeaderData.map(({title}) => <nav className="nav__item">{title}</nav>)}
            </div>
            <div className="user__options_nav">
            <LanguagePicker /> 
            <CartIcon />
            <div style={{}}>User Profile</div>
            </div>
        </header> */