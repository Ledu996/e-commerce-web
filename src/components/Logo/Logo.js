import { useNavigate } from "react-router-dom";
import LogoIcon from "../../assets/images/pfizer.png";

export function Logo () {
    const navigate = useNavigate()
    return (
        <>
            <img src= {LogoIcon} style={{width: '30px', padding: '5px'}} onClick={() => navigate('/home')} />
        </>
    )
}