import React from 'react';
import styles from './index.module.scss';
import Typo from '@components/common/elements/Typo';
import { auto } from '@popperjs/core';
import ReviewList from './ReviewList';
import SumaryReview from './SumaryReview';
import { FormattedMessage } from 'react-intl';
import { Flex } from '@mantine/core';

const ReviewComponent = ({ getListReviewByCourse, summaryReview }) => {
    return (
        <Flex justify="center">
            <div style={{ width: 1100 }}>
                <Typo size="small" type="semi-bold">
                    <FormattedMessage defaultMessage="Đánh giá học viên" />
                </Typo>

                <SumaryReview summaryReview={summaryReview} />
                <ReviewList getListReviewByCourse={getListReviewByCourse} />
            </div>
        </Flex>
    );
};

export default ReviewComponent;
