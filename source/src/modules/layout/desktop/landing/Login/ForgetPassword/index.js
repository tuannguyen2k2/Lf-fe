import React from 'react';
import styles from './index.module.scss';
import BasicModal from '@components/common/form/BasicModal';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput, Checkbox, Grid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage, showInfoMessage } from '@services/notifyService';
import { ACCOUNT_ERROR_NOT_FOUND, errorMessage } from '@constants/ErrorCode';
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
    changePassword: 'Tiếp tục',
    success: 'Yêu cầu quên mật khẩu thành công, vui lòng kiểm tra email.',
});
const ForgetPasswordForm = ({
    isOpenRegister,
    isOpenLogin,
    isCloseForgetPassword,
    openChangeForgetPassword,
    setIdCode,
    idCode,
}) => {
    const translate = useTranslate();

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
                showInfoMessage(translate.formatMessage(message.success));
                setIdCode(res.data);
                isCloseForgetPassword();
                openChangeForgetPassword();
            },
            onError: (error) => {
                error?.response?.data?.code == ACCOUNT_ERROR_NOT_FOUND &&
                    form.setFieldError('email', translate.formatMessage(errorMessage.ACCOUNT_ERROR_NOT_FOUND));
            },
        });
    };
    return (
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
                        {translate.formatMessage(message.changePassword)}
                    </Button>
                </Group>
            </form>
            {/* <Group mt={'16'} justify="space-between">
                <div className={styles.btnLogin} onClick={() => handleLoginClick(isCloseForgetPassword, isOpenLogin)}>
                    {translate.formatMessage(message.login)}
                </div>
                <div
                    className={styles.btnRegister}
                    onClick={() => handleRegisterClick(isCloseForgetPassword, isOpenRegister)}
                >
                    {translate.formatMessage(message.register)}
                </div>
            </Group> */}
        </Box>
    );
};

export default ForgetPasswordForm;
