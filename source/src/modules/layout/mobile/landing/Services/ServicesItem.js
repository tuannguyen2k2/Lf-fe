import React from 'react';
import styles from './services.module.scss';
import lesson from '@assets/icons/lesson.svg';
import { Button, Image, Box, Text } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { AppConstants } from '@constants';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';

const message = defineMessages({
    title: 'Bài giảng cập nhật liên tục? ',
    desc: 'Truy cập không giới hạn hơn 24000 khóa học hàng đầu của Life Uni, ở mọi nơi và mọi lúc khóa học hàng đầu của Life Uni, ở mọi nơi',
    button: 'Khám phá',
});

const ServicesItem = ({ data, key }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const navigateNews = () => {
        navigate(generatePath(routes.newsPage.path, { id: data?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };

    return (
        <Box className={styles.card}>
            <Image src={ data?.avatar ? AppConstants.contentRootUrl + data?.avatar : lesson} w={40} style={{ borderRadius:50 }} />
            <Typo size="primary" type="bold" className={styles.title}>
                {data?.title}
            </Typo>
            <Typo size="sub" type="normal" className={styles.description}>
                {data?.description}
            </Typo>

            <Button variant="outline" radius="20px" size="xs" px={15} mt={10} onClick={navigateNews}>
                <Text fz={'var(--sub-font-size)'} fw="var(--font-normal)" c={'var(--primary-color)'}>
                    {translate.formatMessage(message.button)}
                </Text>
            </Button>
        </Box>
    );
};

export default ServicesItem;
