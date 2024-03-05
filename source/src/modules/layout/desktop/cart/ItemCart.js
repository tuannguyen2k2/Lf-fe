import { Avatar, Group, Rating, Text, Box, Image, Button, Flex } from '@mantine/core';
import React from 'react';
import styles from './ItemCart.module.scss';
import classNames from 'classnames';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
import { AppConstants } from '@constants';
import { IconTrash } from '@tabler/icons-react';

import { price } from '@utils';
import { formatMoney } from '@utils/index';
import { modals } from '@mantine/modals';
import { commonMessage } from '@constants/intl';
import { timeConvert } from '@utils';
const calculateDiscountedAmount = (price, saleOff) => {
    const originalPrice = parseFloat(price);
    const discountPercentage = parseFloat(saleOff);

    if (isNaN(originalPrice) || isNaN(discountPercentage)) {
        return 0;
    }

    const discountedAmount = (originalPrice * discountPercentage) / 100;
    return originalPrice - discountedAmount;
};
const ItemCart = ({ data, removeItem }) => {
    const translate = useTranslate();
    const discountedAmount = calculateDiscountedAmount(data?.data?.price, data?.data?.saleOff);
    const DeleteItemConfirm = (data) => {
        modals.openConfirmModal({
            title: (
                <Typo size="small" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Xác nhân'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn có muốn Khóa học này ra khỏi giỏ hàng?'} />
                </Typo>
            ),
            size: '27vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Xóa', cancel: 'Hủy' },
            onConfirm: () => removeItem(data),
        });
    };

    return (
        <div className={styles.item}>
            <Flex gap={30} className={styles.itemcart}>
                <IconTrash className={styles.trash} onClick={() => DeleteItemConfirm(data)} />
                <Box w={'25%'}>
                    <Image
                        src={data?.banner ? AppConstants.contentRootUrl + data?.banner : category}
                        alt="Relevant Image"
                        radius="md"
                        h={150}
                    />
                </Box>
                <Flex direction={'column'} justify="center" w="75%">
                    <Typo size="primary" type="semi-bold">
                        {/* <FormattedMessage defaultMessage="Khóa học Figma thiết kế chuyên nghiệp" /> */}
                        {data?.name}
                    </Typo>
                    <Group>
                        <Group className={styles.timegroup} gap="sm">
                            <Image src={IconClock} w="20" h="20" />
                            <Typo size="sub">
                                {'Thời lượng '}
                                {data?.totalStudyTime ? timeConvert(data?.totalStudyTime) : '00:00'}
                            </Typo>
                        </Group>
                        <Group className={styles.coursegroup} gap="sm">
                            <Image src={IconCourse} w="20" h="20" />
                            <Typo size="sub">
                                {data?.totalLesson ? data?.totalLesson : 0}{' '}
                                {translate.formatMessage(commonMessage.lesson)}
                            </Typo>
                        </Group>
                    </Group>
                    <Group justify="space-between">
                        <Group>
                            <Rating value={data?.averageStar} readOnly size="md" color="var(--star-color)"></Rating>
                        </Group>
                        <Group align="end">
                            <Typo className={styles.oldprice} size="tiny" type="semi-bold">
                                {/* <FormattedMessage defaultMessage="599.000 đ" /> */}
                                {data?.saleOff > 0 && data?.price > 0 && price(data?.price)}
                            </Typo>
                            <Typo
                                size="primary"
                                type="semi-bold"
                                style={{ color: 'var(--primary-color)', lineHeight: 'normal' }}
                            >
                                {data?.price == 0
                                    ? translate.formatMessage(commonMessage.free)
                                    : data?.saleOff
                                        ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
                                        : price(data?.price)}
                            </Typo>
                        </Group>
                    </Group>
                </Flex>
            </Flex>
        </div>
    );
};

export default ItemCart;
