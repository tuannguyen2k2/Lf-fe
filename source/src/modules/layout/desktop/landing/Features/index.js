import React from 'react';

import play from '@assets/icons/play.svg';
import star from '@assets/icons/starIcons.svg';
import infinity from '@assets/icons/infinity.svg';
import Container from '@components/common/elements/Container';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Group, Box, Flex, Image } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import styles from './index.module.scss';
const message = defineMessages({
    desc_1: 'Học các kỹ năng có nhu cầu lớn với hơn 210000 khóa học video ? ',
    desc_2: 'Chọn khóa học do chuyên gia trong thế giới thực giảng dạy ? ',
    desc_3: ' Học theo tốc độ phù hợp với bạn với quyền truy cập suốt đời trên thiết bị di động và máy tính để bàn ',
});
const Feature = () => {
    const translate = useTranslate();
    return (
        <Box bg="var(--product-container-bg)" align="center" className={styles.box}>
            <Group align="center" p={20} py={40} mt={100} justify="space-between" className={styles.list}>
                {/* <Flex gap={20} align="center">
                    <Image radius="md" h={80} src={play} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_1)}
                    </Typo>
                </Flex> */}
                <div className={styles.featureItem}>
                    <Image radius="md" h={80} src={play} maw={80} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_1)}
                    </Typo>
                </div>
                <div className={styles.featureItem}>
                    <Image radius="md" h={80} src={star} maw={80} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_2)}
                    </Typo>
                </div>
                <div className={styles.featureItem}>
                    <Image radius="md" h={80} src={infinity} maw={80} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_3)}
                    </Typo>
                </div>
                {/* <Flex gap={20} align="center">
                    <Image radius="md" h={80} src={star} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_2)}
                    </Typo>
                </Flex>
                <Flex gap={20} align="center">
                    <Image radius="md" h={80} src={infinity} />

                    <Typo size="primary" style={{ maxWidth: 290, textAlign: 'start' }}>
                        {translate.formatMessage(message.desc_3)}
                    </Typo>
                </Flex> */}
            </Group>
        </Box>
    );
};

export default Feature;
