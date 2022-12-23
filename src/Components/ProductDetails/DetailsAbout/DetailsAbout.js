import React from 'react';
import { useSelector } from 'react-redux';
import { categories } from '../../../data/categories';


function DetailsAbout() {

    //get category name
    const getCategoryName = () => {
        let name
        if (userStore.productDetail !== null) {
            name = categories.find(cate => cate.id === userStore.productDetail.categoryID)
        }
        return name.name
    }

    const userStore = useSelector((state) => state.user);

    return (
        <div className="details-about">
            <img alt="" src={userStore.productDetail.thumbImg}></img>
            <div className="main-details">
                <h3 className="label">Thông tin về sản phẩm</h3>
                <p className="description">{userStore.productDetail.details.description}</p>

                <div className="infos-container">
                    <ul>
                        <li className="info-label">Danh mục</li>
                        <li className="info-label">Nhà sản xuất</li>
                        <li className="info-label">Chất liệu</li>
                        <li className="info-label">Kích thước</li>
                    </ul>
                    <ul>
                        <li>
                            {getCategoryName()}
                        </li>
                        <li>{userStore.productDetail.details.company}</li>
                        <li>{userStore.productDetail.details.material}</li>
                        <li>{userStore.productDetail.details.size}</li>
                    </ul>
                </div>

                <div className="infos-container-mobile">
                    <ul>
                        <li>
                            <p className="info-label">
                                Danh mục
                            </p>
                            <p>{getCategoryName()}</p>
                        </li>
                        <li>
                            <p className="info-label">
                                Nhà sản xuất
                            </p>
                            <p>{userStore.productDetail.details.company}</p>
                        </li>
                        <li>
                            <p className="info-label">
                                Chất liệu
                            </p>
                            <p>{userStore.productDetail.details.material}</p>
                        </li>
                        <li>
                            <p className="info-label">
                                Kích thước
                            </p>
                            <p>{userStore.productDetail.details.size}</p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default DetailsAbout;
