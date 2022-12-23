import { createSlice } from "@reduxjs/toolkit";

export const peekModalSlice = createSlice({
    name: 'peekModal',
    initialState: {
        showModal: false,
        showPeekModal: false,
        setProduct: undefined,
    },
    reducers: {
        openModal: (state, action) => {
            state.showModal = action.payload;
        },
        openPeekModal: (state, action) => {
            state.showPeekModal = action.payload;
        },
        setProduct: (state, action) => {
            state.setProduct = action.payload;
        },
    }
})

export const { openModal, openPeekModal, setProduct } = peekModalSlice.actions;
export default peekModalSlice.reducer;