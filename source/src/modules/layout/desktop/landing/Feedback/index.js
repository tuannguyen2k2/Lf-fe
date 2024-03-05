import FeadbackCarousel from './FeedbackCarousel';
import Container from '@components/common/elements/Container';
import ContentLanding from '../ContentLanding';
import React from 'react';
import styles from './index.module.scss';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Healing from '@components/common/elements/Healing';
import { Box } from '@mantine/core';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    title: 'Học viên nói gì về chúng tôi ? ',
});
const FeedbackDesktop = ({ executeReviewData, reviewData }) => {
    const translate = useTranslate();
    return (
        <Container className={styles.container} id="about">
            <Box mt={60}>
                <div className="feedback">
                    <Healing size="small" type="bold" className={styles.title}>
                        {translate.formatMessage(message.title)}
                    </Healing>
                    {reviewData ? (
                        <FeadbackCarousel reviewData={reviewData} />
                    ) : (
                        <SkeLeton numRow={8} style={{ marginTop: 15 }} />
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default FeedbackDesktop;
