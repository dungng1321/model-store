import { useEffect, useState, useRef } from 'react'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { products } from '../../data/products';
import './FigurePosterFlex.scss'
import CachedIcon from '@mui/icons-material/Cached';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import Image from '../FigurePeekModal/Image';
import * as sharedFunction from '../../share/_shared';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setAddedProduct } from '../../redux/cartSlice';
import { openPeekModal, setProduct } from '../../redux/peekModalSlice';
import { toast } from 'react-toastify';

function FigurePosterFlex({ ImgSrc, name, price, status, id, stock, description }) {
    
    const notify = (name) => toast.success(`Đã thêm 1 ${name} vào giỏ hàng`, {
        theme: 'dark',
        pauseOnHover: false,
    });

    //use redux,
    const cartStore = useSelector((state) => state.cart)
    const peekModalStore = useSelector((state) => state.peekModal)
    const dispatch = useDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false)
    const [add, setAdd] = useState(false)

    const handleAddToCart = () => {
        setAdd(prev => !prev)

        const product = {
            id: id,
            name: name,
            ImgSrc: ImgSrc,
            price: price,
            amount: 1,
            maxAmount: stock,
        }
        dispatch(addItem({
            product: product,
            id: id,
            name: name,
            ImgSrc: ImgSrc,
            price: price,
            stock: stock,
        }))
        notify(name)
        setLoadingBtn(true)
    }

    useEffect(() => {
        let delay
        if (loadingBtn === true) {
            delay = setTimeout(() => {
                setLoadingBtn(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [loadingBtn])


    const CustomToolTip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#d0d2d4',
            color: '#141414',
            width: 'fit-content',
            padding: '10px',
            fontSize: 15,
            fontFamily: 'Work Sans, sans-serif',
        },
    }));

    //open peek modal 
    const handleOpenPeek = () => {
        dispatch(openPeekModal(true))
        let newProduct
        newProduct = products.find(product => product.id === id)
        if (newProduct !== undefined) {
            dispatch(setProduct(newProduct))
        }
    }

    //check added products
    useEffect(() => {

        let added = cartStore.productslist.find((product) => {
            return product.id === id
        })
        let prevID
        if (added !== undefined) {
            dispatch(setAddedProduct({
                id: added.id,
                amountAdded: added.amount,
            }))
            prevID = added.id
        } else {
            dispatch(setAddedProduct({
                id: prevID,
                amountAdded: 0,
            }))
        }


    }, [add, cartStore.productslist])


    //set state for "added" button
    const [stockAvailable, setStockAvailable] = useState(true)
    useEffect(() => {
        let addedAmount = 0

        let added = cartStore.productslist.find((product) => {
            return product.id === id
        })

        if (added !== undefined) {
            if (id === cartStore.addedProduct.id) {
                addedAmount = cartStore.addedProduct.amountAdded

                if (addedAmount === stock) {
                    setStockAvailable(false)
                } else {
                    setStockAvailable(true)
                }
            } else {
                if (id === added.id) {
                    addedAmount = added.amount

                    if (addedAmount === stock) {
                        setStockAvailable(false)
                    } else {
                        setStockAvailable(true)
                    }

                }
            }
        }


    }, [cartStore.addedProduct.amountAdded, peekModalStore.showModal, cartStore.productslist])


    // =================================================================

    return (
        <div className="figurePosterFlex">
            <div className="container">
                <div className="figure-thumbnail">
                    {/* <img src={ImgSrc} /> */}
                    <Image src={ImgSrc} />
                    {status === "new" && (
                        <div className="figure-status">
                            <h3>Mới</h3>
                        </div>
                    )}

                    {status === "preOrder" && (
                        <div className="figure-status-order">
                            <h3>Đặt trước</h3>
                        </div>
                    )}

                    <CustomToolTip placement="top" title="Xem nhanh">
                        <div className="figure-peek" onClick={() => handleOpenPeek()}>
                            <div className="peek-icon-wrapper">
                                <ZoomOutMapRoundedIcon className="peek-icon" />
                            </div>
                        </div>
                    </CustomToolTip>
                </div>



                <div className="info-wrapper">
                    <div className="figure-info">
                        <h3>{name}</h3>
                        <p>{sharedFunction.numberWithCommas(price)} ₫</p>
                    </div>


                    <div className="figure-description">
                        <p>{sharedFunction.truncate(description, 200)}</p>
                    </div>
                    <div className="figure-btns">
                        <div style={{ width: '100%' }}>
                            {status !== "preOrder" && (<div className={loadingBtn === false ? (stockAvailable ? "add-to-cart-btn" : "add-to-cart-btn disable-click") : "loading-btn"} onClick={() => handleAddToCart()}>
                                {loadingBtn === false ? (stockAvailable ? "Thêm Vào Giỏ" : "Đã thêm") : "Đang thêm..."}
                                {loadingBtn === true && <div ><CachedIcon className="loading-icon" /></div>}
                            </div>)}

                            {status === "preOrder" && (<div className="preOrder-btn">
                                Liên hệ
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FigurePosterFlex;
