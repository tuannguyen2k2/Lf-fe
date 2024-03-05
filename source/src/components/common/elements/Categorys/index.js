import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import Slider from 'react-slick';
import arrow from '@assets/icons/arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import CardCategory from '../CardCategorys';
import arrowRight from '@assets/icons/arowright.png';

import ImgButton from '@modules/layout/desktop/landing/Feedback/FeedbackCarousel/Button';
import CategoryCarousel from './CategoryCarousel';
import ContentLanding from '@modules/layout/desktop/landing/ContentLanding';
import Healing from '../Healing';
import { Image, Flex, Group, Box } from '@mantine/core';
import Typo from '../Typo';
import { FormattedMessage } from 'react-intl';
import routes from '@routes';
import { categoryKinds } from '@constants';
import { generatePath } from 'react-router-dom';
const CategoryItem = ({ data, renderLink, renderTitle, style }) => {
    const navigate = useNavigate();
    const navigateDetail = () => {
        navigate(generatePath(routes.CategoryPage.path, { id: data?.category?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    return (
        <div style={style} className={(classNames(styles.categoryDesktop), 'category-desktop')}>
            <Box mt={120}>
                <div className={classNames(styles.categoryTitle)}>
                    {data?.category?.kind == categoryKinds.CATEGORY_KIND_TOP_NEW ? (
                        <h1>{'Những kinh nghiệm mới nhất'}</h1>
                    ) : renderTitle ? (
                        <h1>{data?.category?.name}</h1>
                    ) : (
                        <h2>{data?.category?.name}</h2>
                    )}
                    {renderLink && (
                        <Group pt={40} className={classNames(styles.seeMore)} onClick={() => navigateDetail()}>
                            <Group className={classNames(styles.seeMore)}>
                                <Typo size="primary" className={styles.seeMore}>
                                    <FormattedMessage defaultMessage="Xem thêm" />
                                </Typo>
                                <Flex gap={2} mt={0}>
                                    <Image src={arrow} w={10} h={15} alt="" />
                                    <Image src={arrow} w={10} h={15} alt="" />
                                </Flex>
                            </Group>
                        </Group>
                    )}
                </div>
                <CategoryCarousel data={data?.courses} />
            </Box>
        </div>
    );
};
export default CategoryItem;
