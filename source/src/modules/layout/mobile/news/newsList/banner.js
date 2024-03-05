import React from 'react';
import banner from '@assets/images/temp/banner.webp';
import { Anchor, BackgroundImage, Breadcrumbs, Flex, Grid, LoadingOverlay, Text, Title } from '@mantine/core';
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
import styles from './index.module.scss';
import SkeLeton from '@components/common/elements/Skeleton';

const BannerListNews = ({ data, loading }) => {
    console.log(data);
    const breadScrumbs = [
        { name: 'Trang chủ', path: '/', active: true },
        { name: 'Tại sao bạn nên học tại Life Uni?', path: '/', active: true },
        { name: data?.title, path: '/', active: true },
        { },
    ];
    const pic = (value) => ({
        backgroundImage: `url(${data[value]?.banner && AppConstants.contentRootUrl + data[value]?.banner})`,
        width: '100%',
        height: 150,
    });

    const picMain = (value) => ({
        backgroundImage: `url(${data[value]?.banner && AppConstants.contentRootUrl + data[value]?.banner})`,
        width: '100%',
        // height: 250,
    });

    const content = (value) => (
        <div className={styles.content}>
            <div>
                <Healing size="12px" type={'bold'} className={styles.title}>
                    {data[value]?.title}
                </Healing>
            </div>
            <div>
                <Title fw='400' size="8px" c="var(--text-color-light)">
                    {' Chủ đề '} {data[value]?.category?.name}
                </Title>
            </div>
        </div>
    );

    return (
        data ?
            <div className={styles.banner}>
                <div className={styles.new1} style={picMain(0)}>
                    <div className={styles.content}>
                        <div>
                            <Healing size="15px" type={'bold'} className={styles.title}>
                                {data[0]?.title}
                            </Healing>
                        </div>
                        <div>
                            <Title fw='400' size="12px" c="var(--text-color-light)">
                                {' Chủ đề '} {data[0]?.category?.name}
                            </Title>
                        </div>
                    </div>
                </div>
                <div className={styles.new2} style={pic(1)}>{content(1)}</div>
                <div className={styles.new3} style={pic(2)}>{content(2)}</div>
            </div> : <SkeLeton numRow={8} />
    );
};


export default BannerListNews;
