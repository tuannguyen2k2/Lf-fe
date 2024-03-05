import React from 'react';
import styles from './AppHeader.module.scss';
import { Button, Group } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import BasicModal from '@components/common/form/BasicModal';
const ModalConfirm = ({ opened, close }) => {
    return (
        <BasicModal
            size={400}
            isOpen={opened}
            onCloseModal={close}
            footer={false}
            title="Xác nhận đăng xuất"
            style={{ position: 'relative' }}
            classNames={{
                root: styles.modalLoginRoot,
                inner: styles.inner,
                header: styles.header,
                title: styles.title,
                content: styles.content,
                body: styles.body,
            }}
        >
            <Typo size="tiny">Bạn có muốn đăng xuất</Typo>
            <Group justify="center">
                <Button>Có</Button>
                <Button>Không</Button>
            </Group>
        </BasicModal>
    );
};

export default ModalConfirm;
