import React from 'react';
import Carousel from './CarouselSlider';
import Container from '@components/common/elements/Container';
import styles from './index.module.scss';
const CarouselDesktop = ({ slideshowData }) => {
    return <Carousel slideshowData={slideshowData} />;
};

export default CarouselDesktop;
