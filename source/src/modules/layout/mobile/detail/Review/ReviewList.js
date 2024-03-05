import React from 'react';
import ItemReview from './ItemReview';
import { Box, Button } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';

const ReviewList = ({ getListReviewByCourse }) => {
    return (
        <Box pb={30}>
            {getListReviewByCourse?.map((item) => {
                return <ItemReview key={item.id} item={item} />;
            })}

            {/* <Button variant="outline" size="lg" fullWidth my={10}>
                <Typo size="primary">
                    <FormattedMessage defaultMessage="Xem thêm đánh giá" />
                </Typo>
            </Button> */}
        </Box>
    );
};

export default ReviewList;
