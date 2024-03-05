import React from 'react';
import styles from './index.module.scss';
import Container from '@components/common/elements/Container';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Group, Box, Flex, Image } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
const message = defineMessages({
    desc_1: 'Học các kỹ năng có nhu cầu lớn với hơn 210000 khóa học video ? ',
    desc_2: 'Chọn khóa học do chuyên gia trong thế giới thực giảng dạy ? ',
    desc_3: ' Học theo tốc độ phù hợp với bạn với quyền truy cập suốt đời trên thiết bị di động và máy tính để bàn ',
});
const Statistics = () => {
    return (
        <Box bg="var(--background-color-light)" align="center">
            <Container styles={{ maxWidth: 'px' }}>
                <Group align="start" mt={10} justify={'space-around'} grow py={18} gap={10}>
                    <Box gap={15} align="center" justify="center">
                        <Typo type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="8k+" />
                        </Typo>
                        <Typo size="sub" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Học viên đăng ký" />
                        </Typo>
                    </Box>
                    <Box gap={15} align="center" justify="center">
                        <Typo type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="20k+" />
                        </Typo>
                        <Typo size="sub" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="   Lượt xem" />
                        </Typo>
                    </Box>
                    <Box gap={15} align="center" justify="center">
                        <Typo type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="100+" />
                        </Typo>
                        <Typo size="sub" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Đội ngũ giảng viên" />
                        </Typo>
                    </Box>
                    <Box align="center" justify="center">
                        <Typo type="bold" className={styles.title}>
                            <FormattedMessage defaultMessage="200" />
                        </Typo>
                        <Typo size="sub" type="semi-bold" className={styles.title}>
                            <FormattedMessage defaultMessage="Hài lòng" />
                        </Typo>
                    </Box>
                </Group>
            </Container>
        </Box>
    );
};

export default Statistics;
