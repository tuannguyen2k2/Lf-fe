import React from 'react';
import SlickCarousel from '../common/SlickCarousell';
import TeacherItem from './TeacherItem';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { Box } from '@mantine/core';
const TeacherList = ({ data }) => {
    return (
        <div className="teacher">
            <Box mt={30}>
                <SlickCarousel gap={8} column={4} height="300px">
                    {data?.map((item) => {
                        return <TeacherItem key={item.id} item={item} />;
                    })}
                </SlickCarousel>
            </Box>
        </div>
    );
};

export default TeacherList;
