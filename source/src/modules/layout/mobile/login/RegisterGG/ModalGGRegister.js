import React from 'react';
import { Modal } from '@mantine/core';
import useTranslate from '@hooks/useTranslate';
import { defineMessages } from 'react-intl';
import RegisterGGForm from '.';

const message = defineMessages({
    register: 'Đăng ký Google',
});
const ModalGgRegister = ({ opened, close, openLogin, data }) => {
    const translate = useTranslate();
    return (
        <Modal
            zIndex={9999}
            fullScreen
            opened={opened}
            onClose={close}
            withCloseButton={false}
            styles={{
                title: {
                    fontSize: 'var(--h1-font-size)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--title-color)',
                    marginLeft: '35px',
                },
                header: {
                    paddingTop: '30px',
                    paddingBottom: 0,
                    paddingRight: '15px',
                },
            }}
        >
            <RegisterGGForm
                data={data}
                isCloseRegister={close}
                // isOpenLogin={openLogin}
                // isEditing={this.isEditing}
                // dataDetail={this.isEditing ? this.dataDetail : {}}
                // t={t}
                // formRef={this.foodFormRef}
                // handleAddMoreBeilage={this.handleAddMoreBeilage}
            />
        </Modal>
    );
};

export default ModalGgRegister;
