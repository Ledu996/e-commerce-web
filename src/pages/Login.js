import { useState } from "react";
import { fetchData } from "../services/dataService"; 

export function LogIn () {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState({message: '', state: false});
    const invalidCodes = [400, 401, 402, 403, 404, 500]; // helpers


    return (
        <form onSubmit = { async (e) => {
            e.preventDefault();
            const response = await fetchData({path: 'http://localhost:5000/users/signIn', method: 'post', body: {username, password}})
            const { results, status, message: newMessage } = response;
            // this will repeat, have to solve it one solution is by saving an error state inside fetch function
            // on every request it will check if status codes are valid  

            // we change the value of our error state, based on a form click 
            // that is not good, maybe defining a custom hook is a good solution
            // or something else, we have to check
            if(invalidCodes.includes(status)) {
                setError(prev => ({...prev, state: !prev.state, message: newMessage}))
                console.log('states ', error.state, error.message);
                return;
            }
            console.log(results.accessToken);
            localStorage.setItem('user', results.accessToken)
            // see how to do this
            // redirect a user to a specific page depending on the role 
            // check a  role
        }}>
            <input type = "text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
            <input type = "password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type = "submit">LogIn</button>
            {error.state && <p>{error.message}</p>}
        </form>
    )
}



// need to check what role does user have and where to redirect him
            // you did well today tomorrow, finish up the tasks:
            // create a product slice with its functionalities
            // and also see the error handling stuff for status codes, it is a difficult a lot
            // need to get