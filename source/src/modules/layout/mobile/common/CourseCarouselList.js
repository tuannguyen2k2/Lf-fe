import React from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import SlickCarouselSmall from './SlickCarouselSmall';
import CardProduct from '@modules/layout/common/mobile/CardProduct';
import Scroll from './Scroll';
import styles from './CourseCarouselList.module.scss';
import SkeLeton from '@components/common/elements/Skeleton';
const CourseCarouselList = ({ courseList, shadow = false, loading }) => {
    return (
        <Box className="slick-mobile" mb={10}>
            <div className={styles.container}>
                {/* <LoadingOverlay
                    visible={loading}
                    // zIndex={0}
                    overlayProps={{ radius: 'sm' }}
                    loaderProps={{ type: 'bars' }}
                /> */}
                { courseList ?
                    <Scroll>
                        {courseList?.map((item) => {
                            return <CardProduct key={item?.id} item={item} />;
                        })}
                    </Scroll> : <SkeLeton numRow={8} /> }
            </div>
        </Box>
    );
};

export default CourseCarouselList;
