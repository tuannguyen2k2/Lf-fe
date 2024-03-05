import React from 'react';
import styles from './index.module.scss';
import banner from '@assets/images/temp/banner.webp';
import { Anchor, Breadcrumbs, Flex, Grid, LoadingOverlay, Text, Title } from '@mantine/core';
import Container from '@components/common/elements/Container';
import { FormattedMessage } from 'react-intl';
import Button from '@components/common/elements/Button';
import { Rating } from '@mantine/core';
import Healing from '@components/common/elements/Healing';
import Typo from '@components/common/elements/Typo';
import { AppConstants } from '@constants';
import { timeConvert } from '@utils';
import { Image } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import Breadcrumb from '@components/common/elements/Breadcrumb';

const Banner = ({ data, loading }) => {
    console.log(data);
    const breadScrumbs = [
        { name: 'Trang chủ', path: '/', active: true },
        { name: 'Tại sao bạn nên học tại Life Uni?', path: '/', active: true },
        { name: data?.title, path: '/', active: true },
        { },
    ];

    return (
        <div className={styles.container}>
            <Container className={styles.bannerContainer}>
                <div className={styles.content}>
                    <div>
                        <Healing size="small" type={'bold'} className={styles.title} fs>
                            {data?.title}
                        </Healing>
                    </div>
                    <div>
                        <Title fw='400' size="12px" c="var(--text-color-light)" mt={8}>
                            {' Chủ đề '} {data?.category?.name}
                        </Title>
                        {/* <Breadcrumb routes={breadScrumbs}>
                        </Breadcrumb> */}
                    </div>
                </div>
            </Container>
            <LoadingOverlay
                visible={loading}
                zIndex={1}
                overlayProps={{ radius: 'sm' }}
                loaderProps={{ type: 'bars' }}
            />
            <Image
                src={data?.banner && AppConstants.contentRootUrl + data?.banner}
                alt=""
                className={styles.banner}
                h={'100%'}
            ></Image>
        </div>
    );
};

export default Banner;
