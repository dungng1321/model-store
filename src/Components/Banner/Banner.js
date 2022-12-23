import './Banner.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


function Banner() {

    const animation = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.4,
            }
        },
        hidden: {
            opacity: 1,
        }
    }

    const childAnimations = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "easeOut",
                duration: 1
            }
        },
        hidden: {
            opacity: 0,
            y: "3vw"
        },

    }

    return (
        <div className="banner">
            <div className="container">
                <div className="banner-left-cover"></div>
                <div className="banner-bottom-cover"></div>
                <motion.div
                    variants={animation}
                    initial="hidden"
                    animate="visible"
                    className="content"
                >
                    <motion.h1
                        variants={childAnimations}
                    >
                        Mô Hình Độc Đáo Chất Lượng Cao
                    </motion.h1>
                    <motion.h3
                        variants={childAnimations}
                    >
                        Mang đến cho bạn cảm giác mua sắm hoàn hảo
                    </motion.h3>
                    <Link to='/products'>
                        <motion.a variants={childAnimations}><motion.button
                            className="banner-btn"
                        >
                            Khám Phá Ngay
                        </motion.button></motion.a>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner