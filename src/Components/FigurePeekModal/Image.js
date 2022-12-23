import { useState } from 'react'
import { motion } from 'framer-motion'
import Loading from '../Loading/Loading'

function Image({ src }) {

    const [loadedImage, setLoadedImage] = useState(false)
    const imgg = {
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

    return (
        <>
            {loadedImage ? null : (
                <Loading />
            )}
            <motion.img
                variants={imgg}
                initial="hidden"
                animate="visible"
                style={loadedImage ? {} : { display: 'none' }}
                onLoad={() => setLoadedImage(true)}
                src={src} alt=""
            ></motion.img>
        </>

    )
}

export default Image