import React from 'react';
import SlickCarousel from '../../common/SlickCarousell';
import FeedBackItem from '../FeedbackItems/FeedBackItem';
import { Box } from '@mantine/core';

const FeadbackCarousel = ({ reviewData }) => {
    return (
        <div className="feedback" style={{ marginTop: '20px' }}>
            <SlickCarousel gap={8} column={4} height="440px">
                {reviewData?.map((category) => {
                    return <FeedBackItem data={category} key={category?.id} renderLink={false} />;
                })}
            </SlickCarousel>
        </div>
    );
};

export default FeadbackCarousel;
