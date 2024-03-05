import React from 'react';
import styles from './index.module.scss';
import { Group, Rating, Text, Progress, Grid, Divider, rem } from '@mantine/core';
import { auto } from '@popperjs/core';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
const SumaryReview = ({ summaryReview }) => {
    const total = summaryReview?.total;
    const sortedReview = summaryReview?.amountReview?.sort((p1, p2) =>
        p1.star < p2.star ? 1 : p1.star > p2.star ? -1 : 0,
    );
    return (
        <div>
            <Grid>
                <Grid.Col span="content">
                    <div className={styles.summary}>
                        <Typo size="big" type="bold" className={styles.avg}>
                            {summaryReview?.averageStar.toFixed(1)}
                        </Typo>
                        <Rating
                            fractions={4}
                            value={summaryReview?.averageStar}
                            readOnly
                            size="lg"
                            color="var(--star-color)"
                        />
                        <Typo size="tiny" className={styles.numberreview}>
                            {summaryReview?.total} {' Đánh giá'}
                        </Typo>
                    </div>
                </Grid.Col>
                <Divider />
                <Grid.Col span={auto} style={{ minHeight: rem(120) }}>
                    <div className={styles.progress}>
                        {sortedReview?.map((item, index) => {
                            return (
                                <Group key={index}>
                                    <Progress
                                        color="var(--star-color)"
                                        md={15}
                                        value={total > 0 ? ((item?.amount / total) * 100).toFixed(0) : 0}
                                        className={styles.bar}
                                        style={{ flex: '1' }}
                                        readOnly
                                    />
                                    <Text w={50}>
                                        {total > 0 ? ((item?.amount / total) * 100).toFixed(0) : 0} {'%'}
                                    </Text>

                                    <Rating
                                        fractions={4}
                                        value={item?.star}
                                        readOnly
                                        size="xs"
                                        color="var(--star-color)"
                                    />
                                </Group>
                            );
                        })}
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default SumaryReview;
