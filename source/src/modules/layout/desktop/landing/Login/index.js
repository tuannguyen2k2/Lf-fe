import iconGoogle from '@assets/icons/brandGoogle.svg';
import { GROUP_KIND_SELLER, GROUP_KIND_STUDENT, appAccount, storageKeys } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Group, PasswordInput, TextInput, Alert, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { setCacheAccessToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { setData } from '@utils/localStorage';
import { Buffer } from 'buffer';
import React from 'react';
import { defineMessages } from 'react-intl';
import styles from './index.module.scss';

import { actions } from '@store/actions/app';
import { removeItem } from '@utils/localStorage';
import { useDispatch } from 'react-redux';
import { commonMessage, commonValidation } from '@constants/intl';
window.Buffer = window.Buffer || Buffer;
const message = defineMessages({
    login: 'Đăng nhập',
    phone: 'Số điện thoại/ Gmail',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    enterPassword: 'Nhập mật khẩu',
    enterPhone: 'Nhập số điện thoại/ Gmail',
    showPassword: 'Hiện mật khẩu',
    forgetPassword: 'Quên mật khẩu',
    otherLogin: 'Hoặc đăng nhập với',
    register: 'Đăng ký',
    loginSuccess: 'Đăng nhập thành công',
    loginFail: 'Số điện thoại hoặc mật khẩu không chính xác',
});
const ModalLoginForm = ({ isOpenRegister, isCloseLogin, isOpenForgetPassword, login, loginFaceBook }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();

    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');
    const { execute, loading } = useFetch({
        ...apiConfig.account.loginBasic,
        authorization: `Basic ${base64Credentials}`,
    });
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { execute: executeGetSellerProfile } = useFetchAction(accountActions.getSellerProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const form = useForm({
        initialValues: {
            phone: '',
            password: '',
        },
        validate: {
            phone: (value) => (value ? null : 'Vui lòng nhập số điện thoại'),
            password: (value) => (value ? null : 'Vui lòng nhập mật khẩu'),
        },
    });
    const handleRegisterClick = (closeLogin, openRegister) => {
        closeLogin();
        openRegister();
    };
    const handleForgetPasswordClick = (closeLogin, openForgetPassword) => {
        closeLogin();
        openForgetPassword();
    };

    const onFinish = (values) => {
        dispatch(actions.showAppLoading());
        execute({
            data: { ...values, grant_type: 'student' },
            onCompleted: (res) => {
                // setCacheAccessToken(res.access_token);
                // executeGetProfile();
                dispatch(actions.hideAppLoading());
                // showSucsessMessage(res);
            },
            onError: (res) => {
                if (res.access_token) {
                    setCacheAccessToken(res.access_token);
                    removeItem(storageKeys.REF_CODE);
                    if (res.user_kind === GROUP_KIND_STUDENT && res.is_seller) {
                        executeGetSellerProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_SELLER);
                        showSucsessMessage(translate.formatMessage(message.loginSuccess));
                        isCloseLogin();
                    } else if (res.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        showSucsessMessage(translate.formatMessage(message.loginSuccess));
                        isCloseLogin();
                    } else {
                        // showErrorMessage(translate.formatMessage(message.loginFail));
                        form.setFieldError('phone', ' ');
                        form.setFieldError('password', translate.formatMessage(commonValidation.passwordValidation));
                    }
                    dispatch(actions.hideAppLoading());
                } else {
                    dispatch(actions.hideAppLoading());
                    form.setFieldError('phone', ' ');
                    form.setFieldError(
                        'password',
                        <Alert variant="light" color="red" title="Thông báo">
                            <Text>{translate.formatMessage(commonValidation.passwordValidation)}</Text>
                        </Alert>,
                    );
                    // showErrorMessage(translate.formatMessage(message.loginFail));
                }
            },
        });
    };

    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                <TextInput
                    withAsterisk
                    mt={'24'}
                    label={translate.formatMessage(message.phone)}
                    classNames={{
                        root: styles.textInputRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    placeholder={translate.formatMessage(message.enterPhone)}
                    {...form.getInputProps('phone')}
                />
                <PasswordInput
                    withAsterisk
                    classNames={{
                        root: styles.passwordInputRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    label={translate.formatMessage(message.password)}
                    mt={'15'}
                    {...form.getInputProps('password')}
                    placeholder={translate.formatMessage(message.enterPassword)}
                />

                <Group mt="xl">
                    <Button
                        type="submit"
                        fullWidth
                        radius="md"
                        classNames={{ root: styles.btnLogin, label: styles.label }}
                    >
                        {translate.formatMessage(message.login)}
                    </Button>
                </Group>
            </form>
            <Group justify="space-between">
                <div
                    className={styles.forgetPassword}
                    onClick={() => handleForgetPasswordClick(isCloseLogin, isOpenForgetPassword)}
                >
                    {translate.formatMessage(message.forgetPassword)}
                </div>
                <div className={styles.btnRegister} onClick={() => handleRegisterClick(isCloseLogin, isOpenRegister)}>
                    {translate.formatMessage(message.register)}
                </div>
            </Group>
            <div className={styles.otherLogin}>
                <span>{translate.formatMessage(message.otherLogin)}</span>
            </div>
            <Group
                mt="15"
                justify="center"
                classNames={{
                    root: styles.groupBrand,
                }}
            >
                <Button
                    onClick={() => login()}
                    color={'#DC2626'}
                    radius="lg"
                    leftSection={<img style={{ width: '16px' }} src={iconGoogle} />}
                >
                    Google
                </Button>

                {/* <FacebookLogin
                    appId="310027460208063"
                    onSuccess={(response) => {
                        loginFaceBook(response);
                        isCloseLogin();
                    }}
                    render={({ onClick, logout }) => (
                        <Button
                            onClick={onClick}
                            onLogoutClick={logout}
                            color={'#1778F2'}
                            radius="lg"
                            leftSection={<img style={{ width: '16px', height: '20px' }} src={iconFacebook} />}
                        >
                            FaceBook
                        </Button>
                    )}
                /> */}
            </Group>
        </Box>
    );
};

export default ModalLoginForm;
