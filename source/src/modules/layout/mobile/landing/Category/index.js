import React from 'react';
import CourseCarouselList from '@modules/layout/mobile/common/CourseCarouselList';
import { Box, Text } from '@mantine/core';
import classNames from 'classnames';

import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import styles from './index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@components/common/elements/Container';
import routes from '@routes';
import { categoryKinds } from '@constants';
import { timeConvert } from '@utils';
import { generatePath } from 'react-router-dom';
const message = defineMessages({
    title: 'Những kinh nghiệm mới nhất ',
});
const Category = ({ categoryCourseList, loading }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const navigateDetail = (id) => {
        navigate(generatePath(routes.CategoryPage.path, { id: id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    return (
        <Container>
            <Box mt={40}>
                {categoryCourseList?.map((item) => {
                    return (
                        item?.courses?.length > 0 && (
                            <Box key={item?.category?.id} mb={20}>
                                <div className={classNames(styles.titleTop)}>
                                    {item?.category?.kind == categoryKinds.CATEGORY_KIND_TOP_NEW ? (
                                        <Text
                                            size={'var(--h3-font-size)'}
                                            fw={'var(--font-bold)'}
                                            c={'var(--primary-color)'}
                                            maw={'70%'}
                                        >
                                            {translate.formatMessage(message.title)}
                                        </Text>
                                    ) : (
                                        <Text
                                            size={'var(--h3-font-size)'}
                                            fw={'var(--font-bold)'}
                                            c={'var(--primary-color)'}
                                            maw={'70%'}
                                        >
                                            {item?.category?.name}
                                        </Text>
                                    )}

                                    <Box
                                        onClick={() => navigateDetail(item?.category?.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Typo
                                            size="primary"
                                            type="semi-bold"
                                            style={{ color: 'var(--black-cate-name)', verticalAlign: 'middle' }}
                                        >
                                            <FormattedMessage defaultMessage="Xem thêm" />
                                        </Typo>
                                    </Box>
                                </div>
                                <CourseCarouselList courseList={item?.courses} loading={loading} />
                            </Box>
                        )
                    );
                })}
            </Box>
        </Container>
    );
};

export default Category;
