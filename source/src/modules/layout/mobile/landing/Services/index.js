import React from 'react';
import styles from './index.module.scss';
import ServicesItem from './ServicesItem';
import ServiceList from './ServiceList';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Text, Box } from '@mantine/core';
import Healing from '@components/common/elements/Healing';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
const message = defineMessages({
    title: 'Tại sao bạn nên học tại  Life Uni? ',
});
const Services = ({ data, loading }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const navigateDetail = () => {
        navigate(generatePath(routes.newsListPage.path), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    return (
        <Container>
            <Box mt={20} >
                <div className={styles.servicesList}>
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} maw={'70%'} mb={20} >
                        {translate.formatMessage(message.title)}
                    </Text>

                    <Box
                        onClick={() => navigateDetail()}
                        style={{ cursor: 'pointer', width:'120px' }}
                    >
                        <Typo
                            size="primary"
                            type="semi-bold"
                            style={{ color: 'var(--black-cate-name)', verticalAlign: 'middle' }}

                        >
                            <FormattedMessage defaultMessage="Xem thêm" />
                        </Typo>
                    </Box>
                </div>
                <ServiceList data={data} loading={loading}/>
            </Box>
        </Container>
    );
};

export default Services;
