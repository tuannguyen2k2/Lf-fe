import SlickCarousel from '@modules/layout/desktop/landing/common/SlickCarousell';
import React from 'react';
import CardCategory from '../CardCategory';
const CategoryCarousel = ({ data }) => {
    return (
        <SlickCarousel gap={8} column={5}>
            {data?.map((item) => {
                return <CardCategory key={item?.id} data={item} />;
            })}
        </SlickCarousel>
    );
};

export default CategoryCarousel;
