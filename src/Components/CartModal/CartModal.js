import { useState, useEffect, memo } from 'react'
import './CartModal.css'
import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/peekModalSlice';
import { cartEmpty, deleteItem } from '../../redux/cartSlice';
import * as sharedFunction from '../../share/_shared';
import { openProductDetails } from '../../redux/userSlice';
import { products } from '../../data/products';

function CartModal() {

    //use redux
    const cartStore = useSelector((state) => state.cart)
    const peekModalStore = useSelector((state) => state.peekModal)
    const dispatch = useDispatch();


    const cartModal = {
        visible: {
            opacity: 1, x: 0, transition: {
                ease: "easeOut",
                duration: 0.3
            }
        },
        hidden: {
            opacity: 0, x: "20vw", transition: {
                ease: "easeOut",
                duration: 0.3
            }
        }
    }


    const handleCloseCart = () => {
        dispatch(openModal(false))
    }

    //delete product from cart
    const [deleteProduct, setDeleteProduct] = useState(false)

    const handleDeleteProduct = (indexId) => {
        setDeleteProduct(prev => !prev)
        dispatch(deleteItem(indexId))
    }


    //total price of product
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let total = 0;
        cartStore.productslist.forEach(product => {
            total += product.price * product.amount
        })

        if (cartStore.productslist < 1) {
            dispatch(cartEmpty(true))

        }
        setTotalPrice(total)

    }, [cartStore.productslist])



    //handle detail page 
    const handleOpenDetail = (id) => {
        let product = products.find(p => p.id === id);
        dispatch(openProductDetails(product))
    }
    //====================================


    return (
        <AnimatePresence exitBeforeEnter>
            {peekModalStore.showModal === true && (
                <>
                    <motion.div
                        variants={cartModal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="cart-modal"
                    >
                        <div className="close-cart-btn">
                            <CloseIcon onClick={() => handleCloseCart()} />
                        </div>

                        <h2 style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.18)' }}>Giỏ hàng:</h2>
                        <div className="cart-items">

                            {cartStore.cartEmpty === true && (
                                <>
                                    <AnimatePresence >
                                        <motion.div className="cart-lottie-container"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Player
                                                autoplay
                                                loop
                                                src="https://assets7.lottiefiles.com/packages/lf20_3VDN1k.json"
                                                style={{ height: '80%', width: '80%' }}
                                                className="cart-lottie"
                                            >
                                            </Player>
                                        </motion.div>
                                    </AnimatePresence>

                                    <h3>Giỏ hàng rỗng...</h3>
                                </>

                            )}

                            {cartStore.cartEmpty === false && (
                                <>
                                    <div className="lists">
                                        <AnimatePresence>
                                            {cartStore.productslist.map((product, index) => (
                                                <motion.div className="product-item"
                                                    key={product.id}
                                                    exit={{
                                                        opacity: 0, scale: 0.5, transition: {
                                                            ease: "easeOut",
                                                            duration: 0.3
                                                        }
                                                    }}
                                                >
                                                    <Link to={'/detail/' + product.name} onClick={() => handleOpenDetail(product.id)}>
                                                        <div className="product-img"
                                                            style={{
                                                                backgroundImage: `url(
                                                                "${product.ImgSrc}"
                                                                )`,
                                                            }}
                                                        >
                                                        </div>
                                                    </Link>
                                                    <div className="product-info">
                                                        <Link to={'/detail/' + product.name} onClick={() => handleOpenDetail(product.id)}>
                                                            <p className="product-name">{product.name}</p>
                                                        </Link>
                                                        <p className="product-price"><span>{product.amount} &times; </span>{sharedFunction.numberWithCommas(product.price)} ₫</p>
                                                        {/* {console.log("amount in cart:", product.amount)} */}
                                                    </div>
                                                    <div className="delete-product">
                                                        <span onClick={() => handleDeleteProduct(product.id)} style={{ fontSize: '20px' }}>&times;</span>
                                                    </div>

                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                    </div>

                                </>
                            )}


                        </div>

                        <div className="cart-bottom" style={{
                            borderTop:
                                `${cartStore.cartEmpty === false ? "1px solid rgba(255, 255, 255, 0.18)" : "0px"}`
                        }}>

                            {cartStore.cartEmpty === false && (
                                <div className="subTotal" style={{ marginTop: '10px' }}>
                                    <h3>Tổng cộng:</h3>
                                    <h3>{sharedFunction.numberWithCommas(totalPrice)} ₫</h3>
                                </div>
                            )}

                            <Link to={cartStore.cartEmpty === true ? "/products" : "/"}
                                className="view-cart-btn"
                                onClick={() => handleCloseCart()}>
                                <div className="view-cart">
                                    {cartStore.cartEmpty === true ? "Ghé Shop Ngay" : "Xem Giỏ Hàng"}
                                </div>
                            </Link>

                            {cartStore.cartEmpty === false && (
                                <Link to="/" className="checkout-btn">
                                    <div className="checkout">
                                        Thanh Toán
                                    </div>
                                </Link>
                            )}
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="backdrop-background"
                        onClick={() => handleCloseCart()}
                    ></motion.div>
                </>
            )
            }

        </AnimatePresence >
    )
}

export default memo(CartModal)