import React from 'react';
import styles from './index.module.scss';
import CourseList from '../expert/CourseList';
import CardProductExpert from '@modules/layout/common/mobile/CardProductExpert';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import CardProduct from '@modules/layout/common/mobile/CardProduct';
import { categoryKinds } from '@constants';
import { Text } from '@mantine/core';
import { Box } from '@mantine/core';
const CategoryMobile = ({ data, courseList, category }) => {
    return (
        <Box mt={80}>
            <div className={styles.title}>
                {category?.kind == categoryKinds.CATEGORY_KIND_TOP_NEW ? (
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} ml={10}>
                        {'Những kinh nghiệm mới nhất'}
                    </Text>
                ) : (
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} ml={10}>
                        {category?.name}
                    </Text>
                )}
            </div>
            <div className={styles.course}>
                {courseList?.map((item) => {
                    return <CardProductExpert key={item?.id} item={item} />;
                })}
            </div>
        </Box>
    );
};
export default CategoryMobile;
