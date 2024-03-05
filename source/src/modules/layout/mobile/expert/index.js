import React from 'react';
import styles from './expert.module.scss';

import { Avatar, Box, Group, Image, Text, Center, LoadingOverlay } from '@mantine/core';

import avatar from '@assets/images/avatar_profile.png';
import cover from '@assets/images/cover.png';
import classNames from 'classnames';

import { AppConstants } from '@constants';
import ReviewList from '../detail/Review/ReviewList';
import CourseList from './CourseList';
import { BackgroundImage } from '@mantine/core';
import SkeLeton from '@components/common/elements/Skeleton';
const ExpertMobile = ({ expert, courseListOfEpexrt, loading }) => {
    return (
        <div className={classNames(styles.landingPage)}>
            <BackgroundImage
                h="150px"
                src={expert?.data?.cover ? AppConstants.contentRootUrl + expert?.data?.cover : cover}
                radius={'0 0 20px 20px'}
            ></BackgroundImage>
            <Box className="container" style={{ position: 'relative' }}>
                <Center style={{ position: 'absolute', top: '-50px', left: 0, right: 0, margin: '0 auto' }}>
                    <Box w={'100%'}>
                        <Box mx="auto" className={styles.info} p={20}>
                            <Center>
                                <Avatar
                                    src={
                                        expert?.data?.avatar
                                            ? AppConstants.contentRootUrl + expert?.data?.avatar
                                            : avatar
                                    }
                                    size={100}
                                    variant="light"
                                    color="blue"
                                    bg={'white'}
                                    style={{ top: '-60px', position: 'absolute' }}
                                />
                            </Center>
                            <Box mt="50px">
                                <Text
                                    fw="var(--font-semi-bold)"
                                    size="var(--h1-font-size)"
                                    c={'var(--primary-color)'}
                                    ta="center"
                                    mt="10px"
                                >
                                    {expert?.data?.fullName}
                                </Text>
                                <Text size="var(--sub-font-size)" mt={5} ta="center">
                                    Chuyên gia lập trình
                                </Text>
                            </Box>
                            <Group justify="space-between" mt="10">
                                <Box className={styles.statBox} bg="rgba(0, 172, 193, 0.15)">
                                    <h4 className={styles.numberStat} style={{ color: 'rgba(0, 172, 193) ' }}>
                                        {expert?.data?.totalCourse ? expert?.data?.totalCourse : 0}
                                    </h4>
                                    <Text size="var(--sub-font-size)">Khóa học</Text>
                                </Box>
                                <Box className={styles.statBox} bg="rgba(0, 81, 255, 0.14)">
                                    <h4 className={styles.numberStat} style={{ color: 'rgba(0, 81, 255)' }}>
                                        {expert?.data?.totalLessonTime ? expert?.data?.totalLessonTime : 0}
                                    </h4>
                                    <Text size="var(--sub-font-size)">Giờ giảng</Text>
                                </Box>
                                <Box className={styles.statBox} bg="rgba(255, 168, 0, 0.26">
                                    <h4 className={styles.numberStat} style={{ color: 'rgba(255, 168, 0)' }}>
                                        {expert?.data?.totalStudent ? expert?.data?.totalStudent : 0}
                                    </h4>
                                    <Text size="var(--sub-font-size)">Học viên</Text>
                                </Box>
                            </Group>
                        </Box>
                    </Box>
                    <LoadingOverlay
                        visible={loading}
                        zIndex={80}
                        overlayProps={{ radius: 'sm' }}
                        loaderProps={{ type: 'bars' }}
                    />
                </Center>

                <Box pt="190px">
                    {expert ?
                        <div
                            className={styles.contentBanner}
                            dangerouslySetInnerHTML={{ __html: expert?.data?.introduction }}
                        ></div>
                        : <SkeLeton numRow={8}/> }
                </Box>
                {
                    courseListOfEpexrt && <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)">
                    Khóa học của giảng viên
                    </Text>
                }
                {courseListOfEpexrt ? (
                    <CourseList courseListOfEpexrt={courseListOfEpexrt} />
                ) : <>
                    <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)">
                    Khóa học của giảng viên
                    </Text>
                    <SkeLeton numRow={8} style={{ marginTop:10 }}/>
                </>}
                {/* <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)" mt={40}>
                        Đánh giá từ học viên
                    </Text> */}
                <ReviewList />
                {/* <Pagination total={10} style={{ width: '100%' }} /> */}
            </Box>
        </div>
    );
};

export default ExpertMobile;
