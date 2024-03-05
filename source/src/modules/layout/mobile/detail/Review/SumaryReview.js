import React from 'react';
import styles from './index.module.scss';
import { Group, Rating, Text, Progress, Grid, Divider, rem, Box } from '@mantine/core';
import { auto } from '@popperjs/core';
import Typo from '@components/common/elements/Typo';
const SumaryReview = ({ summaryReview }) => {
    const sortedReview = summaryReview?.amountReview?.sort((p1, p2) =>
        p1.star < p2.star ? 1 : p1.star > p2.star ? -1 : 0,
    );
    const total = summaryReview?.total;
    return (
        <div>
            <Box my={10}>
                <Group align="center">
                    <Text size="34px" fw={'var(--font-bold)'}>
                        {summaryReview?.averageStar.toFixed(1)}
                    </Text>
                    <Box>
                        <Rating
                            fractions={4}
                            value={summaryReview?.averageStar}
                            readOnly
                            size="md"
                            color="var(--star-color)"
                            style={{ verticalAlign: 'text-bottom' }}
                        />
                    </Box>
                    <Typo size="primary" className={styles.numberreview}>
                        {summaryReview?.total} {' Đánh giá'}
                    </Typo>
                </Group>
            </Box>
            <Grid>
                <Divider />
                <Grid.Col span={auto} style={{ minHeight: rem(120) }}>
                    <div>
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
                                    <Text w={45}>
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
