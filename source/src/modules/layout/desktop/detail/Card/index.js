import React from 'react';
import styles from './index.module.scss';
import card from '@assets/images/temp/card.png';
import { Button, Container, Flex, Image, Stack, Text, Title } from '@mantine/core';
import { IconUsers, IconClock, IconBook2, IconBookmark } from '@tabler/icons-react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import routes from '@routes';
import Typo from '@components/common/elements/Typo';
import useAuth from '@hooks/useAuth';
import { AppConstants } from '@constants';

import { price } from '@utils';
import { useDispatch } from 'react-redux';
import { timeConvert } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
const calculateSavings = (price, saleOff) => {
    const originalPrice = parseFloat(price);
    const discountPercentage = parseFloat(saleOff);

    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        return 0;
    }

    const savings = (originalPrice * discountPercentage) / 100;
    return savings.toFixed(0);
};
import { useSelector } from 'react-redux';
import SkeLeton from '@components/common/elements/Skeleton';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showSucsessMessage } from '@services/notifyService';
const CardDetail = ({ className, openShare, course, sellCode, registerRetailHandle, addItem }) => {
    const { profile } = useAuth();
    const savings = calculateSavings(course?.price, course?.saleOff);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const translate = useTranslate();
    const cart = useSelector((state) => state.cart.cart);
    const { execute: buyFreeCourse, data: buyFreeCourseData } = useFetch(apiConfig.booking.buyFreeCourse);
    const handleBuyNow = (course, sellCode) => {
        addItem(course, sellCode);
        navigate('/checkout');
    };

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
        <div className={classNames(styles.wrapper, className)}>
            <Image h={263} src={course?.avatar ? AppConstants.contentRootUrl + course?.avatar : card} radius="sm" />
            <Container>
                <Flex mt={10} mb={20} align="center" justify="space-between">
                    <Flex align="center">
                        <Title c="var(--title-color-sub)">
                            {course?.price == 0
                                ? translate.formatMessage(commonMessage.free)
                                : course?.saleOff
                                    ? price(course?.price - ((course?.price * 1) / 100) * course?.saleOff)
                                    : price(course?.price)}
                        </Title>
                        <Text ml={30} c="var(--title-color-2)" style={{ textDecorationLine: 'line-through' }}>
                            {course?.saleOff > 0 && course?.price > 0 && price(course?.price)}
                        </Text>
                    </Flex>
                </Flex>
                <Stack className={styles.action}>
                    {profile && course?.price > 0 && course?.isBuy == false && (
                        <Button fz={20} h={55} onClick={() => handleBuyNow(course, sellCode)}>
                            <Typo size="primary">
                                <FormattedMessage defaultMessage="Mua ngay" />
                            </Typo>
                        </Button>
                    )}
                    {profile && course?.price == 0 && course?.isBuy == false && (
                        <Button fz={20} h={55} onClick={() => handleBuyFreeCourse(course, sellCode)}>
                            <Typo size="primary">
                                <FormattedMessage defaultMessage="Nhận khóa học" />
                            </Typo>
                        </Button>
                    )}
                    {profile?.isSeller && (
                        <Button fz={20} h={55} onClick={registerRetailHandle}>
                            <Typo size="primary">
                                <FormattedMessage defaultMessage="Bán khoá học" />
                            </Typo>
                        </Button>
                    )}
                    <Button
                        fz={20}
                        h={55}
                        variant="outline"
                        onClick={() =>
                            cart.find((o) => o?.id === course?.id) ? navigate('/cart') : addItem(course, sellCode)
                        }
                        disabled={course?.isBuy}
                    >
                        {course?.isBuy == true ? (
                            <FormattedMessage defaultMessage="Đã mua" />
                        ) : cart.find((o) => o?.id === course?.id) ? (
                            <FormattedMessage defaultMessage=" Đi đến giỏ hàng" />
                        ) : (
                            <FormattedMessage defaultMessage="Thêm vào giỏ hàng" />
                        )}
                    </Button>
                </Stack>
                <Stack mt={15} className={styles.info}>
                    <Title order={3} className={styles.title}>
                        <Typo size="primary" type="semi-bold">
                            <FormattedMessage defaultMessage="Thông tin khóa học" />
                        </Typo>
                    </Title>

                    {course?.soldQuantity ? (
                        <>
                            <Flex gap={15} className={styles.item}>
                                <IconUsers color="var(--primary-color)" />
                                <Text className={styles.text}>
                                    {course?.soldQuantity ? course?.soldQuantity : 0} {' học viên'}
                                </Text>
                            </Flex>
                            <Flex gap={15} className={styles.item}>
                                <IconClock color="var(--primary-color)" />
                                <Text className={styles.text}>
                                    {course?.totalStudyTime ? timeConvert(course?.totalStudyTime) : '00:00'}
                                </Text>
                            </Flex>
                            <Flex gap={15} className={styles.item}>
                                <IconBook2 color="var(--primary-color)" />
                                <Text className={styles.text}>{`${
                                    course?.totalLesson ? course?.totalLesson : 0
                                } bài học`}</Text>
                            </Flex>
                        </>
                    ) : (
                        <SkeLeton numRow={4} />
                    )}
                    {/* <Flex gap={15} className={styles.item}>
                        <IconBookmark color="var(--primary-color)" />
                        <Text className={styles.text}>
                            <FormattedMessage defaultMessage="Truy cập được trên thiết bị di động và TV" />
                        </Text>
                    </Flex> */}
                </Stack>
            </Container>
        </div>
    );
};

export default CardDetail;
