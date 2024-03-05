import { Avatar, Group, Rating, Text, Box, Image } from '@mantine/core';
import React from 'react';
import styles from './ItemRelevant.module.scss';
import classNames from 'classnames';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
import { timeConvert, price } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { AppConstants } from '@constants';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@routes';
const ItemRelevant = ({ item }) => {
    const translate = useTranslate();
    const navigation = useNavigate();
    return (
        <Group
            // style={{
            //     borderRadius: 15,
            // }}
            // px={30}
            py={20}
            mt={15}
            className={styles.item}
            onClick={() => navigation(`/detail/${item.id}`)}
        >
            <Image
                src={item?.banner ? AppConstants.contentRootUrl + item?.banner : category}
                alt="Relevant Image"
                radius="md"
                h={100}
            />
            <Box>
                <Typo size="primary" className={styles.title}>
                    {item.name}
                </Typo>

                <Group>
                    <Group className={styles.timegroup} gap="sm">
                        <Image src={IconClock} w="20" h="20" />
                        <Typo size="sub">
                            {'Thời lượng '}
                            {item?.totalStudyTime ? timeConvert(item?.totalStudyTime) : '00:00'}
                        </Typo>
                    </Group>
                    <Group className={styles.coursegroup} gap="sm">
                        <Image src={IconCourse} w="20" h="20" />
                        <Typo size="sub">
                            {item?.totalLesson ? item?.totalLesson : 0} {translate.formatMessage(commonMessage.lesson)}
                        </Typo>
                    </Group>
                </Group>
                <Group style={{ width: 790 }} justify="space-between">
                    <Group gap={8}>
                        {/* <Typo size="sub" className={styles.numberstart}>
                            <FormattedMessage defaultMessage="4,6" />
                        </Typo> */}

                        <Rating value={item?.averageStar} readOnly size="20px" color="var(--star-color)"></Rating>
                    </Group>
                    <Group>
                        <Typo className={styles.oldprice} size="tiny" type="semi-bold">
                            {/* <FormattedMessage defaultMessage="599.000 đ" /> */}
                            {item?.saleOff > 0 && item?.price > 0 && price(item?.price)}
                        </Typo>
                        <Typo size="primary" type="semi-bold" className={styles.money}>
                            {item?.price == 0
                                ? translate.formatMessage(commonMessage.free)
                                : item?.saleOff
                                    ? price(item?.price - ((item?.price * 1) / 100) * item?.saleOff)
                                    : price(item?.price)}
                        </Typo>
                    </Group>
                </Group>
            </Box>
        </Group>
    );
};

export default ItemRelevant;
