import React, { Fragment } from 'react';
import ServicesItem from './ServicesItem';
import styles from './index.module.scss';
import SkeLeton from '@components/common/elements/Skeleton';
import SlickCarousel from '../common/SlickCarousell';
import TeacherItem from '../Teacher/TeacherItem';
import { Box } from '@mantine/core';
const ServiceList = ({ data }) => {
    return (
        <Box mt={30}>
            <SlickCarousel column={4} gap={8} height={400}>
                {data ? (
                    data?.map((category) => {
                        return (
                            <ServicesItem
                                data={category}
                                key={category?.id}
                                renderLink={category?.courses?.length > 4}
                                renderTitle={true}
                            />
                        );
                    })
                ) : (
                    <SkeLeton numRow={8} />
                )}
            </SlickCarousel>
        </Box>
    );
};

export default ServiceList;
