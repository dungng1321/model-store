import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories } from '../../data/categories';
import './FigurePeekModal.css'
import CloseIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
import Image from '../FigurePeekModal/Image'
import * as sharedFunction from '../../share/_shared';
import { useDispatch, useSelector } from 'react-redux';
import { openPeekModal } from '../../redux/peekModalSlice';
import { addItemFromPeek, setAddedProduct, setStockAvailablePeek } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';
import { openProductDetails } from '../../redux/userSlice';
import { toast } from 'react-toastify';


function FigurePeekModal() {

    const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
        theme: 'dark',
        pauseOnHover: false,
    });

    //use redux 
    const cartStore = useSelector((state) => state.cart)
    const peekModalStore = useSelector((state) => state.peekModal)
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState(1)


    const peekModal = {
        visible: {
            opacity: 1, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        }
    }

    //handleClosePeek
    const handleClosePeek = () => {
        dispatch(openPeekModal(false))
        setInputValue(1)
        dispatch(setStockAvailablePeek(false))
        setOtherImages()
    }
    //close with esc key
    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                dispatch(openPeekModal(false))
                setInputValue(1)
                dispatch(setStockAvailablePeek(false))
                setOtherImages()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    //handle add to cart 
    const [loadingBtn, setLoadingBtn] = useState(false)
    // const [max, setMax] = useState(false)
    const [add, setAdd] = useState(false)

    const handleAddToCart = () => {
        setAdd(prev => !prev)

        dispatch(addItemFromPeek({
            id: peekModalStore.setProduct.id,
            stock: peekModalStore.setProduct.stock,
            inputValue: inputValue,
            name: peekModalStore.setProduct.name,
            thumbImg: peekModalStore.setProduct.thumbImg,
            price: peekModalStore.setProduct.price,
        }))
        setLoadingBtn(true)
    }

    useEffect(() => {

        let added;
        if (peekModalStore.setProduct !== undefined) {
            added = cartStore.productslist.find((product) => {
                return product.id === peekModalStore.setProduct.id
            })
        }
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

    }, [peekModalStore.showPeekModal, add, inputValue])


    useEffect(() => {
        let delay
        if (loadingBtn === true) {
            delay = setTimeout(() => {
                setLoadingBtn(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [loadingBtn])

    //get category
    const getCategoryName = () => {
        let name
        if (peekModalStore.showPeekModal === true) {
            name = categories.find(cate => cate.id === peekModalStore.setProduct.categoryID)
        }
        return name.name
    }

    //custom input 
    // const [stockAvailable, setStockAvailable] = useState(false)

    const handleIncrese = () => {
        let addedAmount = 0
        if (peekModalStore.setProduct.id === cartStore.addedProduct.id) {
            addedAmount = cartStore.addedProduct.amountAdded
        }

        if (inputValue >= (peekModalStore.setProduct.stock - addedAmount)) {
            dispatch(setStockAvailablePeek(true))
            notifyWarn()
        } else {
            dispatch(setStockAvailablePeek(false))
            setInputValue(prev => prev + 1)
        }
    }

    const handleDecrese = () => {
        setInputValue(prev => prev - 1)
        dispatch(setStockAvailablePeek(false))

        if (inputValue <= 1) {
            setInputValue(1)
        }

    }

    const handleInput = (e) => {
        let newValue = parseInt(e.target.value)
        if (newValue <= 0) {
            setInputValue(1)
        } else {
            let addedAmount = 0
            if (peekModalStore.setProduct.id === cartStore.addedProduct.id) {
                addedAmount = cartStore.addedProduct.amountAdded
            }
            if (newValue >= (peekModalStore.setProduct.stock - addedAmount)) {
                dispatch(setStockAvailablePeek(true))
                notifyWarn()
                setInputValue((peekModalStore.setProduct.stock - addedAmount))
            } else {
                dispatch(setStockAvailablePeek(false))
                setInputValue(newValue)
            }
        }

    }

    //handle chose otherImages
    const [otherImages, setOtherImages] = useState()
    const handlePickImg = (src) => {
        setOtherImages(src)
    }

    const [activeSrc, setActiveSrc] = useState()
    useEffect(() => {
        if (peekModalStore.setProduct !== undefined) {
            if (otherImages !== undefined) {
                setActiveSrc(otherImages)
            } else {
                setActiveSrc(peekModalStore.setProduct.details.imageDescription)
            }
        }

    }, [peekModalStore.showPeekModal, otherImages])

    //handle detail page 
    const handleOpenDetail = () => {
        let product
        if (peekModalStore.setProduct !== undefined) {
            product = peekModalStore.setProduct
        }
        dispatch(openProductDetails(product))
    }


    // =================================
    return (
        <AnimatePresence exitBeforeEnter>
            {peekModalStore.showPeekModal === true && (
                <>
                    <motion.div
                        variants={peekModal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="peek-modal"
                    >
                        {/* close, status, error messages*/}

                        {peekModalStore.setProduct.status === "new" && (
                            <div className="peek-status">
                                <h3>Mới</h3>
                            </div>
                        )}
                        {peekModalStore.setProduct.status === "preOrder" && (
                            <div className="peek-status-order">
                                <h3>Đặt trước</h3>
                            </div>
                        )}
                        <div className="close-peek-btn">
                            <CloseIcon onClick={() => handleClosePeek()} />
                        </div>

                        {/* main peek detail */}
                        <div className="peek-imgs">
                            <div className="active-img">
                                {/* <img src={activeSrc} /> */}
                                <Image src={activeSrc} />
                            </div>
                            <div className="img-list">
                                {peekModalStore.setProduct.details.otherImages.slice(0, 4).map((image) => (
                                    <div className="img-item" key={image.id}
                                        style={{
                                            backgroundImage: `url( "${image.imgUrl}")`
                                        }}
                                        onClick={() => handlePickImg(image.imgUrl)}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="peek-details">

                            <div className="product-name mb">
                                <h2>{peekModalStore.setProduct.name}</h2>
                            </div>

                            <div className="product-price mb">
                                <h2>{sharedFunction.numberWithCommas(peekModalStore.setProduct.price)} ₫</h2>
                                {peekModalStore.setProduct.status === "preOrder" &&
                                    (<p style={{ marginTop: '10px' }}>
                                        <span style={{ color: '#fff', fontWeight: 600 }}>Đặt cọc: </span>
                                        {sharedFunction.numberWithCommas(peekModalStore.setProduct.depositPrice)} ₫
                                    </p>)}
                            </div>

                            <div className="product-description mb">
                                <p>{sharedFunction.truncate(peekModalStore.setProduct.details.description, 200)}</p>
                            </div>

                            <div className="product-quantity mb">
                                <div className="desc-btn" onClick={() => handleDecrese()}>-</div>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={e => handleInput(e)}
                                />
                                <div className={cartStore.stockAvailablePeek === false ? "insc-btn " : "insc-btn disable-click"} onClick={() => handleIncrese()}>+</div>
                            </div>

                            <div className="product-stock mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Kho: </span>
                                <span>{peekModalStore.setProduct.stock}</span>
                            </div>

                            <div className="product-category mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Danh mục: </span>
                                <span className="categoryName">{getCategoryName()}</span>
                            </div>

                            <div className="product-tagnames mb">
                                <span style={{ color: '#fff', fontWeight: 600 }}>Từ khóa: </span>
                                {peekModalStore.setProduct.tagName.map((tagName, index) => (
                                    <span key={index} className="tagNames"><a>{(index ? ', ' : '') + `${tagName}`}</a></span>
                                ))}
                            </div>

                            <div className="peek-btns">
                                {peekModalStore.setProduct.status !== "preOrder" && (<div className={loadingBtn === false ? "add-to-cart-btn" : "loading-btn"} onClick={() => handleAddToCart()}>
                                    {loadingBtn === false ? "Thêm Vào Giỏ" : "Đang thêm..."}
                                    {loadingBtn === true && <div ><CachedIcon className="loading-icon" /></div>}
                                </div>)}

                                {peekModalStore.setProduct.status === "preOrder" && (<div className="preOrder-btn">
                                    Liên hệ
                                </div>)}

                                <Link to={'/detail/' + peekModalStore.setProduct.name} onClick={handleOpenDetail}>
                                    <div className="details-btn">
                                        Xem chi tiết
                                    </div>
                                </Link>
                            </div>


                        </div>

                    </motion.div>

                    {/* backdrop background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="peek-backdrop-background"
                        onClick={() => handleClosePeek()}
                    ></motion.div>
                </>
            )}

        </AnimatePresence>
    )
}

export default FigurePeekModal