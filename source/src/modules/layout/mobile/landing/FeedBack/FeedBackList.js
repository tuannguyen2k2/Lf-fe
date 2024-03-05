import SlickCarousel from '@modules/layout/desktop/landing/common/SlickCarousell';
import React from 'react';
import FeedBackItem from './FeedBackItem';
import { Box, LoadingOverlay } from '@mantine/core';
import SlickCarouselSmall from '../../common/SlickCarouselSmall';
import Scroll from '../../common/Scroll';
import styles from './FeedBack.module.scss';
import SkeLeton from '@components/common/elements/Skeleton';
const FeedBackList = ({ reviewData, loading }) => {
    return (
        <div className={styles.container}>
            {/* <LoadingOverlay
                visible={loading}
                // zIndex={0}
                overlayProps={{ radius: 'sm' }}
                loaderProps={{ type: 'bars' }}
            /> */}
            { reviewData ?
                <Scroll shadow={true} height="170px">
                    {reviewData?.map((category) => {
                        return <FeedBackItem data={category} key={category?.id} renderLink={false} />;
                    })}
                </Scroll> : <SkeLeton numRow={8} /> }
        </div>
    );
};

export default FeedBackList;
