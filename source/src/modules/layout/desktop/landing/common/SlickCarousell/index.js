import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImgButton from './Button';
import arrowRight from '@assets/icons/arowrightbtn.svg';
const SlickCarousel = ({
    responsive = true,
    column,
    gap,
    children,
    height = '400px',
    variableWidth = true,
    infinite = false,
    slidesToScroll = 1,
    nextArrow = <ImgButton img={arrowRight} />,
    prevArrow = <ImgButton img={arrowRight} revert={true} />,
}) => {
    const settings = {
        dots: false,
        infinite: infinite,
        speed: 500,
        slidesToShow: column,
        slidesToScroll: slidesToScroll,
        draggable: true,
        variableWidth: variableWidth,
        nextArrow: nextArrow,
        prevArrow: prevArrow,
        responsive: responsive
            ? [
                {
                    breakpoint: 1536,
                    settings: {
                        slidesToShow: column - 1,
                        slidesToScroll: 1,
                        variableWidth: false,
                    },
                },

                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: column - 1,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // centerMode: true,
                    },
                },
            ]
            : [],
    };
    return (
        <div style={{ '--slide-gap': `${gap}` + 'px', height }}>
            <Slider {...settings} className="landing-list">
                {children}
            </Slider>
        </div>
    );
};

export default SlickCarousel;
