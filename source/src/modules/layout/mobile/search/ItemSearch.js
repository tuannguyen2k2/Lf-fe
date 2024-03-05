import { Group, Box, Image, Flex, Grid, Divider } from '@mantine/core';
import React from 'react';
import styles from './ItemSearch.module.scss';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
import { timeConvert } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { AppConstants } from '@constants';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';
import clock from '@assets/icons/clockicon.png';
import course from '@assets/icons/courseicon.png';

const ItemSearch = ({ item, closeSearch }) => {
    return (
        <Link onClick={closeSearch} to={generatePath(routes.detailPage.path, { id: item.id })}>
            <Grid className={styles.itemcart} gutter={8}>
                <Grid.Col span={4}>
                    <Image
                        src={item?.banner && AppConstants.contentRootUrl + item?.banner}
                        alt="Relevant Image"
                        w={'100%'}
                        radius="md"
                    />
                </Grid.Col>
                <Grid.Col span={8}>
                    <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                        {item?.name}
                    </Typo>
                    <Flex gap={27}>
                        <Flex align={'center'} gap={6}>
                            <Image src={course} w={14} h={14} alt="" />
                            <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                {item?.totalLesson === 0 ? (
                                    <FormattedMessage defaultMessage="Chưa có bài học nào" />
                                ) : (
                                    <>
                                        {item?.totalLesson} <FormattedMessage defaultMessage="bài học" />
                                    </>
                                )}
                            </Typo>
                        </Flex>
                        <Flex align={'center'} gap={6}>
                            <Image src={clock} w={14} h={14} alt="" />
                            <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                {timeConvert(item?.totalStudyTime)}
                                {/* <FormattedMessage defaultMessage=" phút" /> */}
                            </Typo>
                        </Flex>
                    </Flex>
                </Grid.Col>
            </Grid>
        </Link>
    );
};

export default ItemSearch;
