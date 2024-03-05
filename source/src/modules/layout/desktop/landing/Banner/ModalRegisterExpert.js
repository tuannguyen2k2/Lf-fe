import BasicModal from '@components/common/form/BasicModal';
import useTranslate from '@hooks/useTranslate';
import React from 'react';
import { defineMessages } from 'react-intl';
import styles from './banner.module.scss';
import ModalRegisterExpertForm from './ModalRegisterExpertForm';
import { useMediaQuery } from '@mantine/hooks';
import classNames from 'classnames';
import { em } from '@mantine/core';
const message = defineMessages({
    register: 'Trở thành chuyên gia',
});
const ModalRegisterExpert = ({ opened, close }) => {
    const translate = useTranslate();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    return (
        <BasicModal
            size="calc(40vw)"
            isOpen={opened}
            onCloseModal={close}
            footer={false}
            title={translate.formatMessage(message.register)}
            style={{ position: 'relative' }}
            fullScreen={isMobile}
            classNames={{
                root: styles.modalLoginRoot,
                inner: styles.inner,
                header: styles.header,
                title: styles.titlemodal,
                content: styles.content,
                body: styles.body,
            }}
        >
            <ModalRegisterExpertForm opened={opened} close={close} />
        </BasicModal>
    );
};

export default ModalRegisterExpert;
