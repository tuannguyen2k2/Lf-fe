import React from 'react';
import styles from './index.module.scss';
import Typo from '@components/common/elements/Typo';
import { auto } from '@popperjs/core';
import ReviewList from './ReviewList';
import SumaryReview from './SumaryReview';
import { FormattedMessage } from 'react-intl';

const ReviewComponent = ({ data, summaryReviewData, getListReviewByCourse }) => {
    return (
        <div style={{ marginTop: '15px' }}>
            <Typo size="small" type="bold" style={{ marginTop: '20px' }}>
                <FormattedMessage defaultMessage="Đánh giá học viên" />
            </Typo>

            <SumaryReview summaryReview={summaryReviewData} />
            <ReviewList getListReviewByCourse={getListReviewByCourse} />
        </div>
    );
};

export default ReviewComponent;
