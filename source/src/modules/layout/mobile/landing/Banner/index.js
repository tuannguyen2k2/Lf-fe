import professional from '@assets/images/professional.png';
import Button from '@components/common/elements/Button';
import Container from '@components/common/elements/Container';
import Healing from '@components/common/elements/Healing';
import Typo from '@components/common/elements/Typo';
import useDisclosure from '@hooks/useDisclosure';
import useTranslate from '@hooks/useTranslate';
import { AspectRatio, BackgroundImage, Box, Flex, Modal, Overlay } from '@mantine/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import ModalRegExpert from './ModalRegExpert';
import styles from './index.module.scss';
import useQueryParams from '@hooks/useQueryParams';
import { useEffect } from 'react';
import { commonMessage } from '@constants/intl';
const message = defineMessages({
    title: 'Trở thành chuyên gia',
    button: 'Chia sẻ kinh nghiệm sống của bạn ngay hôm nay',
    desc: 'Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
});
const Banner = () => {
    const [ visible, setVisible ] = useState(true);
    const translate = useTranslate();
    const [ openedRegister, { open: openRegister, close: closeRegister } ] = useDisclosure(false);
    const queryParameters = new URLSearchParams(window.location.search);
    const { setQueryParams } = useQueryParams();
    useEffect(() => {
        if (queryParameters.get('isRegisterExpert') === 'true') {
            openRegister();
        }
    }, []);
    return (
        <Container>
            <Box mt={34} radius={'5px'} mih={'260px'}>
                <AspectRatio ratio={16 / 9} mx="auto" radius={'5px'} mih={'260px'}>
                    <Box mx="auto" className={styles.banner} radius={'5px'}>
                        <BackgroundImage src={professional} radius="5px" w={'100%'} h={'100%'} />
                        <Overlay radius={'5px'} h={'100%'} display={'flex'}>
                            <Flex align={'center'}>
                                <Box className={styles.banner__content} p={25}>
                                    <Healing size="small" type="bold" style={{ color: 'var(--text-color-light)' }}>
                                        {translate.formatMessage(message.title)}
                                    </Healing>
                                    <Typo size="primary" className={classNames(styles.desc)}>
                                        {translate.formatMessage(message.desc)}
                                    </Typo>
                                    <Button className={styles.button} onClick={() => openRegister()}>
                                        {translate.formatMessage(commonMessage.shareExpert)}
                                    </Button>
                                </Box>
                            </Flex>
                        </Overlay>
                    </Box>
                </AspectRatio>
            </Box>
            <Modal
                zIndex={300}
                withCloseButton={false}
                opened={openedRegister}
                fullScreen
                transitionProps={{ transition: 'fade', duration: 200 }}
                styles={{
                    title: {
                        fontSize: 'var(--h1-font-size)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--title-color)',
                        marginLeft: '40px',
                    },
                    header: {
                        paddingTop: '20px',
                        paddingBottom: 0,
                        paddingRight: '15px',
                    },
                    body: {
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
            >
                <ModalRegExpert closeRegister={closeRegister} />
            </Modal>
        </Container>
    );
};

export default Banner;
