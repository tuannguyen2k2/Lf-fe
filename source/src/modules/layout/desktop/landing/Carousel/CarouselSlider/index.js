import React, { Fragment } from 'react';
import CarouselItem from '../CarouselItems';

import Slider from 'react-slick';
import { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import classNames from 'classnames';
import styles from './index.module.scss';
const Carousel = ({ slideshowData }) => {
    const slider = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={'container-fluid carousel_landing'}>
            <Slider ref={slider} {...settings}>
                {slideshowData?.map((item) => {
                    return <CarouselItem item={item} key={item.id} />;
                })}
            </Slider>
        </div>
    );
};

export default Carousel;
