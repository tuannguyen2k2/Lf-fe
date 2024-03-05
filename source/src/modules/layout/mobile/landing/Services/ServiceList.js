import React, { Fragment } from 'react';
import ServicesItem from './ServicesItem';
import styles from './index.module.scss';
import SlickCarouselSmall from '../../common/SlickCarouselSmall';
import { Box, LoadingOverlay } from '@mantine/core';
import Scroll from '../../common/Scroll';
import SkeLeton from '@components/common/elements/Skeleton';
const ServiceList = ({ data, loading }) => {
    return (
        // <Scroll height="270px" shadow={true}>
        //     <ServicesItem />
        //     <ServicesItem />
        //     <ServicesItem />
        //     <ServicesItem />
        //     <ServicesItem />
        //     <ServicesItem />
        // </Scroll>
        <div className={styles.container}>
            {/* <LoadingOverlay
                visible={loading}
                // zIndex={0}
                overlayProps={{ radius: 'sm' }}
                loaderProps={{ type: 'bars' }}
            /> */}
            { data ?
                <Scroll height="270px" shadow={true}>
                    {data?.map((category) => {
                        return <ServicesItem data={category} key={category?.id} renderLink={false} />;
                    })}
                </Scroll> : <SkeLeton numRow={8} /> }
        </div>
    );
};

export default ServiceList;
