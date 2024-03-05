import React from 'react';
import styles from './index.module.scss';
import BasicModal from '@components/common/form/BasicModal';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput, Checkbox, Grid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage, showInfoMessage, showSucsessMessage } from '@services/notifyService';
import { ACCOUNT_ERROR_OPT_INVALID, errorMessage } from '@constants/ErrorCode';
const message = defineMessages({
    login: 'Đăng nhập',
    otp: 'Mã xác thực',
    register: 'Đăng ký',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',

    showPassword: 'Hiện mật khẩu',
    forgetPassword: 'Quên mật khẩu',
    otherLogin: 'Hoặc đăng nhập với',
    emailOrPhone: 'Email',
    continue: 'Tiếp tục',

    registerSuccess: 'Đăng ký thành công',
    registerFail: 'Đăng ký thất bại',

    confirmPassword: 'Nhập lại mật khẩu',
    enterPassword: 'Xác nhận',

    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    changePasswordSuccess: 'Đổi mật khẩu thành công',
    message: 'Mật khẩu không trùng khớp',
    lengthPassword: 'Độ dài mật khẩu tối thiểu 6 kí tự ',
    validateConfirmPassword: 'Mật khẩu không trùng khớp',
    otpWrong: 'Mã xác thực không chính xác',
});
const ChangePasswordForgetPasswordForm = ({ idCode, close, openLogin }) => {
    const translate = useTranslate();

    const form = useForm({
        initialValues: {
            otp: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: {
            otp: (value) => (value ? null : 'Vui lòng nhập mã otp'),
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            newPassword: (value, values) => (value.length < 6 ? translate.formatMessage(message.lengthPassword) : null),
            confirmPassword: (value, values) =>
                value !== values.newPassword ? translate.formatMessage(message.validateConfirmPassword) : null,
        },
    });

    const { execute: ForgetPassword, loading: ggLoginloading } = useFetch(apiConfig.account.forgetPassword);

    const handleRequestForgetPassword = (values) => {
        ForgetPassword({
            data: {
                ...values,
                ...idCode,
            },
            onCompleted: (res) => {
                showSucsessMessage(translate.formatMessage(message.changePasswordSuccess));
                // showInfoMessage(res?.message);
                close();
                openLogin();
            },
            onError: (error) => {
                // showErrorMessage(res?.message);
                form.reset();
                error?.response?.data?.code == ACCOUNT_ERROR_OPT_INVALID &&
                    form.setFieldError('otp', translate.formatMessage(errorMessage.ACCOUNT_ERROR_OPT_INVALID));
            },
        });
    };
    return (
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

                <PasswordInput
                    withAsterisk
                    label={translate.formatMessage(message.password)}
                    mt={'15'}
                    classNames={{
                        root: styles.textInputRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    {...form.getInputProps('newPassword')}
                    placeholder={translate.formatMessage(message.password)}
                />

                <PasswordInput
                    withAsterisk
                    label={translate.formatMessage(message.confirmPassword)}
                    mt={'15'}
                    classNames={{
                        root: styles.textInputRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    {...form.getInputProps('confirmPassword')}
                    placeholder={translate.formatMessage(message.confirmPassword)}
                />

                <Group mt="xl">
                    <Button
                        type="submit"
                        fullWidth
                        radius="md"
                        classNames={{ root: styles.btnContinue, label: styles.label }}
                    >
                        {translate.formatMessage(message.enterPassword)}
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default ChangePasswordForgetPasswordForm;
