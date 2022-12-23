import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const notify = (name, value) => toast.success(`Đã thêm ${value} ${name} vào giỏ hàng`, {
    theme: 'dark',
    pauseOnHover: false,
});
const notifyError = () => toast.error("Có lỗi xảy ra !", {
    theme: 'dark',
    pauseOnHover: false,
});
const notifyWarn = () => toast.warn("Bạn đã thêm tối đa sản phẩm này!", {
    theme: 'dark',
    pauseOnHover: false,
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productslist: [],
        cartEmpty: true,
        stockAvailable: {
            isAvailable: true,
            productID: 0,
        },
        stockAvailablePeek: false,
        cartPosition: {},
        addedProduct: {
            id: 0,
            amountAdded: 0,
        },
    },
    reducers: {
        //actions
        addItem: (state, action) => {
            state.cartEmpty = false

            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })
            let addedAmount = 0
            let checkValidAmount = true

            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded

                if (addedAmount >= action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {
                state.stockAvailable.isAvailable = true
                if (added === undefined) {
                    state.productslist.push(action.payload.product)
                } else {
                    let newAmount = 0
                    state.productslist.map((pro, index) => {
                        if (pro.id === added.id) {
                            newAmount = pro.amount + 1
                            state.productslist.splice(index, 1)
                        }
                    })
                    state.productslist = [...state.productslist, {
                        id: action.payload.id,
                        name: action.payload.name,
                        ImgSrc: action.payload.ImgSrc,
                        price: action.payload.price,
                        amount: newAmount,
                        maxAmount: action.payload.stock,
                    }]
                }
            } else {
                state.stockAvailable.isAvailable = false
            }

        },
        addItemFromPeek: (state, action) => {
            let added = state.productslist.find((product) => {
                return product.id === action.payload.id
            })


            let addedAmount = 0
            let checkValidAmount = true
            if (action.payload.id === state.addedProduct.id) {
                addedAmount = state.addedProduct.amountAdded

                if (action.payload.inputValue + addedAmount > action.payload.stock) {
                    checkValidAmount = false
                } else {
                    checkValidAmount = true
                }
            }

            if (checkValidAmount) {

                if (action.payload.inputValue >= 1) {
                    state.cartEmpty = false
                    notify(action.payload.name, action.payload.inputValue)
                    if (added === undefined) {
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload.thumbImg,
                            price: action.payload.price,
                            amount: action.payload.inputValue,
                            maxAmount: action.payload.stock,
                        }]
                    } else {
                        let newAmount = 0
                        state.productslist.map((pro, index) => {
                            if (pro.id === added.id) {
                                newAmount = pro.amount + action.payload.inputValue
                                state.productslist.splice(index, 1)
                            }
                        })
                        state.productslist = [...state.productslist, {
                            id: action.payload.id,
                            name: action.payload.name,
                            ImgSrc: action.payload.thumbImg,
                            price: action.payload.price,
                            amount: newAmount,
                            maxAmount: action.payload.stock,
                        }]
                    }
                } else {
                    notifyError()
                }
            } else {
                notifyWarn()
                state.stockAvailablePeek = true
            }
        },
        deleteItem: (state, action) => {
            let newAmount = 0
            let added = state.productslist.find((product) => {
                return product.id === action.payload
            })
            state.productslist.map((pro, index) => {
                if (pro.id === added.id) {
                    if (pro.amount === 1) {
                        state.productslist.splice(index, 1)
                        state.productslist = [...state.productslist]
                    } else {
                        newAmount = pro.amount - 1
                        state.productslist.splice(index, 1)
                        state.productslist = [...state.productslist, {
                            id: pro.id,
                            name: pro.name,
                            ImgSrc: pro.ImgSrc,
                            price: pro.price,
                            amount: newAmount,
                            maxAmount: pro.maxAmount,
                        }]
                    }
                }
            })
        },
        cartEmpty: (state, action) => {
            state.cartEmpty = action.payload
        },
        setStockAvailable: (state, action) => {
            state.stockAvailable.isAvailable = action.payload.isAvailable
            state.stockAvailable.productID = action.payload.productID
        },
        setStockAvailablePeek: (state, action) => {
            state.stockAvailablePeek = action.payload
        },
        setAddedProduct: (state, action) => {
            state.addedProduct = action.payload
        },
        setCartPosition: (state, action) => {
            state.cartPosition = action.payload
        },
    }
})

export const { addItem, addItemFromPeek, deleteItem,
    cartEmpty, setStockAvailable, setStockAvailablePeek,
    setAddedProduct, setCartPosition } = cartSlice.actions;
export default cartSlice.reducer;
