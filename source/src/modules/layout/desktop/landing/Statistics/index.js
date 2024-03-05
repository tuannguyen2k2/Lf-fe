import React from 'react';
import styles from './index.module.scss';
import Container from '@components/common/elements/Container';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Group, Box, Flex, Image } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
const Statistics = () => {
    return (
        <Box bg="var(--background-color-light)" align="center">
            <Container>
                <Group align="center" py={40} justify="space-between">
                    <Box gap={15} align="center" justify="center">
                        <Typo size="big" type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="8k+" />
                        </Typo>
                        <Typo size="primary" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Học viên đăng ký" />
                        </Typo>
                    </Box>
                    <Box gap={15} align="center" justify="center">
                        <Typo size="big" type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="20k+" />
                        </Typo>
                        <Typo size="primary" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="   Lượt xem" />
                        </Typo>
                    </Box>
                    <Box gap={15} align="center" justify="center">
                        <Typo size="big" type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="100+" />
                        </Typo>
                        <Typo size="primary" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Đội ngũ giảng viên" />
                        </Typo>
                    </Box>
                    <Box align="center" justify="center">
                        <Typo size="big" type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="200" />
                        </Typo>
                        <Typo size="primary" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Hài lòng" />
                        </Typo>
                    </Box>
                </Group>
            </Container>
        </Box>
    );
};

export default Statistics;
