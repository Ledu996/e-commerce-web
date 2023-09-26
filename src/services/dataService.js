import axios from "axios"
import { useState } from "react";

// check what is wrong with an error messages is it because I send status codes from responses
// when I return a response it gives me a message with a red screen


// before catching it shows runtime error, first we need to handle that
// maybe it was better to create a hook fo it, because we can enter states inside 
export async function fetchData ({path, method, body}) {
    // cannot call useState inside a function

    try {
        const token = localStorage.getItem('user');
    
        console.log('Body to send ', body);
    // we can handle this by catching errors, updating the error state, and show it to the screen
    // everything has it's limitations, but axios is crazy
    var response  = await fetch(path, {
      headers: {
        // has to be content-type here because it did not see an object we are sending
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      method,
      // have to stringify it, because it will gives us an error on the backend 
      body: JSON.stringify(body),
    })
    const resData = await response.json();
    console.log(response, resData);
    // message from the backend in there, how to import (checked)
    if(!response.ok) {
        throw new Error(`${resData.message}`)
    }
     const {results, message} = resData; // results : {accessToken}
    
     return { results, message, status: response.status }
    }
    catch (err) {
        return {message: err.message, status: response.status, results: null}
    }
}
