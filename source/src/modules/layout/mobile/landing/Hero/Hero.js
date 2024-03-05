import CarouselItem from '@modules/layout/desktop/landing/Carousel/CarouselItems';
import React from 'react';
import bannermobile from '@assets/images/bannermobile.png';
import { Image } from '@mantine/core';
import Container from '@components/common/elements/Container';
import SlickCarouselSmall from '../../common/SlickCarouselSmall';
import { useRef } from 'react';
import Slider from 'react-slick';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { AppConstants } from '@constants';
import styles from './hero.module.scss';
import Healing from '@components/common/elements/Healing';
import { BackgroundImage, Center, Text } from '@mantine/core';
import Button from '@components/common/elements/Button';
const Hero = ({ slideshowData }) => {
    const slider = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="carousel_landing">
            <Slider ref={slider} {...settings}>
                {slideshowData.map((item) => {
                    return (
                        <Image
                            src={
                                item?.mobileImage
                                    ? AppConstants.contentRootUrl + item?.mobileImage
                                    : AppConstants.contentRootUrl + item?.image
                            }
                            radius="sm"
                            fit="cover"
                            h={'calc(100% + 30px)'}
                            key={item?.id}
                            onClick={() => item?.action == 1 && item?.url && window.open(`${item?.url}`)}
                        ></Image>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Hero;
