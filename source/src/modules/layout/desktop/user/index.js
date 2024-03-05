import React from 'react';

import { Button, Text, Image, Avatar, Box, Group, Pagination, LoadingOverlay } from '@mantine/core';

import styles from './index.module.scss';
import PageLayout from '@modules/layout/common/PageLayout';
import { FormattedMessage } from 'react-intl';
import avatar from '@assets/images/avatar_profile.png';
import cover from '@assets/images/cover.png';
import classNames from 'classnames';
import CourseList from './courseList';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import FeedbackDesktop from '../landing/Feedback';
import ReviewList from '../detail/Review/ReviewList';
import { AppConstants } from '@constants';
import { useParams } from 'react-router-dom';
import useAppLoading from '@hooks/useAppLoading';
import { useEffect } from 'react';
import SkeLeton from '@components/common/elements/Skeleton';
const UserComponent = ({ expert, courseListOfEpexrt, loading }) => {
    // const { loading, setLoading } = useAppLoading();

    // useEffect(() => {
    //     setLoading(expertLoading);
    // }, [ expertLoading ]);
    // const expert = props?.expert;
    return (
        <div className={classNames(styles.landingPage)}>
            <Image
                h="350px"
                src={expert?.data?.cover ? AppConstants.contentRootUrl + expert?.data?.cover : cover}
                radius={'0 0 20px 20px'}
            />
            <Box className="container" style={{ position: 'relative' }}>
                <Box style={{ position: 'absolute', top: '-100px' }}>
                    <Avatar
                        src={expert?.data?.avatar ? AppConstants.contentRootUrl + expert?.data?.avatar : avatar}
                        size={250}
                        variant="light"
                        color="blue"
                        bg={'white'} />
                </Box>
                <Box pt="170px">
                    <Group justify="space-between">
                        <Box>
                            <Text fw="var(--font-semi-bold)" size="var(--h2-font-size)">
                                {expert?.data?.fullName}
                            </Text>
                        </Box>
                        <Group>
                            <Box className={styles.statBox} bg="rgba(0, 172, 193, 0.15)">
                                <h4 className={styles.numberStat} style={{ color: 'rgba(0, 172, 193) ' }}>
                                    {expert?.data?.totalCourse ? expert?.data?.totalCourse : 0}
                                </h4>
                                <Text>Khóa học</Text>
                            </Box>
                            <Box className={styles.statBox} bg="rgba(0, 81, 255, 0.14)">
                                <h4 className={styles.numberStat} style={{ color: 'rgba(0, 81, 255)' }}>
                                    {expert?.data?.totalLessonTime ? expert?.data?.totalLessonTime : 0}
                                </h4>
                                <Text>Giờ giảng</Text>
                            </Box>
                            <Box className={styles.statBox} bg="rgba(255, 168, 0, 0.26">
                                <h4 className={styles.numberStat} style={{ color: 'rgba(255, 168, 0)' }}>
                                    {expert?.data?.totalStudent ? expert?.data?.totalStudent : 0}
                                </h4>
                                <Text>Học viên</Text>
                            </Box>
                            <LoadingOverlay
                                visible={loading}
                                // zIndex={0}
                                overlayProps={{ radius: 'sm' }}
                                loaderProps={{ type: 'bars' }}
                            />
                        </Group>

                    </Group>
                    <Box mt="30px" mb="30px">
                        { expert ?
                            <div
                                className={styles.contentBanner}
                                dangerouslySetInnerHTML={{ __html: expert?.data?.introduction }}
                            ></div> : <SkeLeton numRow={8}/> }
                    </Box>
                    {courseListOfEpexrt && (
                        <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)" >
                            Khóa học của giảng viên
                        </Text>
                    )}

                    {courseListOfEpexrt ? (
                        <CourseList courseListOfEpexrt={courseListOfEpexrt} />
                    ) : <>
                        <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)">
                    Khóa học của giảng viên
                        </Text>
                        <SkeLeton numRow={8} style={{ marginTop:10, marginBottom:20 }} />
                    </>}
                    {/* <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)" mt={40}>
                        Đánh giá từ học viên
                    </Text> */}
                    <ReviewList />
                    {/* <Pagination total={10} style={{ width: '100%' }} /> */}
                </Box>
            </Box>

        </div>
    );
};

export default UserComponent;
