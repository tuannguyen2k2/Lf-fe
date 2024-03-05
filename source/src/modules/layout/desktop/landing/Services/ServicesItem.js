import React from 'react';
import styles from './services.module.scss';
import lesson from '@assets/icons/lesson.svg';
import { Button, Image, Box } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { AppConstants } from '@constants';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
const ServicesItem = ({ data, style, renderLink, renderTitle, key }) => {
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
            <Image
                src={data?.avatar ? AppConstants.contentRootUrl + data?.avatar : lesson}
                w={80}
                style={{ borderRadius: 50 }}
            />
            <Typo size="primary" type="bold" className={styles.title}>
                {data?.title}
            </Typo>
            <Typo size="sub" className={styles.description}>
                {data?.description}
            </Typo>

            <Button variant="outline" radius="xl" size="md" px={40} mt={30} onClick={navigateNews}>
                Khám phá
            </Button>
        </Box>
    );
};

export default ServicesItem;
