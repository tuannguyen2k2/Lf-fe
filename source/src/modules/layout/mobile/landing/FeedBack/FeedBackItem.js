import React from 'react';
import { Avatar, Box, Text, Group } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import { AppConstants } from '@constants';
const FeedBackItem = ({ data, key, renderLink }) => {
    return (
        <Box miw={250} width={250} h={170} p={10} style={{ boxShadow: 'var(--box-shadow)', borderRadius: '10px' }}>
            <Box h={80}>
                <Text lineClamp={6} size={'14px'} style={{ lineHeight: 'normal' }}>
                    {data.message}
                </Text>
            </Box>
            <Group mt={35}>
                <Avatar
                    color="cyan"
                    size={'md'}
                    src={AppConstants.contentRootUrl + data?.studentInfo?.account?.avatar}
                />
                <Box>
                    <Typo size={'sub'} type="semi-bold" style={{ color: 'var(--primary-color)', lineHeight: 'normal' }}>
                        {data?.studentInfo?.account?.fullName}
                    </Typo>

                    <Typo style={{ color: 'var(--primary-color)', fontSize: '12px' }}>
                        <FormattedMessage defaultMessage="Học viên ngành Thiết kế đồ họa" />
                    </Typo>
                </Box>
            </Group>
        </Box>
    );
};

export default FeedBackItem;
