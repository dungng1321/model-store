import { useContext, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FlyingImg.css'
import { ModalContext } from '../../Context/ModalContext'


function FlyingImg({ ImgSrc, x, y }) {

    const cartPos = useContext(ModalContext)

    // function getOffset(el) {
    //     const rect = el.getBoundingClientRect();
    //     return {
    //         left: rect.left + window.scrollX,
    //         top: rect.top + window.scrollY
    //     };
    // }


    const flyToCart = {
        visible: {
            opacity: 1, transition: {
                ease: "easeOut",
                duration: 1.5
            },
            left: cartPos.cartPosition.x,
            top: -cartPos.cartPosition.x,
            transform: "scale(0)"
        },
        hidden: {
            opacity: 0, transition: {
                ease: "easeOut",
                duration: 1.5
            },
            left: 0,
            top: 0,
            transform: "scale(1)"
        }
    }

    return (
        <motion.div
            variants={flyToCart}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fly-to-cart"
        >
            <img src={ImgSrc}></img>
        </motion.div>
    )
}

export default FlyingImg