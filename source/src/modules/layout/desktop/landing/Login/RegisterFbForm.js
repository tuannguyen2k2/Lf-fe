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
import { setData } from '@utils/localStorage';
import { showErrorMessage, showInfoMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';
import useRegister from '@hooks/useRegister';
import { useState } from 'react';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getData, removeItem } from '@utils/localStorage';

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
});
const RegisterFbForm = ({ isOpenRegister, isCloseRegister, isOpenLogin, dataFacebook }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();

    const { execute: fbProfile, loading: fbProfileloading } = useFetch(apiConfig.student.ProfleFaceBook);
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const loginFaceBookFunc = (values, dataFacebook) => {
        const refcode = getData(storageKeys.REF_CODE);
        fbProfile({
            data: { ...values, ...dataFacebook, ...(refcode && { referralCode: refcode }) },
            onCompleted: (res) => {
                isCloseRegister();
                removeItem(storageKeys.REF_CODE);
                if (res?.data.access_token) {
                    setCacheAccessToken(res.data.access_token);

                    if (res.data.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    }
                }
            },

            onError: (res) => {
                if (res.result == false) {
                    showErrorMessage(res?.message);
                }
            },
        });
    };
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            birthday: '',
        },

        // validate: {
        //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        // },
    });

    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => loginFaceBookFunc(values, dataFacebook.data))}>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
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
                </Grid>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <PasswordInput
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
                        classNames={{ root: styles.btnRegisterFb, label: styles.label }}
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.register)}
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default RegisterFbForm;
