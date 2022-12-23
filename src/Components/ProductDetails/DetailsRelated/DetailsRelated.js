import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { products } from '../../../data/products';
import * as sharedFunction from '../../../share/_shared';
import Related from './Related';
import { motion } from 'framer-motion';

function DetailsRelated({ data }) {

    const grid = {
        visible: {
            opacity: 1, y: 0, transition: {
                ease: "easeOut",
                duration: 0.5, transition: {delay: 1}
            }
        },
        hidden: {
            opacity: 0, y: "5vw", transition: {
                ease: "easeOut",
                duration: 0.5, transition: {delay: 1}
            }
        }
    }

    //filter related product
    const [related, setRelated] = useState()

    useEffect(() => {
        let categoryID = data.categoryID;
        let filteredArr = products.filter((product) => product.categoryID === categoryID)

        //remove current product detail
        let index = filteredArr.findIndex((pro) => pro.id === data.id)
        if (index > -1) {
            filteredArr.splice(index, 1)
        }
        let finalData = sharedFunction.getRandom(filteredArr, 4)
        setRelated(finalData)
    }, [data])

    return (
        <div className="details-related">
            <h2>Sản phẩm liên quan</h2>
            <div className="related-products">
                <motion.div
                    variants={grid}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={3} className="product-grid-container">
                        {related && related.map((product, index) => (
                            <Grid
                                sm={6}
                                md={3}
                                xs={12}
                                item key={index}
                                className="product-grid-item"
                            >
                                <Related
                                    key={index}
                                    ImgSrc={product.thumbImg}
                                    name={product.name}
                                    price={product.price}
                                    status={product.status}
                                    id={product.id}
                                    stock={product.stock}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>

            </div>
        </div>
    );
}

export default DetailsRelated;
