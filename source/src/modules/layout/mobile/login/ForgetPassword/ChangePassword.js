import { ReactComponent as Close } from '@assets/icons/close.svg';
import Typo from '@components/common/elements/Typo';
import { ACCOUNT_ERROR_OPT_INVALID, errorMessage } from '@constants/ErrorCode';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useQueryParams from '@hooks/useQueryParams';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import routes from '@routes';
import { showSucsessMessage } from '@services/notifyService';
import React, { useMemo } from 'react';
import { defineMessages } from 'react-intl';
import { generatePath, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
const message = defineMessages({
    login: 'Đăng nhập',
    register: 'Đăng ký',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    showPassword: 'Hiện mật khẩu',
    forgetPassword: 'Xác nhận',
    otherLogin: 'Hoặc đăng nhập với',
    emailOrPhone: 'Email',
    continue: 'Tiếp tục',
    newPassword: 'Mật khẩu mới',
    confirmNewPassword: 'Nhập lại mật khẩu mới',
    confirmPassword: 'Nhập lại mật khẩu',
    enterPassword: 'Nhập mật khẩu',
    enterNewPassword: 'Nhập mật khẩu mới',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    otp: 'Mã xác thực',
    validateConfirmPassword: 'Mật khẩu không trùng khớp',
    lengthPassword: 'Độ dài mật khẩu tối thiểu 6 kí tự ',
    changePasswordSuccess: 'Đổi mật khẩu thành công',
});
const ChangePasswordMobileComponent = () => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            otp: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: {
            otp: (value) => (value ? null : 'Vui lòng nhập mã xác thực'),
            newPassword: (value, values) => (value.length < 6 ? translate.formatMessage(message.lengthPassword) : null),
            confirmPassword: (value, values) =>
                value !== values.newPassword ? translate.formatMessage(message.validateConfirmPassword) : null,
        },
    });

    const { execute: ForgetPassword, loading: forgetPasswordloading } = useFetch(apiConfig.account.forgetPassword);
    const { deserializeParams, serializeParams, params } = useQueryParams();
    const queryFilter = useMemo(() => deserializeParams(params), [ params ]);

    const _idhash = queryFilter?.idHash;
    const idHash = _idhash.replace(/ /g, '+');

    const handleRequestForgetPassword = (values) => {
        ForgetPassword({
            data: {
                ...values,
                ...(idHash && { idHash: idHash }),
            },
            onCompleted: (res) => {
                showSucsessMessage(translate.formatMessage(message.changePasswordSuccess));
                navigate(routes.loginPage.path);
            },
            onError: (error) => {
                // error?.response?.data?.code == ACCOUNT_ERROR_OPT_INVALID
                //     ? showErrorMessage(translate.formatMessage(errorMessage.ACCOUNT_ERROR_OPT_INVALID))
                //     : '';

                form.reset();
                error?.response?.data?.code == ACCOUNT_ERROR_OPT_INVALID &&
                    form.setFieldError('otp', translate.formatMessage(errorMessage.ACCOUNT_ERROR_OPT_INVALID));

                // showErrorMessage(res?.message);
            },
        });
    };

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
                        label={translate.formatMessage(message.otp)}
                        placeholder="Mã xác thực"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...form.getInputProps('otp')}
                    />
                    <Grid>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                label={translate.formatMessage(message.newPassword)}
                                mt={'24'}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('newPassword')}
                                placeholder={translate.formatMessage(message.enterNewPassword)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                label={translate.formatMessage(message.confirmNewPassword)}
                                mt={'24'}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('confirmPassword')}
                                placeholder={translate.formatMessage(message.confirmNewPassword)}
                            />
                        </Grid.Col>
                    </Grid>
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
                <Group mt={'16'} justify="space-between">
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
                    <div
                        className={styles.btnRegister}
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     navigate(generatePath(routes.registerPage.path), {
                        //         state: { action: 'register', prevPath: location.pathname },
                        //     });
                        // }}
                    >
                        {translate.formatMessage(message.register)}
                    </div>
                </Group>
            </Box>
        </section>
    );
};

export default ChangePasswordMobileComponent;
