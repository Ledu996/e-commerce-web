import "./style.css";
import SearchIcon from "../../assets/images/magnifying-glass.png"

export function SearchInput () {
    return (
        <div className="search__wrapper">
            <input type = "text" placeholder="Type products name..."/>
            <img  src = {SearchIcon} />
        </div>
    )
}