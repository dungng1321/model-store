import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { products } from '../../../data/products';
import { openProductDetails } from '../../../redux/userSlice';
import Image from '../../FigurePeekModal/Image';
import * as sharedFunction from '../../../share/_shared';


function Related({ ImgSrc, name, price, status, id, stock }) {

    const dispatch = useDispatch();

    const handleOpenDetail = () => {
        let product = products.find(p => p.id === id);
        dispatch(openProductDetails(product))
    }

    return (
        <div className="related-product">
            <div className="container">
                <div className="figure-thumbnail">
                    <Link to={'/detail/' + name} onClick={handleOpenDetail}>
                        <Image src={ImgSrc} />
                    </Link>

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
                </div>
                <div className="info">
                    <Link to={'/detail/' + name} onClick={handleOpenDetail}>
                        <h3>{sharedFunction.truncate(name, 25)}</h3>
                    </Link>
                    <p>{sharedFunction.numberWithCommas(price)} ₫</p>
                </div>
            </div>
        </div>
    )
}

export default Related;
