import { Avatar, Group, Rating, Text, Box, Image, Divider, Progress, Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import styles from './ItemCourse.module.scss';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { Link, generatePath } from 'react-router-dom';
import arrow from '@assets/icons/arowright.png';
import { AppConstants, LESSON_KIND_SECTION } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import routes from '@routes';
import { timeConvert } from '@utils';
import clock from '@assets/icons/clockicon.png';
import course from '@assets/icons/courseicon.png';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
const ItemCourse = ({ key, detail }) => {
    const translate = useTranslate();
    return (
        <div className={styles.item} key={key}>
            <Link to={`${generatePath(routes.coursePage.path, { id: detail.id })}`}>
                <Group className={styles.itemcart}>
                    <Box>
                        <Image
                            src={detail?.banner && AppConstants.contentRootUrl + detail?.banner}
                            alt="Relevant Image"
                            w={200}
                            radius="md"
                        />
                    </Box>
                    <Box w="620px" style={{ paddingLeft: '20px' }}>
                        <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                            {detail?.name}
                        </Typo>
                        <Group mt={20}>
                            <Flex align={'center'} gap={6}>
                                <Image src={course} w={14} h={14} alt="" />
                                <Typo size="sub" style={{ color: 'var(--text-color)' }}>
                                    {detail?.totalLesson === 0 ? (
                                        `0 ${translate.formatMessage(commonMessage.lesson)}`
                                    ) : (
                                        <>
                                            {detail?.totalLesson} {translate.formatMessage(commonMessage.lesson)}
                                        </>
                                    )}
                                </Typo>
                            </Flex>
                            <Flex align={'center'} gap={6}>
                                <Image src={clock} w={14} h={14} alt="" />
                                <Typo size="sub" style={{ color: 'var(--text-color)' }}>
                                    {timeConvert(detail?.totalStudyTime)}
                                </Typo>
                            </Flex>
                        </Group>
                        <Group justify="space-between" mt={5}>
                            <Group align="center">
                                <Progress value={detail?.percent} size={'xs'} style={{ width: '300px' }} />

                                <Typo size="sub" style={{ color: 'var(--text-color)', lineHeight: 'normal' }}>
                                    {detail?.percent.toFixed()}% <FormattedMessage defaultMessage={`hoàn thành`} />
                                </Typo>
                            </Group>
                            {detail?.percent !== 100 && (
                                <Group>
                                    <Typo size="sub" style={{ color: 'var(--primary-color)' }}>
                                        <FormattedMessage defaultMessage="Học tiếp" />
                                    </Typo>

                                    <Group gap={4}>
                                        <Image src={arrow} w={10} h={15} alt="" />
                                        <Image src={arrow} w={10} h={15} alt="" />
                                    </Group>
                                </Group>
                            )}
                        </Group>
                    </Box>
                </Group>
            </Link>
        </div>
    );
};

export default ItemCourse;
