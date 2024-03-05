import { Avatar, Rating, Text, Box, Group, Stack } from '@mantine/core';
import React from 'react';
import styles from './ItemReview.module.scss';

import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { AppConstants, DEFAULT_FORMAT } from '@constants';
import { formatTimeDifference } from '@utils';
import useAuth from '@hooks/useAuth';
const ItemReview = ({ item }) => {
    const { profile } = useAuth();
    return (
    // <Group

        <Box
            className={profile?.id === item?.studentInfo?.id ? styles.itemMyCaccount : styles.item}
            style={{ padding: 10, marginTop: 10, borderRadius: 5 }}
        >
            <Group align="start" w={'100%'}>
                <Avatar
                    w
                    size="md"
                    variant="filled"
                    color="cyan"
                    src={AppConstants.contentRootUrl + item?.studentInfo?.account?.avatar}
                />
                <Box w={'83%'}>
                    <Group justify="space-between">
                        <Text size="var(--sub-font-size)">{item?.studentInfo?.account?.fullName}</Text>
                        <Typo size="sub" style={{ lineHeight: 'normal', color: 'var(--gray-9)' }}>
                            {formatTimeDifference(item?.createdDate, DEFAULT_FORMAT)}
                        </Typo>
                    </Group>

                    <Group mt={10}>
                        <Rating value={item?.star} readOnly color="var(--star-color)" size="xs"></Rating>
                    </Group>
                </Box>
                <Group w={'100%'}>
                    <Text className={styles.numberreview} lineClamp={2}>
                        {item?.message}
                    </Text>
                </Group>
            </Group>
        </Box>
    );
};

export default ItemReview;
