import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import { setCacheAccessToken } from '@services/userService';
import { accountActions } from '@store/actions';
import React from 'react';
import styles from './index.module.scss';

import { ReactComponent as Close } from '@assets/icons/close.svg';
import Typo from '@components/common/elements/Typo';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import routes from '@routes';
import { defineMessages } from 'react-intl';
import { generatePath, useNavigate } from 'react-router-dom';
import iconGoogle from '@assets/icons/brandGoogle.svg';
import { GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, appAccount, storageKeys } from '@constants';

import { Buffer } from 'buffer';
import { Modal } from '@mantine/core';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { setData } from '@utils/localStorage';
import { useState } from 'react';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import iconFacebook from '@assets/icons/brandFacebook.svg';
import useLoginGG from '@hooks/useLoginGG';
import useLoginFB from '@hooks/useLoginFB';
import { removeItem } from '@utils/localStorage';
import ModalGgRegister from './RegisterGG/ModalGGRegister';
import RegisterMobileComponent from '@modules/layout/mobile/login/Register';
import useDisclosure from '@hooks/useDisclosure';
import useQueryParams from '@hooks/useQueryParams';
import { commonMessage, commonValidation } from '@constants/intl';
import { Text, Alert } from '@mantine/core';
const message = defineMessages({
    login: 'Đăng nhập',
    phone: 'Số điện thoại',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    enterPassword: 'Nhập mật khẩu',
    showPassword: 'Hiện mật khẩu',
    forgetPassword: 'Quên mật khẩu',
    otherLogin: 'Hoặc đăng nhập với',
    register: 'Đăng ký',
    loginSuccess: 'Đăng nhập thành công',
    loginFail: 'Số điện thoại hoặc mật khẩu không chính xác',
});
const LoginMobileComponent = () => {
    const translate = useTranslate();
    const { setQueryParams } = useQueryParams();
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
    const navigate = useNavigate();
    const [ ggData, setGGData ] = useState({});
    const queryParameters = new URLSearchParams(window.location.search);
    const isRegisterSuccess = queryParameters.get('isRegisterSuccess');
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
                        // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    } else if (res.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    } else {
                        form.setFieldError('phone', ' ');
                        form.setFieldError(
                            'password',
                            <Alert variant="light" color="red" title="Thông báo">
                                <Text>{translate.formatMessage(commonValidation.passwordValidation)}</Text>
                            </Alert>,
                        );
                    }

                    dispatch(actions.hideAppLoading());
                } else {
                    form.setFieldError('phone', ' ');
                    form.setFieldError(
                        'password',
                        <Alert variant="light" color="red" title="Thông báo">
                            <Text>{translate.formatMessage(commonValidation.passwordValidation)}</Text>
                        </Alert>,
                    );
                    dispatch(actions.hideAppLoading());
                }
            },
        });
    };

    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         // excuteTokenResponse({
    //         //     params: {
    //         //         client_id: '208203453170-958ocj82latc576uk8013m6qqar61p58.apps.googleusercontent.com',
    //         //         client_secret: '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',
    //         //         redirect_uri: 'http://localhost:3000',
    //         //         grant_type: 'authorization_code',
    //         //         code: tokenResponse.code,
    //         //     },
    //         //     onError: (res) => {
    //         //         // closeLogin();
    //         //         // loginGoogleFunc(res);
    //         //         // loginGoogleFunc()
    //         //     },
    //         // });
    //     },
    //     flow: 'auth-code',
    // });
    const { executeFBRegister, loading: loadingFb } = useLoginFB({});
    const [ isRegisterModalOpen, setIsRegisterModalOpen ] = useState(false);
    const { executeGGRegister, loading: loadinggg, data } = useLoginGG({ setIsRegisterModalOpen });

    const [ openedRegsiter, { open: openRegsiter, close: closeRegsiter } ] = useDisclosure(false);
    const handleOpenRegster = () => {
        openRegsiter();
        setOpen(false);
    };
    const [ open, setOpen ] = useState(false);

    return (
        <section className="container">
            <Box maw={'100%'} mx="auto">
                <div className={styles?.headerLogin}>
                    <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles?.titleLogin}>
                        {translate.formatMessage(message.login)}
                    </Typo>
                    <i
                        className={styles.iconClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(generatePath(routes.homePage.path), {
                                state: { action: 'home', prevPath: location.pathname },
                            });
                        }}
                    >
                        <Close />
                    </i>
                </div>
                {isRegisterSuccess && (
                    <Alert variant="light" color="green" title="Thông báo" mt={10}>
                        <Text>{translate.formatMessage(commonMessage.registerSuccess)}</Text>
                    </Alert>
                )}

                <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                    <TextInput
                        withAsterisk
                        mt={'24'}
                        label={translate.formatMessage(message.phone)}
                        placeholder="0123456789"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...form.getInputProps('phone')}
                    />
                    <PasswordInput
                        mt={'24'}
                        withAsterisk
                        classNames={{
                            root: styles.passwordInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        label={translate.formatMessage(message.password)}
                        {...form.getInputProps('password')}
                        placeholder={translate.formatMessage(message.enterPassword)}
                    />
                    {/* <Checkbox mt={'15'} label={translate.formatMessage(message.showPassword)} /> */}
                    <Group mt="xl">
                        <Button
                            // loading={loading || loginLoading}
                            type="submit"
                            fullWidth
                            radius="md"
                            classNames={{ root: styles.btnLogin, label: styles.label }}
                        >
                            {translate.formatMessage(message.login)}
                        </Button>
                    </Group>
                </form>
                <Group mt={'16'} justify="space-between">
                    <div
                        className={styles.forgetPassword}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(generatePath(routes.forgetPasswordPage.path), {
                                state: { action: 'forgetPassword', prevPath: location.pathname },
                            });
                        }}
                    >
                        {translate.formatMessage(message.forgetPassword)}
                    </div>
                    <div className={styles.btnRegister} onClick={() => handleOpenRegster()}>
                        {translate.formatMessage(message.register)}
                    </div>
                </Group>
                <div className={styles.otherLogin}>
                    <span>{translate.formatMessage(message.otherLogin)}</span>
                </div>
                <Group mt="15" justify="center" classNames={{ root: styles.groupBrand }}>
                    <Button
                        onClick={() => executeGGRegister()}
                        color={'#DC2626'}
                        radius="lg"
                        leftSection={<img style={{ width: '16px' }} src={iconGoogle} />}
                    >
                        Google
                    </Button>

                    {/* <FacebookLogin
                        appId="310027460208063"
                        onSuccess={(response) => {
                            executeFBRegister(response);
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
            <Modal
                opened={openedRegsiter}
                onClose={() => {
                    closeRegsiter();
                    setQueryParams({});
                }}
                withCloseButton={false}
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
            <ModalGgRegister opened={isRegisterModalOpen} data={data} setGGData={setGGData} />
        </section>
    );
};

export default LoginMobileComponent;
