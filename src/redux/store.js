import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import peekModalReducer from './peekModalSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        peekModal: peekModalReducer,
        user: userReducer,
    }
})

export default store;