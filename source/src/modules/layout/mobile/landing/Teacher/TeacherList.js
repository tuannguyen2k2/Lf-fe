import React from 'react';

import TeacherItem from './TeacherItem';
import SlickCarousel from '@modules/layout/desktop/landing/common/SlickCarousell';
import { Box } from '@mantine/core';
import SlickCarouselSmall from '../../common/SlickCarouselSmall';
import Scroll from '../../common/Scroll';
const TeacherList = ({ data }) => {
    return (
        <Scroll height="270px" shadow={true}>
            {data.map((item) => {
                return <TeacherItem key={item.id} item={item} />;
            })}
        </Scroll>
    );
};

export default TeacherList;
