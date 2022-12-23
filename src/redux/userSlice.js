import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        forgetPassClick: false,
        isOpenFilter: false,
        productDetail: {},
    },
    reducers: {
        setForgetPassClick: (state, action) => {
            state.forgetPassClick = action.payload
        },
        setIsOpenFilter: (state, action) => {
            state.isOpenFilter = action.payload
        },
        openProductDetails: (state, action) => {
            state.productDetail = action.payload
        },
    }
})

export const { setForgetPassClick, setIsOpenFilter, openProductDetails } = userSlice.actions;
export default userSlice.reducer;