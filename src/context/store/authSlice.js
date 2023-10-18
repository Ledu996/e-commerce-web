import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        credentials: {
            email: '',
            password: '',
        },
        isLogged: false,
    },
    reducers : {
        logIn: (state) => {},
        singUp: (action) => {},
        isLoggedIn: (state, action) => {
            const item = localStorage.getItem('item');
            if (!item) return false;
            state.isLogged = true;
        },
    }
})