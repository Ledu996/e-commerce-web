import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/dataService"; 
import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import ShowPasswordIcon from "../../assets/images/icons/sow_hide_passwords/eye.png";
import HidePasswordIcon from "../../assets/images/icons/sow_hide_passwords/show.png";
import "./style.css";

export function LogIn () {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState({message: '', state: false});
    const [ isPasswordHidden, setPasswordIsHidden ] = useState(true);
    const invalidCodes = [400, 401, 402, 403, 404, 500]; // helpers

    const showPassword = () => {
        setPasswordIsHidden(prev => !prev);
    }

    const navigate = useNavigate();

    return (
        <Layout>
        <Header />
        <div className="login__wrapper">
            <div className="image__wrapper">

            </div>
        <form className="login__form" onSubmit = { async (e) => {
            e.preventDefault();
            const response = await fetchData({path: 'http://localhost:5000/users/signIn', method: 'post', body: {username, password}})
            const { results, status, message: newMessage } = response;
            // this will repeat, have to solve it one solution is by saving an error state inside fetch function
            // on every request it will check if status codes are valid  
            console.log('Log in results ', results);
            // we change the value of our error state, based on a form click 
            // that is not good, maybe defining a custom hook is a good solution
            // or something else, we have to check
            if(invalidCodes.includes(status)) {
                setError(prev => ({...prev, state: !prev.state, message: newMessage}))
                console.log('states ', error.state, error.message);
                return;
            }
            console.log(results.accessToken);
        
                localStorage
                .setItem('user', 
                JSON.stringify({accessToken: results.accessToken, state: results.state}))

                // role check
                results.role === 'User' ? navigate('/products') : navigate('/admin/home')
        }}>
            <h1>Welcome Back!</h1>
            <span>Please enter your details</span>
            <div className="input__wrapper">
                <label>username</label>
                <input type = "text" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input__wrapper password">
                <label>password</label>
                <input type = {isPasswordHidden ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} />
                 <a  className = "forgot__password" href = "#">Forgot Password</a>
                 <img 
                    className = "show__password_icon"
                    src= {isPasswordHidden ? HidePasswordIcon: ShowPasswordIcon} 
                    alt = "show-password"
                    onClick={() => {showPassword()}} 
                 />
            </div>
            <button type = "submit">LogIn</button>
            {error.state && <p>{error.message}</p>}
        </form>
    </div>
    </Layout>
    )
}