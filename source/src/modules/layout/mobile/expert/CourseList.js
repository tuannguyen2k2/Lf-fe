import CardProduct from '@modules/layout/common/mobile/CardProduct';
import React from 'react';
import { Group } from '@mantine/core';
import CardProductExpert from '@modules/layout/common/mobile/CardProductExpert';
import styles from './expert.module.scss';

const CourseList = ({ courseListOfEpexrt }) => {
    return (
        <div className={styles.course}>
            {courseListOfEpexrt?.map((item) => {
                return <CardProductExpert key={item?.id} item={item} />;
            })}
        </div>
    );
};

export default CourseList;
