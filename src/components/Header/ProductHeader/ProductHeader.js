import { SearchInput } from "../../Input/SearchInput";
import { LanguagePicker } from "../../Language/LanguagePicker";
import { Logo } from "../../Logo/Logo";
import { CartIcon } from "../../cart/CartIcon/CartIcon";
import { NotificationBell } from "../../Notification/Bell/NotificationBell";
import "./style.css";


export function ProductHeader () {
    return (
        <header className="product__header">
            <div className="user__support__functions">
                <Logo />
                <SearchInput />
            </div>

            <div className="user__nav__functions">
                <LanguagePicker />
                <CartIcon />
                <NotificationBell />
                <div className="nav__separator"></div>
            </div>
        </header>
    )
}






