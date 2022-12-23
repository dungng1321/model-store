import { useState, useEffect } from 'react';
import * as sharedFunction from '../../../share/_shared';
import CachedIcon from '@mui/icons-material/Cached';
import { useDispatch, useSelector } from 'react-redux';
import { addItemFromPeek, setAddedProduct, setStockAvailablePeek } from '../../../redux/cartSlice';
import Image from '../../FigurePeekModal/Image';
import { toast } from 'react-toastify';
import DetailsAbout from '../DetailsAbout/DetailsAbout';

function DetailsShowCase({ data }) {

    const notifyWarn = () => toast.warn("Bạn đã chọn tối đa !", {
        theme: 'dark',
        pauseOnHover: false,
    });

    //use redux 
    const cartStore = useSelector((state) => state.cart)
    const userStore = useSelector((state) => state.user)
    const peekModalStore = useSelector((state) => state.peekModal)

    const dispatch = useDispatch();

    const [loadingBtn, setLoadingBtn] = useState(false)
    const [add, setAdd] = useState(false)
    const [inputValue, setInputValue] = useState(1)


    const handleAddToCart = () => {
        setAdd(prev => !prev)

        dispatch(addItemFromPeek({
            id: userStore.productDetail.id,
            stock: userStore.productDetail.stock,
            inputValue: inputValue,
            name: userStore.productDetail.name,
            thumbImg: userStore.productDetail.thumbImg,
            price: userStore.productDetail.price,
        }))

        setLoadingBtn(true)
    }

    const handleIncrese = () => {
        let addedAmount = 0
        if (userStore.productDetail.id === cartStore.addedProduct.id) {
            addedAmount = cartStore.addedProduct.amountAdded
        }

        if (inputValue >= (userStore.productDetail.stock - addedAmount)) {
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
            if (userStore.productDetail.id === cartStore.addedProduct.id) {
                addedAmount = cartStore.addedProduct.amountAdded
            }
            if (newValue >= (userStore.productDetail.stock - addedAmount)) {
                dispatch(setStockAvailablePeek(true))
                notifyWarn()
                setInputValue((userStore.productDetail.stock - addedAmount))
            } else {
                dispatch(setStockAvailablePeek(false))
                setInputValue(newValue)
            }
        }

    }

    //reset state
    useEffect(() => {

        return () => {
            dispatch(setStockAvailablePeek(false))
        }
    }, [])

    useEffect(() => {
        let delay
        if (loadingBtn === true) {
            delay = setTimeout(() => {
                setLoadingBtn(false)
            }, 2000)
        }

        return () => clearTimeout(delay);
    }, [loadingBtn])

    useEffect(() => {

        let added;
        if (userStore.productDetail !== undefined) {
            added = cartStore.productslist.find((product) => {
                return product.id === userStore.productDetail.id
            })
        }
        if (added !== undefined) {
            dispatch(setAddedProduct({
                id: added.id,
                amountAdded: added.amount,
            }))
        } else {
            dispatch(setAddedProduct({
                id: 0,
                amountAdded: 0,
            }))
        }

    }, [peekModalStore.showModal, add, inputValue])

    //======================================

    return (
        <div className="details-showcase">
            <div className="show-images">
                <div className="active-image">
                    <Image src={data.details.imageDescription} />
                </div>
                <div className="others-images">
                    {data.details.otherImages.map((img) => (
                        <div className="item"
                            key={img.id}
                            style={{ backgroundImage: `url("${img.imgUrl}")` }}
                        />
                    ))}
                </div>
                <DetailsAbout />
            </div>
            <div className="show-actions">
                {data.status === "new" && (
                    <div className="status-new">
                        <h3>Hàng mới</h3>
                        <div className="new-icon"></div>
                    </div>
                )}
                {data.status === "preOrder" && (
                    <div className="status-order">
                        <h3>Hàng đặt trước</h3>
                        <div className="order-icon"></div>
                    </div>
                )}
                <h2 className="name">{data.name}</h2>
                <p className="small-credit">Sản xuất bởi {data.details.company}</p>
                <h2 className="price">{sharedFunction.numberWithCommas(data.price)} ₫</h2>
                {data.status === "preOrder" &&
                    (<p style={{ marginTop: '10px' }}>
                        <span style={{ color: '#fff', fontWeight: 600 }}>Đặt cọc: </span>
                        {sharedFunction.numberWithCommas(data.depositPrice)} ₫
                    </p>)}
                <div className="label-flex" style={{marginTop: '2rem'}}>
                    <p className="label">Từ khóa: </p>
                    {data.tagName.map((tagName, index) => (
                        <span key={index} className="tagNames"><a>{(index ? ', ' : '') + `${tagName}`}</a></span>
                    ))}
                </div>
                <div className="label-flex">
                    <p className="label">Kho: </p>
                    <p>{data.stock}</p>
                </div>

                <div className="label-flex" style={{marginBottom: '2rem'}}>
                    <p className="label">Số lượng</p>
                    <div className="product-quantity">
                        <div className="desc-btn" onClick={() => handleDecrese()}>-</div>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={e => handleInput(e)}
                        />
                        <div className={cartStore.stockAvailablePeek === false ? "insc-btn " : "insc-btn disable-click"} onClick={() => handleIncrese()}>+</div>
                    </div>
                </div>


                {data.status !== "preOrder" && (<div className={loadingBtn === false ? "add-to-cart-btn" : "loading-btn"} onClick={() => handleAddToCart()}>
                    {loadingBtn === false ? "Thêm Vào Giỏ" : "Đang thêm..."}
                    {loadingBtn === true && <div ><CachedIcon className="loading-icon" /></div>}
                </div>)}

                {data.status === "preOrder" && (<div className="preOrder-btn">
                    Liên hệ
                </div>)}
            </div>
        </div>
    );
}

export default DetailsShowCase;
