import { createSlice } from "@reduxjs/toolkit";


const paginationSlice = createSlice({
    name: 'pagination',
    initialState : {
        currentPage: 1,
        limit: 10,
    },

    reducers : {
        // functions to define 
        updatePageAndLimitNumber : (state, action) => {
            const { payload } = action;
            state.currentPage = payload
        }
    }

})

export const paginationActions = paginationSlice.actions;
export default paginationSlice;
