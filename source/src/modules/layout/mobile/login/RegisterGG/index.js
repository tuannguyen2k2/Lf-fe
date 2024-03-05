import BasicForm from '@components/common/form/BasicForm';
import React from 'react';
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
import {
    AppConstants,
    GROUP_KIND_EXPERT,
    GROUP_KIND_SELLER,
    GROUP_KIND_STUDENT,
    appAccount,
    storageKeys,
} from '@constants';
import { showErrorMessage, showInfoMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';
import { removeItem, setData } from '@utils/localStorage';
import useRegister from '@hooks/useRegister';
import { useState } from 'react';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import useQueryParams from '@hooks/useQueryParams';
import { useMemo } from 'react';
import { getData } from '@utils/localStorage';
import { USER_ERROR_GG_EXISTS, errorMessage } from '@constants/ErrorCode';

const message = defineMessages({
    register: 'Đăng ký Google',
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
const RegisterGGForm = ({ data }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ registerLoading, setLoading ] = useState(false);
    const { executeRegister, loading } = useRegister({
        isDesktop: false,
    });
    const { execute: ggProfile, loading: ggProfileloading } = useFetch(apiConfig.student.profleGoogle);
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const loginGoogleFunc = (values, dataGoogle) => {
        const refcode = getData(storageKeys.REF_CODE);
        ggProfile({
            data: { ...values, ...dataGoogle, ...(refcode && { referralCode: refcode }) },
            onCompleted: (res) => {
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
        <section className="container">
            <Box maw={'100%'} mx="auto">
                <div className={styles?.headerLogin}>
                    <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles?.title}>
                        {translate.formatMessage(message.register)}
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

                <form onSubmit={form.onSubmit((values) => loginGoogleFunc(values, data))}>
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                withAsterisk
                                mt={'24'}
                                label={translate.formatMessage(message.phone)}
                                placeholder={translate.formatMessage(message.phone)}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                label={translate.formatMessage(message.password)}
                                mt={'24'}
                                classNames={{
                                    root: styles.passwordInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('password')}
                                placeholder={translate.formatMessage(message.enterPassword)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={12}>
                            <PasswordInput
                                withAsterisk
                                label={translate.formatMessage(message.confirmPassword)}
                                mt={'24'}
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
                    <Grid>
                        <Grid.Col span={12}>
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

                    <Group mt="xl" justify="center">
                        <Button
                            fullWidth
                            type="submit"
                            radius="md"
                            classNames={{ root: styles.btnRegister, label: styles.label }}
                        >
                            {translate.formatMessage(message.register)}
                        </Button>
                    </Group>
                </form>
            </Box>
        </section>
    );
};

export default RegisterGGForm;
