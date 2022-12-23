import { useState, useEffect } from 'react';
import './Products.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import ProductFilters from './Filters/ProductFilters';
import ProductList from './Lists/ProductList';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ProductsContainer() {
    const [slides, setSlides] = useState(3);

    useEffect(() => {
        let x = window.matchMedia("(max-width: 479px)")
        if (x.matches) { 
            setSlides(1)
        } else {
            setSlides(3)
        }
    }, [slides])
    
    return (
        <div className="products-container">
            <h1>Thỏa sức mua sắm, không lo về giá!</h1>
            <div className="products-slider">
                <Swiper
                    effect={"coverflow"}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    slidesPerView={slides}
                    grabCursor={true}
                    spaceBetween={0}
                    loop={true}
                    // centeredSlides={true}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, EffectCoverflow]}
                    className="mySwiper"
                >
                    <SwiperSlide className="slide-1"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/Marvel/Captain America/captain-america_marvel_feature.jpg')})` }}>
                        <h4>Captain America (Marvel)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-2"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/Marvel/Hulkbuster Deluxe Version/hulkbuster-deluxe-version_marvel_feature.jpg')})` }} >
                        <h4>Hulkbuster (Marvel)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-3"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/Marvel/Iron Patriot/iron-patriot-sixth-scale-figure_marvel_feature.jpg')})` }} >
                        <h4>Iron Patriot (Marvel)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-4"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/DC Comics/Harley Quinn (Caution Tape Jacket Version/harley-quinn-caution-tape-jacket-version_dc-comics_feature.jpg')})` }} >
                        <h4>Harley Quinn (DC)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-5"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/DC Comics/Aquaman/aquaman_dc-comics_feature.jpg')})` }} >
                        <h4>Aquaman (DC)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-6"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Marvel DC/DC Comics/The Joker/the-joker_dc-comics_feature.jpg')})` }} >
                        <h4>The Joker (DC)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-1"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Transformer/Bumblebee DLX/bumblebee-dlx_transformers_feature.jpg')})` }} >
                        <h4>Bumblebee DLX (Transformer)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-2"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Transformer/Optimus Prime/optimus-prime_transformers_feature.jpg')})` }} >
                        <h4>Optimus Prime (Transformer)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-3"
                        style={{ backgroundImage: `url(${require('../../data/productImage/Transformer/Grimlock/grimlock_transformers_feature.jpg')})` }} >
                        <h4>Grimlock (Transformer)</h4>
                        <div className="bg-black-trans"></div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="products-wrapper">
                <ProductFilters />
                <ProductList />
            </div>
        </div>
    );
}

export default ProductsContainer;
