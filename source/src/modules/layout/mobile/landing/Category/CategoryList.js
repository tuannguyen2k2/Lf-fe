import React from 'react';

import CourseCarouselList from '@modules/layout/mobile/common/CourseCarouselList';
import { Box, Text } from '@mantine/core';
import classNames from 'classnames';

import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import Container from '@components/common/elements/Container';
import routes from '@routes';
const CategoryList = ({ data }) => {
    return (
        data?.courses?.length > 0 && (
            <Box key={data?.category?.id}>
                <div className={classNames(styles.titleTop)}>
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} maw={'70%'}>
                        {data?.category?.name}
                    </Text>
                    <Link to={`${routes.CategoryPage.path}`}>
                        <Typo size="primary" type="semi-bold" style={{ color: 'var(--black-cate-name)' }}>
                            <FormattedMessage defaultMessage="Xem thêm" />
                        </Typo>
                    </Link>
                </div>
                <CourseCarouselList courseList={data?.courses} />
            </Box>
        )
    );
};

export default CategoryList;
