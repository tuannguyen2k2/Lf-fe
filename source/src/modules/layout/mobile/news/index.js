import React from 'react';
import styles from './expert.module.scss';

import { Avatar, Box, Group, Image, Text, Center } from '@mantine/core';

import avatar from '@assets/images/avatar_profile.png';
import cover from '@assets/images/cover.png';
import classNames from 'classnames';

import { AppConstants } from '@constants';
import ReviewList from '../detail/Review/ReviewList';
import CourseList from './CourseList';
import { BackgroundImage } from '@mantine/core';
import ServiceList from '../landing/Services/ServiceList';
import Banner from './Banner';
const NewsMobile = ({ newsData, newsDataLoading, newsDataList }) => {
    return (
        <div className={classNames(styles.landingPage)}>
            {/* <BackgroundImage
                h="150px"
                src={newsData?.mobileBanner ? AppConstants.contentRootUrl + newsData?.mobileBanner : cover}
                radius={'0 0 20px 20px'}
            ></BackgroundImage> */}
            <Box className="container" style={{ position: 'relative' }}>
                <Center style={{ left: 0, right: 0, margin: '0 auto' }}>
                    <Box mt="10px" bg={'#edeff6'}>
                        {/* <Text
                            fw="var(--font-semi-bold)"
                            size="var(--h1-font-size)"
                            c={'var(--primary-color)'}
                            ta="center"
                            mt="10px"
                        >
                            {newsData?.title}
                        </Text> */}
                        <Banner data={newsData}/>
                    </Box>
                </Center>

                <Box>
                    <div
                        className={styles.contentBanner}
                        dangerouslySetInnerHTML={{ __html: newsData?.content }}
                    ></div>
                </Box>
                {newsDataList && (
                    <Text size="var(--h3-font-size)" fw="var(--font-semi-bold)" style={{ marginTop:10 }}>
                        Tin tức đề xuất
                    </Text>
                )}
                <ServiceList data={newsDataList} />
                <ReviewList />
                {/* <Pagination total={10} style={{ width: '100%' }} /> */}
            </Box>
        </div>
    );
};

export default NewsMobile;
