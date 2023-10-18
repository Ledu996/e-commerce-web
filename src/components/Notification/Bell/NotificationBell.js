import BellIcon from "../../../assets/images/bell.png";
import "./style.css";
export function NotificationBell () {
    return (
        <div className="notification__bell">
            <img src= { BellIcon } />
            <span className="notification__number">1</span>
        </div>
    )
}