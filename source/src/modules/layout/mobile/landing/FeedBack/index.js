import React from 'react';
import FeedBackItem from './FeedBackItem';
import { Box } from '@mantine/core';
import FeedBackList from './FeedBackList';
import { Text } from '@mantine/core';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Container from '@components/common/elements/Container';
const message = defineMessages({
    title: 'Học viên nói gì về chúng tôi ',
});
const FeedBack = ({ reviewData, loading }) => {
    const translate = useTranslate();
    return (
        <Container>
            <Box mt={40}>
                <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} maw={400} mb={20}>
                    {translate.formatMessage(message.title)}
                </Text>

                <FeedBackList reviewData={reviewData} loading={loading} />
            </Box>
        </Container>
    );
};

export default FeedBack;
