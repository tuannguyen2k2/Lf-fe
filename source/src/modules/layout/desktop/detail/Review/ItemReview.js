import { Avatar, Rating, Text, Box, Group } from '@mantine/core';
import React from 'react';
import styles from './ItemReview.module.scss';

import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { AppConstants, DEFAULT_FORMAT } from '@constants';
import { Stack } from '@mantine/core';
import dayjs from 'dayjs';
import { formatTimeDifference } from '@utils';
import useAuth from '@hooks/useAuth';
const ItemReview = ({ item }) => {
    const { profile } = useAuth();
    return (
        <Box p={5}>
            <Group
                style={{ padding: 20, marginTop: 10, borderRadius: 15 }}
                className={profile?.id === item?.studentInfo?.id ? styles.itemMyCaccount : styles.item}
            >
                <Stack align="center" w={100}>
                    <Avatar
                        radius="999"
                        size="lg"
                        variant="filled"
                        color="cyan"
                        src={AppConstants.contentRootUrl + item?.studentInfo?.account?.avatar}
                    ></Avatar>
                </Stack>
                <Box maw={900}>
                    <Text fs={'var(--small-font-size)'}>{item?.studentInfo?.account?.fullName}</Text>
                    <Group align="center">
                        <Rating value={item?.star} readOnly color="var(--star-color)" size="20px"></Rating>
                        <Typo size="tiny">{formatTimeDifference(item?.createdDate, DEFAULT_FORMAT)}</Typo>
                    </Group>
                    <h3 className={styles.title}></h3>
                    <Text className={styles.numberreview} lineClamp={2}>
                        {item?.message}
                    </Text>
                </Box>
            </Group>
        </Box>
    );
};

export default ItemReview;
