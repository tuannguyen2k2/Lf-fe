import React from 'react';
import BasicModal from '@components/common/form/BasicModal';
import styles from './modalgg.module.scss';
import useTranslate from '@hooks/useTranslate';
import { defineMessages } from 'react-intl';
import RegisterGGForm from './RegisterGoogleForm';

const message = defineMessages({
    register: 'Đăng ký Google',
});
const ModalGgRegister = ({ opened, close, openLogin, data }) => {
    const translate = useTranslate();
    // console.log(data);
    return (
        <BasicModal
            size="calc(40vw)"
            isOpen={opened}
            onCloseModal={close}
            footer={false}
            title={translate.formatMessage(message.register)}
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
            <RegisterGGForm
                data={data}
                isCloseRegister={close}
                isOpenLogin={openLogin}
                // isEditing={this.isEditing}
                // dataDetail={this.isEditing ? this.dataDetail : {}}
                // t={t}
                // formRef={this.foodFormRef}
                // handleAddMoreBeilage={this.handleAddMoreBeilage}
            />
        </BasicModal>
    );
};

export default ModalGgRegister;
