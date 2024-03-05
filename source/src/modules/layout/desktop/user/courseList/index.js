import React from 'react';
import { Group } from '@mantine/core';
import CardCategory from '@components/common/elements/CardCategorys';
import SkeLeton from '@components/common/elements/Skeleton';

const CourseList = ({ courseListOfEpexrt }) => {
    return (
        <div>
            <Group gap={'30px 10px'} my={30}>
                { courseListOfEpexrt ? courseListOfEpexrt?.map((item) => {
                    return <CardCategory key={item?.id} data={item} />;
                }) : <SkeLeton numRow={8} />}
            </Group>
        </div>
    );
};

export default CourseList;
