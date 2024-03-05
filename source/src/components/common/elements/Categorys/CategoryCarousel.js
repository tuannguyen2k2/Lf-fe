import SlickCarousel from '@modules/layout/desktop/landing/common/SlickCarousell';
import React from 'react';
import CardCategory from '../CardCategorys';
import { Box } from '@mantine/core';
import SkeLeton from '../Skeleton';
const CategoryCarousel = ({ data, loading }) => {
    return data ? (
        <SlickCarousel gap={8} column={5} height="240px">
            {data?.map((item) => {
                return <CardCategory key={item?.id} data={item} loading={loading} />;
            })}
        </SlickCarousel>
    ) : (
        <SkeLeton numRow={12} />
    );
};

export default CategoryCarousel;
