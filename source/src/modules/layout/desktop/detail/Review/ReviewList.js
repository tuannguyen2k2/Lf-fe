import React from 'react';
import ItemReview from './ItemReview';
import { Button, ScrollArea } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { Box } from '@mantine/core';
const ReviewList = ({ getListReviewByCourse }) => {
    return (
        <div>
            <ScrollArea.Autosize mah={630}>
                {/* <ItemReview />
                <ItemReview />
                <ItemReview /> */}

                {getListReviewByCourse?.map((item) => {
                    return <ItemReview key={item.id} item={item} />;
                })}
            </ScrollArea.Autosize>

            {/* <Button variant="outline" size="xl" fullWidth style={{ marginTop: 15, marginBottom: 15 }}>
                <Typo size="primary">
                    <FormattedMessage defaultMessage="Xem thêm đánh giá" />
                </Typo>
            </Button> */}
        </div>
    );
};

export default ReviewList;
