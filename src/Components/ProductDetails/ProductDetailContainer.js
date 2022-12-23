import React from 'react';
import './Detail.scss';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { useSelector } from 'react-redux';
import { categories } from '../../data/categories';
import DetailsShowCase from './DetailsShowcase/DetailsShowCase';
import DetailsRelated from './DetailsRelated/DetailsRelated';

function ProductDetailContainer({ name }) {

    const userStore = useSelector((state) => state.user);

    //get category name
    const getCategoryName = () => {
        let name
        if (userStore.productDetail !== null) {
            name = categories.find(cate => cate.id === userStore.productDetail.categoryID)
        }
        return name.name
    }

    return (
        <div className="product-detail-container">
            <div className="breadcrumb">
                <ul>
                    <li>
                        Trang chủ
                        <KeyboardArrowRightRoundedIcon className="icon" />
                    </li>
                    <li>
                        {getCategoryName()}
                        <KeyboardArrowRightRoundedIcon className="icon" />
                    </li>
                    <li className="current">
                        {name}
                    </li>
                </ul>
            </div>
            <DetailsShowCase data={userStore.productDetail}/>
            <DetailsRelated data={userStore.productDetail}/>
        </div>
    );
}

export default ProductDetailContainer;
