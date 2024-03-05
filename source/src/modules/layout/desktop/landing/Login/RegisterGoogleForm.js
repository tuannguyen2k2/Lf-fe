import React from 'react';
import styles from './index.module.scss';
import BasicModal from '@components/common/form/BasicModal';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput, Checkbox, Grid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import iconGoogle from '@assets/icons/brandGoogle.svg';
import iconFacebook from '@assets/icons/brandFacebook.svg';
import {
    AppConstants,
    GROUP_KIND_EXPERT,
    GROUP_KIND_SELLER,
    GROUP_KIND_STUDENT,
    appAccount,
    storageKeys,
} from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
import { setCacheAccessToken } from '@services/userService';
import { removeItem, setData } from '@utils/localStorage';
import { showErrorMessage, showInfoMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';
import useRegister from '@hooks/useRegister';
import { useState } from 'react';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '@utils/localStorage';
import { USER_ERROR_GG_EXISTS, errorMessage } from '@constants/ErrorCode';
const message = defineMessages({
    register: 'Đăng ký',
    registerSuccess: 'Đăng ký thành công',
    registerFail: 'Đăng ký thất bại',
    emailAddress: 'Địa chỉ email',
    password: 'Mật khẩu',
    forgetPassword: 'Quên mật khẩu',
    confirmPassword: 'Nhập lại mật khẩu',
    enterPassword: 'Nhập mật khẩu',
    otherLogin: 'Hoặc đăng nhập với',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    refCode: 'Mã giới thiệu',
    validateConfirmPassword: 'Mật khẩu không trùng khớp',
});
const RegisterGGForm = ({ isOpenRegister, isCloseRegister, isOpenLogin, data }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { execute: ggProfile, loading: ggProfileloading } = useFetch(apiConfig.student.profleGoogle);
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const loginGoogleFunc = (values, dataGoogle) => {
        const refcode = getData(storageKeys.REF_CODE);
        ggProfile({
            data: { ...values, ...dataGoogle, ...(refcode && { referralCode: refcode }) },
            onCompleted: (res) => {
                isCloseRegister();

                if (res?.data?.access_token) {
                    setCacheAccessToken(res.data.access_token);
                    if (res.data.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    }
                }
            },

            onError: (error) => {
                error?.response?.data?.code == USER_ERROR_GG_EXISTS
                    ? showErrorMessage(translate.formatMessage(errorMessage.USER_ERROR_GG_EXISTS))
                    : '';
            },
        });
    };
    const form = useForm({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            birthday: '',
            // referralCode: refcode,
        },

        validate: {
            phone: (value) => (value ? null : 'Vui lòng nhập số điện thoại'),
            password: (value) => (value ? null : 'Vui lòng nhập mật khẩu'),
            confirmPassword: (value, values) =>
                value !== values.password ? translate.formatMessage(message.validateConfirmPassword) : null,
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => loginGoogleFunc(values, data))}>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.phone)}
                            placeholder="Nhập số điện thoại"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.refCode)}
                            placeholder="Mã Giới thiệu"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('referralCode')}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <PasswordInput
                            withAsterisk
                            label={translate.formatMessage(message.password)}
                            mt={'15'}
                            classNames={{
                                root: styles.passwordInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('password')}
                            placeholder={translate.formatMessage(message.enterPassword)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <PasswordInput
                            withAsterisk
                            label={translate.formatMessage(message.confirmPassword)}
                            mt={'15'}
                            classNames={{
                                root: styles.passwordInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('confirmPassword')}
                            placeholder={translate.formatMessage(message.enterPassword)}
                        />
                    </Grid.Col>
                </Grid>

                <Group mt="xl" justify="center">
                    <Button
                        type="submit"
                        radius="md"
                        onClick={() => {}}
                        classNames={{ root: styles.btnRegister1, label: styles.label }}
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.register)}
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default RegisterGGForm;
