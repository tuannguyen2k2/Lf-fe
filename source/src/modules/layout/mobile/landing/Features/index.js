import React from 'react';

import play from '@assets/icons/play.svg';
import star from '@assets/icons/starIcons.svg';
import infinity from '@assets/icons/infinity.svg';
import Container from '@components/common/elements/Container';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Group, Box, Flex, Image } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
const message = defineMessages({
    desc_1: 'Học các kỹ năng có nhu cầu lớn với hơn 210000 khóa học video ? ',
    desc_2: 'Chọn khóa học do chuyên gia trong thế giới thực giảng dạy ? ',
    desc_3: ' Học theo tốc độ phù hợp với bạn với quyền truy cập suốt đời trên thiết bị di động và máy tính để bàn ',
});
const Feature = () => {
    const translate = useTranslate();
    return (
        <Box bg="var(--product-container-bg)" align="center" mt={30}>
            <Container>
                <Flex align="center" py={20} mt={20} gap={5} justify="space-between">
                    <Flex gap={10} align="center" w="50%">
                        <Image radius="md" h={40} src={play} />

                        <Typo size="sub" style={{ textAlign: 'start' }}>
                            {translate.formatMessage(message.desc_1)}
                        </Typo>
                    </Flex>
                    <Flex gap={10} align="center" w="50%">
                        <Image radius="md" h={40} src={play} />

                        <Typo size="sub" style={{ textAlign: 'start' }}>
                            {translate.formatMessage(message.desc_2)}
                        </Typo>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Feature;
