/* eslint-disable indent */
import React from 'react';
import { Image, Text, Flex, Rating, Button, Box, Group, LoadingOverlay } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { price } from '@utils';
import styles from './DetailInfo.module.scss';
import { FormattedMessage } from 'react-intl';
import { IconUsers, IconClock, IconBook2, IconBookmark } from '@tabler/icons-react';
import { AppConstants } from '@constants';
import banner from '@assets/images/temp/banner.webp';
import Recommended from '../cart/Recommended';
import useShoppingCart from '@hooks/useShoppingCart';
import useAuth from '@hooks/useAuth';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SkeLeton from '@components/common/elements/Skeleton';
import { showSucsessMessage } from '@services/notifyService';
import routes from '@routes';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
const DetailInfo = ({ data, registerRetailHandle, sellCode, loading }) => {
    const { addItem } = useShoppingCart({ immediate: false });
    const { profile } = useAuth();
    const translate = useTranslate();
    const cart = useSelector((state) => state.cart.cart);
    const navigate = useNavigate();
    const handleBuyNow = (course, sellCode) => {
        addItem(course, sellCode);
        navigate('/checkout');
    };
    const { execute: buyFreeCourse, data: buyFreeCourseData } = useFetch(apiConfig.booking.buyFreeCourse);
    const handleBuyFreeCourse = (course, sellCode) => {
        buyFreeCourse({
            data: {
                courseId: course.id,
                sellCode: sellCode,
            },
            onCompleted: (res) => {
                showSucsessMessage('Nhận khóa học thành công');
                navigate(routes.homePage.path);
            },
            onError: (error) => {
                // error?.response?.data?.code == ACCOUNT_ERROR_NOT_FOUND
                //     ? showErrorMessage(translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD))
                //     : '';
                // showErrorMessage('Thanh toán không thành công');
            },
        });
    };
    return (
        <>
            {/* <Image src={data?.banner ? AppConstants.contentRootUrl + data?.banner : banner} /> */}
            <div className={styles.container}>
                <LoadingOverlay
                    visible={loading}
                    // zIndex={0}
                    overlayProps={{ radius: 'sm' }}
                    loaderProps={{ type: 'bars' }}
                />
                <Image
                    src={data?.banner && AppConstants.contentRootUrl + data?.banner}
                    alt=""
                    className={styles.banner}
                    // h={'100%'}
                ></Image>
            </div>
            {data?.name ? (
                <div>
                    <Text
                        mt="10px"
                        size="var(--h3-font-size) "
                        c={'var(--primary-color)'}
                        fw={'var(--font-bold'}
                        lineClamp={2}
                    >
                        {data?.name}
                    </Text>
                    <Text
                        size="var(--primary-font-size) "
                        c={'var(--text-color)'}
                        fw={'var(--font-normal'}
                        lineClamp={3}
                        mt={10}
                    >
                        {data?.shortDescription}
                    </Text>
                </div>
            ) : (
                <SkeLeton numRow={10} />
            )}
            <Flex align="center" gap={10} mt={10} my={5}>
                {/* <Typo size="primary" style={{ lineHeight: 'normal' }}>
                    {data?.averageStar?.toFixed(2)}
                </Typo> */}

                <Rating fractions={4} value={data?.averageStar} readOnly size="md" color="var(--star-color)" />

                <Typo size="primary" style={{ lineHeight: 'normal' }}>
                    {data?.soldQuantity ? data?.soldQuantity : 0} {' học viên'}
                </Typo>
            </Flex>
            <Typo size="primary">{data?.expert?.fullName}</Typo>

            <Group>
                <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} mt={20}>
                    {data?.price == 0
                        ? translate.formatMessage(commonMessage.free)
                        : data?.saleOff
                        ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
                        : price(data?.price)}
                </Text>
                <Text mt={20} c="var(--title-color-2)" style={{ textDecorationLine: 'line-through' }}>
                    {data?.saleOff && data?.price > 0 ? price(data?.price) : null}
                </Text>
            </Group>
            {profile && data?.isBuy == false && (
                <Button fullWidth mt={10} size="lg" onClick={() => handleBuyNow(data, sellCode)}>
                    <Typo size="primary">
                        <FormattedMessage defaultMessage="Mua ngay" />
                    </Typo>
                </Button>
            )}
            {profile && data?.price == 0 && data?.isBuy == false && (
                <Button fz={20} h={55} onClick={() => handleBuyFreeCourse(data, sellCode)}>
                    <Typo size="primary">
                        <FormattedMessage defaultMessage="Nhận khóa học" />
                    </Typo>
                </Button>
            )}
            {profile?.isSeller && (
                <Button fullWidth mt={10} size="lg" variant="light" onClick={registerRetailHandle}>
                    <Typo size="primary">
                        <FormattedMessage defaultMessage="Bán khoá học" />
                    </Typo>
                </Button>
            )}
            <Button
                fullWidth
                mt={10}
                size="lg"
                variant="outline"
                onClick={() => (cart.find((o) => o?.id === data?.id) ? navigate('/cart') : addItem(data, sellCode))}
                disabled={data?.isBuy}
            >
                <Typo size="primary">
                    {data?.isBuy == true ? (
                        <FormattedMessage defaultMessage="Đã mua" />
                    ) : cart.find((o) => o?.id === data?.id) ? (
                        <FormattedMessage defaultMessage="Đi đến giỏ hàng " />
                    ) : (
                        <FormattedMessage defaultMessage="Thêm vào giỏ hàng" />
                    )}
                </Typo>
            </Button>

            <Box mt={20} className={styles.info}>
                <Text p={16} bg={'#DADADA'} fz="var(--primary-font-size)" fw={'var(--font-bold)'}>
                    <FormattedMessage defaultMessage="Thông tin khóa học" />
                </Text>
                {data?.soldQuantity ? (
                    <div>
                        <Flex gap={15} className={styles.item}>
                            <IconUsers color="var(--primary-color)" />
                            <Text className={styles.text}>
                                {data?.soldQuantity ? data?.soldQuantity : 0} {' học viên'}
                            </Text>
                        </Flex>
                        <Flex gap={15} className={styles.item}>
                            <IconClock color="var(--primary-color)" />
                            <Text className={styles.text}>
                                {data?.totalStudyTime ? data?.totalStudyTime : 0}
                                {' giờ'}
                            </Text>
                        </Flex>
                        <Flex gap={15} className={styles.item}>
                            <IconBook2 color="var(--primary-color)" />
                            <Text className={styles.text}>
                                {data?.totalLesson ? data?.totalLesson : 0} {`bài học`}
                            </Text>
                        </Flex>
                    </div>
                ) : (
                    <SkeLeton numRow={6} />
                )}
            </Box>
        </>
    );
};

export default DetailInfo;
