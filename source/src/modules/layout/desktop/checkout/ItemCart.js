import { Avatar, Group, Rating, Text, Box, Image } from '@mantine/core';
import React from 'react';
import styles from './ItemCart.module.scss';
import classNames from 'classnames';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';

import { AppConstants } from '@constants';
import { price } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { timeConvert } from '@utils';
const ItemCart = ({ data }) => {
    const translate = useTranslate();
    return (
        <div className={styles.item}>
            <Group justify="space-between" className={styles.content}>
                <Group>
                    <Image
                        src={data?.banner ? AppConstants.contentRootUrl + data?.banner : category}
                        alt="Relevant Image"
                        radius="md"
                        h={150}
                    />
                    <Group>
                        <Box>
                            <Typo size="primary" type="semi-bold">
                                {data?.name}
                            </Typo>
                            <Group style={{ marginTop: 15 }}>
                                <Group style={{ paddingRight: 50 }} gap="sm">
                                    <Image src={IconClock} w="20" h="20" />
                                    <Typo size="sub">
                                        {data?.totalStudyTime ? timeConvert(data?.totalStudyTime) : '00:00'}{' '}
                                    </Typo>
                                </Group>
                                <Group gap="sm">
                                    <Image src={IconCourse} w="20" h="20" />
                                    <Typo size="sub">
                                        {data?.totalLesson ? data?.totalLesson : 0}{' '}
                                        {translate.formatMessage(commonMessage.lesson)}
                                    </Typo>
                                </Group>
                            </Group>
                        </Box>
                    </Group>
                </Group>
                <Group justify="start">
                    <Box>
                        <Typo className={styles.oldprice} size="tiny">
                            {data?.saleOff > 0 && data?.price > 0 && price(data?.price)}
                        </Typo>
                        <Typo className={styles.newprice} size="primary" type="semi-bold">
                            {data?.price == 0
                                ? translate.formatMessage(commonMessage.free)
                                : data?.saleOff
                                    ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
                                    : price(data?.price)}
                        </Typo>
                    </Box>
                </Group>
            </Group>
        </div>
    );
};

export default ItemCart;
