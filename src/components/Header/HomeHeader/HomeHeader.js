import { useNavigate } from "react-router-dom";
import { homeHeaderData } from "../../../helpers/headerData"
import { Logo } from "../../Logo/Logo";
import "./style.css";

export function HomeHeader () {
     const navigate = useNavigate();
    return (
        <header className="home__header">
            <Logo />
            <div className="nav__items">
            {homeHeaderData.map(({title, src}) => 
            <nav 
                  className={`nav__item ${title.toLowerCase().includes('join') ? 'join': ''}`}
                  onClick={() => navigate(src)}  
                >
                    {title}
                </nav>
            )}
            </div>
        </header>
    )
}