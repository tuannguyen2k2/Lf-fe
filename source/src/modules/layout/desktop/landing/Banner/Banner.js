import React, { useEffect } from 'react';
import professional from '@assets/images/professional.png';
import Container from '@components/common/elements/Container';
import styles from './banner.module.scss';
import ContentLanding from '../ContentLanding';
import Button from '@components/common/elements/Button';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Image, Flex, Box } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import Healing from '@components/common/elements/Healing';
import classNames from 'classnames';
import ModalRegisterExpert from './ModalRegisterExpert';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useQueryParams from '@hooks/useQueryParams';

const message = defineMessages({
    title: 'Trở thành chuyên gia',
    button: 'Chia sẻ kinh nghiệm sống của bạn ngay hôm nay',
    desc: 'Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
});
const Banner = () => {
    const translate = useTranslate();

    const [ openedRegister, { open: openRegister, close: closeRegister } ] = useDisclosure(false);
    const queryParameters = new URLSearchParams(window.location.search);
    const { setQueryParams } = useQueryParams();
    useEffect(() => {
        if (queryParameters.get('isRegisterExpert') == 'true') openRegister();
    }, []);
    return (
        <div className={styles.banner}>
            <Container className={styles.professional}>
                <Image
                    fit="cover"
                    src={professional}
                    classNames={{
                        root: styles.image,
                    }}
                />
                <Box w={'100%'} classNames={styles.content}>
                    <Healing
                        size="small"
                        type="bold"
                        // style={{ color: 'var(--primary-color)' }}
                        className={styles.title}
                    >
                        {translate.formatMessage(message.title)}
                    </Healing>
                    <Typo size="primary" className={classNames(styles.desc, 'limit-line')}>
                        {translate.formatMessage(message.desc)}
                    </Typo>

                    <Button className={styles.button} onClick={openRegister}>
                        {translate.formatMessage(message.button)}
                    </Button>
                </Box>

                <ModalRegisterExpert
                    opened={openedRegister}
                    close={() => {
                        closeRegister();
                        setQueryParams({});
                    }}
                />
            </Container>
        </div>
    );
};

export default Banner;
