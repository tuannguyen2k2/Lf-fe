import React from 'react';
import styles from './index.module.scss';
import banner from '@assets/images/temp/banner.webp';
import { Flex, Grid, LoadingOverlay, Text, Title } from '@mantine/core';
import Container from '@components/common/elements/Container';
import { FormattedMessage } from 'react-intl';
import Button from '@components/common/elements/Button';
import { Rating } from '@mantine/core';
import CardDetail from '../Card';
import Healing from '@components/common/elements/Healing';
import Typo from '@components/common/elements/Typo';
import { AppConstants } from '@constants';
import { timeConvert } from '@utils';
import { Image } from '@mantine/core';
const Banner = ({ course, loading }) => {
    return (
        <div className={styles.container}>
            <Container className={styles.bannerContainer}>
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <Healing size="big" type={'bold'} className={styles.title}>
                            {course?.name}
                        </Healing>
                        <Typo size="primary" type="semi-bold" className={styles.title} style={{ marginTop: 20 }}>
                            {course?.shortDescription}
                        </Typo>

                        <Title fw="var(--font-normal)" size="var(--sub-font-size)" mt="1rem" mb="1rem">
                            {course?.expert?.account?.fullName}
                        </Title>
                        <Flex mb="1rem" align="center" gap="sm">
                            {/* <Title fw="var(--font-normal)" size="var(--sub-font-size)" c="var(--text-color-light)">
                    {course?.averageStar}
                </Title> */}
                            <Rating fractions={4} value={course?.averageStar} color="var(--star-color)" readOnly />
                            <Title fw="var(--font-normal" size="var(--sub-font-size)" c="var(--star-color)">
                                {course?.soldQuantity && course?.soldQuantity} {'Học viên'}
                            </Title>
                        </Flex>
                        <Title fw="var(--font-normal)" size="var(--sub-font-size)" mb="1rem">
                            {`Thời gian ${course?.totalStudyTime ? timeConvert(course?.totalStudyTime) : '00:00'}  - ${
                                course?.totalLesson ? course?.totalLesson : 0
                            } bài giảng`}
                        </Title>
                        {/* <Button className={styles.button}>
                <FormattedMessage defaultMessage="Chia sẻ" />
            </Button> */}
                    </div>
                </div>
            </Container>
            <LoadingOverlay
                visible={loading}
                zIndex={1}
                overlayProps={{ radius: 'sm' }}
                loaderProps={{ type: 'bars' }}
            />
            <Image
                src={course?.banner && AppConstants.contentRootUrl + course?.banner}
                alt=""
                className={styles.banner}
                h={'100%'}
            ></Image>
        </div>
    );
};

export default Banner;
