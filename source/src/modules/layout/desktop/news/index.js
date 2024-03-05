import React, { useState } from 'react';

import { Button, Text, Image, Avatar, Box, Group, Pagination } from '@mantine/core';

import styles from './index.module.scss';
import PageLayout from '@modules/layout/common/PageLayout';
import { FormattedMessage } from 'react-intl';
import avatar from '@assets/images/avatar_profile.png';
import cover from '@assets/images/cover.png';
import classNames from 'classnames';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import FeedbackDesktop from '../landing/Feedback';
import ReviewList from '../detail/Review/ReviewList';
import { AppConstants } from '@constants';
import { useParams } from 'react-router-dom';
import useAppLoading from '@hooks/useAppLoading';
import { useEffect } from 'react';
import Typo from '@components/common/elements/Typo';
import Banner from './Banner';
import ServiceList from './serviceList/ServiceList';
const NewsComponent = ({ newsDataList, newsDataLoading, newsData }) => {
    // const { loading, setLoading } = useAppLoading();
    const [ filterWidth, setFilterWidth ] = useState(75);

    return (
        <div className={classNames(styles.landingPage)}>
            <Banner data={newsData} />
            <Box className="container" style={{ position: 'relative' }}>
                <div className={'container'}>
                    <div className={styles.body}>
                        <div className={styles.filter} style={{ width: `${filterWidth}%` }}>
                            <Box>
                                <Group justify="space-between">
                                    <Box>
                                        <Text fw="var(--font-semi-bold)" size="var(--h2-font-size)">
                                            {newsData?.title}
                                        </Text>
                                    </Box>
                                </Group>
                                <Box mt="30px" mb="30px">
                                    <div
                                        className={styles.contentBanner}
                                        dangerouslySetInnerHTML={{ __html: newsData?.content }}
                                    ></div>
                                </Box>
                            </Box>
                        </div>
                        <div className={styles.content} style={{ width: `${100 - filterWidth}%` }}>
                            <Box>
                                <Group justify="space-between">
                                    <Box>
                                        <Text size="40px" fw="var(--font-bold)" w={600}>
                                            Một số tin tức đề xuất
                                        </Text>
                                    </Box>
                                </Group>
                                <Box mt="30px" mb="30px">
                                    <ServiceList data={newsDataList} />
                                </Box>
                            </Box>
                        </div>
                    </div>
                </div>
            </Box>
            {/* <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box className={styles.statBox} bg="#5624d0">
                    <div className={styles.detail}>
                        <div>
                            <Typo type="bold" style={{ color: 'var(--text-color-light)', fontSize: 60 }}>
                                Trao quyền cho nhóm của bạn
                            </Typo>
                        </div>
                        <div>
                            <Typo
                                type="semi-bold"
                                style={{ color: 'var(--text-color-light)', fontSize: 25, width: '100%' }}
                            >
                                Nhận đăng ký thư viện các khóa học trực tuyến và công cụ học tập
                            </Typo>
                        </div>
                        <div>
                            <Typo
                                type="semi-bold"
                                style={{ color: 'var(--text-color-light)', fontSize: 25, width: '100%' }}
                            >
                                kỹ thuật số cho tổ chức của bạn với Udemy Business.
                            </Typo>
                        </div>
                        <div >
                            <Button style={{ backgroundColor: 'black', height: '70px' }}>
                                <Typo
                                    type="semi-bold"
                                    style={{ color: 'var(--text-color-light)', fontSize: 20, width: '100%' }}
                                >
                                    Yêu cầu bản DEMO
                                </Typo>
                            </Button>
                        </div>
                    </div>
                </Box>

                <Box className={styles.cardBox}>
                    <div className={styles.info}>
                        <Typo size="small" type="bold" style={{ color: 'var(--text-color-dark)' }}>
                            Melissa Suzuno
                        </Typo>
                        <div >
                            <Typo size="sub" style={{ color: 'var(--text-color-dark)', marginBottom: '15px' }}>
                                Nhà văn nhân sự và L&D Insights, Udemy
                            </Typo>
                        </div>
                        <div >
                            <Typo size="sub" style={{ color: 'var(--text-color-dark)', marginBottom: '10px' }}>
                                Melissa Suzuno là một nhà văn tập trung vào sự giao thoa giữa con người và công việc.
                                Tìm Melissa trên LinkedIn và Twitter.
                            </Typo>
                        </div>
                        <div className={styles.post}>
                            <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color-dark)' }}>
                                Bài viết gần đây của Melissa Suzuno:
                            </Typo>
                        </div>
                    </div>
                </Box>
            </Box>
            <Box className="container" style={{ position: 'relative' }}>
                <Box pt="30px">
                    {newsDataList && (
                        <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)">
                            Một số tin tức đề xuất
                        </Text>
                    )}
                    <ServiceList data={newsDataList} />
                </Box>
            </Box> */}
        </div>
    );
};

export default NewsComponent;
