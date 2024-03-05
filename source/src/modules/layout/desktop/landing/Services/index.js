import React from 'react';
import styles from './index.module.scss';
import ServicesItem from './ServicesItem';
import ServiceList from './ServiceList';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Healing from '@components/common/elements/Healing';
import { Flex, Group, Image } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { categoryKinds } from '@constants';
import arrow from '@assets/icons/arrow.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
const message = defineMessages({
    title: 'Tại sao bạn nên học tại Life Uni? ',
});
const Services = ({ data }) => {
    const translate = useTranslate();
    const navigate =  useNavigate();
    const navigateDetail = () => {
        navigate(generatePath(routes.newsListPage.path, { id: 7126437669634048 }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    return (
        <div className={styles.services}>
            <div className="container">
                <Flex justify='space-between'>
                    <Healing size="small" type="bold" className={styles.title}>
                        {translate.formatMessage(message.title)}
                    </Healing>
                    <Group className={styles.seeMore} onClick={() => navigateDetail()} style={{ cursor: 'pointer', zIndex:1 }}>
                        {data?.category?.kind !== categoryKinds.CATEGORY_KIND_TOP_NEW && (
                            <Group className={styles.seeMore}>
                                <Typo size="primary" className={styles.seeMore}>
                                    <FormattedMessage defaultMessage="Xem thêm" />
                                </Typo>
                                <Flex gap={2} mt={0}>
                                    <Image src={arrow} w={10} h={15} alt="" />
                                    <Image src={arrow} w={10} h={15} alt="" />
                                </Flex>
                            </Group>
                        )}
                    </Group>
                </Flex>
                <ServiceList data={data} />
            </div>
        </div>
    );
};

export default Services;
