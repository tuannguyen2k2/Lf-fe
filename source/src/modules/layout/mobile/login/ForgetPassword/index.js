import BasicForm from '@components/common/form/BasicForm';
import React, { useState } from 'react';
import styles from './index.module.scss';
import InputField from '@components/common/form/InputField';
import * as yup from 'yup';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
import { setCacheAccessToken } from '@services/userService';
import { toast } from 'react-toastify';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput, Checkbox, Grid } from '@mantine/core';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { useForm } from '@mantine/form';
import Typo from '@components/common/elements/Typo';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { showErrorMessage, showInfoMessage } from '@services/notifyService';
import { ACCOUNT_ERROR_NOT_FOUND, errorMessage } from '@constants/ErrorCode';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import useQueryParams from '@hooks/useQueryParams';
import RegisterMobileComponent from '@modules/layout/mobile/login/Register';
const message = defineMessages({
    login: 'Đăng nhập',
    register: 'Đăng ký',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    showPassword: 'Hiện mật khẩu',
    forgetPassword: 'Quên mật khẩu',
    otherLogin: 'Hoặc đăng nhập với',
    emailOrPhone: 'Email/Số điện thoại',
    email: 'Email',
    continue: 'Tiếp tục',
    success: 'Yêu cầu quên mật khẩu thành công, vui lòng kiểm tra email.',
});
const ForgetPasswordMobileComponent = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { setQueryParams } = useQueryParams();
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Vui lòng nhập đúng định dạng email!'),
        },
    });

    const { execute: resquestForgetPassword, loading: ggLoginloading } = useFetch(
        apiConfig.account.resquestForgetPassword,
    );

    const handleRequestForgetPassword = (values) => {
        resquestForgetPassword({
            data: {
                ...values,
            },
            onCompleted: (res) => {
                // console.log(res);
                // showInfoMessage(translate.formatMessage(message.success));
                navigate(`${routes.ChangePasswordPage.path}?idHash=${res?.data?.idHash}`);
            },
            onError: (error) => {
                error?.response?.data?.code == ACCOUNT_ERROR_NOT_FOUND &&
                    form.setFieldError('email', translate.formatMessage(errorMessage.ACCOUNT_ERROR_NOT_FOUND));
            },
        });
    };

    const [ openedRegsiter, { open: openRegsiter, close: closeRegsiter } ] = useDisclosure(false);
    const handleOpenRegster = () => {
        openRegsiter();
        setOpen(false);
    };
    const [ open, setOpen ] = useState(false);

    return (
        <section className="container">
            <div className={styles?.headerLogin}>
                <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles?.title}>
                    {translate.formatMessage(message.forgetPassword)}
                </Typo>
                <i
                    className={styles.iconClose}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(generatePath(routes.loginPage.path), {
                            state: { action: 'login', prevPath: location.pathname },
                        });
                    }}
                >
                    <Close />
                </i>
            </div>

            <Box maw={'100%'} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleRequestForgetPassword(values))}>
                    <TextInput
                        withAsterisk
                        mt={'24'}
                        label={translate.formatMessage(message.email)}
                        placeholder="mail@example.com"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...form.getInputProps('email')}
                    />
                    <Group mt="xl">
                        <Button
                            type="submit"
                            fullWidth
                            radius="md"
                            classNames={{ root: styles.btnContinue, label: styles.label }}
                        >
                            {translate.formatMessage(message.continue)}
                        </Button>
                    </Group>
                </form>
                {/* <Group mt={'16'} justify="space-between">
                    <div
                        className={styles.btnLogin}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(generatePath(routes.loginPage.path), {
                                state: { action: 'login', prevPath: location.pathname },
                            });
                        }}
                    >
                        {translate.formatMessage(message.login)}
                    </div>
                    <div className={styles.btnRegister} onClick={() => handleOpenRegster()}>
                        {translate.formatMessage(message.register)}
                    </div>
                </Group> */}
            </Box>
            <Modal
                withCloseButton={false}
                opened={openedRegsiter}
                onClose={() => {
                    closeRegsiter();
                    setQueryParams({});
                }}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                zIndex={300}
                styles={{
                    title: {
                        fontSize: 'var(--h1-font-size)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--title-color)',
                        marginLeft: '130px',
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
                <RegisterMobileComponent closeRegsiter={closeRegsiter} />
            </Modal>
        </section>
    );
};

export default ForgetPasswordMobileComponent;
