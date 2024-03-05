import { Avatar, Group, Rating, Text, Box, Image, Divider, Progress, Flex, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import styles from './ItemCourse.module.scss';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { Link, generatePath } from 'react-router-dom';
import arrow from '@assets/icons/arowright.png';
import clock from '@assets/icons/clockicon.png';
import course from '@assets/icons/courseicon.png';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { AppConstants, LESSON_KIND_SECTION } from '@constants';
import routes from '@routes';
import { convertToHoursMinutes, timeConvert } from '@utils';

const ItemCourse = ({ detail }) => {
    const [ lessonId, setLessonId ] = useState(null);

    const displayState = (
        <>
            <Grid gutter={8}>
                <Grid.Col span={8}>
                    <Typo size="tiny" type={'semi-bold'} style={{ color: 'var(--text-color)' }}>
                        {detail?.percent?.toFixed(0)}% <FormattedMessage defaultMessage={`hoàn thành`} />
                    </Typo>
                    <Progress radius="md" size="xs" value={detail?.percent} />
                </Grid.Col>
                <Grid.Col span={4}>
                    {detail?.totalLesson !== 0 && (
                        <Link to={generatePath(routes.coursePage.path, { id: detail.id })}>
                            <Flex gap={10} justify={'end'}>
                                <Typo size="sub" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                                    <FormattedMessage defaultMessage="Học tiếp" />
                                </Typo>
                                <Group gap={2}>
                                    <Image src={arrow} w={6} h={8} alt="" />
                                    <Image src={arrow} w={6} h={8} alt="" />
                                </Group>
                            </Flex>
                        </Link>
                    )}
                </Grid.Col>
            </Grid>
        </>
    );
    return (
        <div className={styles.item}>
            {detail?.totalLesson === 0 ? (
                <div>
                    <Grid className={styles.itemcart} gutter={8}>
                        <Grid.Col span={4}>
                            <Image
                                src={detail?.banner && AppConstants.contentRootUrl + detail?.banner}
                                alt="Relevant Image"
                                w={'100%'}
                                radius="md"
                            />
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                {detail?.name}
                            </Typo>
                            <Flex gap={27}>
                                <Flex align={'center'} gap={6}>
                                    <Image src={course} w={14} h={14} alt="" />
                                    <Typo size="sub" type="semi-bold" style={{ color: 'var(--title-color-2)' }}>
                                        <FormattedMessage defaultMessage="Chưa có bài học nào" />
                                    </Typo>
                                </Flex>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </div>
            ) : (
                <Link to={generatePath(routes.coursePage.path, { id: detail.id })}>
                    <Grid className={styles.itemcart} gutter={8}>
                        <Grid.Col span={4}>
                            <Image
                                src={detail?.banner && AppConstants.contentRootUrl + detail?.banner}
                                alt="Relevant Image"
                                w={'100%'}
                                radius="md"
                            />
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                {detail?.name}
                            </Typo>
                            <Flex gap={27}>
                                <Flex align={'center'} gap={6}>
                                    <Image src={course} w={14} h={14} alt="" />
                                    <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                        {detail?.totalLesson === 0 ? (
                                            <FormattedMessage defaultMessage="Chưa có bài học nào" />
                                        ) : (
                                            <>
                                                {detail?.totalLesson} <FormattedMessage defaultMessage="bài học" />
                                            </>
                                        )}
                                    </Typo>
                                </Flex>
                                <Flex align={'center'} gap={6}>
                                    <Image src={clock} w={14} h={14} alt="" />
                                    <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                        {timeConvert(detail?.totalStudyTime)}
                                        {/* <FormattedMessage defaultMessage=" phút" /> */}
                                    </Typo>
                                </Flex>
                            </Flex>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Divider variant="dashed" />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Box justify="space-between">{displayState}</Box>
                        </Grid.Col>
                    </Grid>
                </Link>
            )}
        </div>
    );
};

export default ItemCourse;
