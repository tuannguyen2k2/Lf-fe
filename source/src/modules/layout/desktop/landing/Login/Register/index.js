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
import { getData } from '@utils/localStorage';
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
    validateConfirmPassword: 'Mật khẩu không trùng khớp',
    refCode: 'Mã giới thiệu',
});
const ModalRegisterForm = ({ isOpenRegister, isCloseRegister, isOpenLogin, data }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const [ registerLoading, setLoading ] = useState(false);
    const refcode = getData(storageKeys.REF_CODE);
    const form = useForm({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            referralCode: refcode,
        },
        validate: {
            fullName: (value) => (value ? null : 'Vui lòng nhập họ tên'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Vui lòng nhập email'),
            phone: (value) =>
                value
                    ? /^\d+$/.test(value) && value?.length > 2
                        ? null
                        : 'Số điện thoại sai định dạng'
                    : 'Vui lòng nhập số điện thoại',
            password: (value) =>
                value ? (value.length < 6 ? 'Mật khẩu phải dài hơn 6 kí tự' : null) : 'Vui lòng nhập mật khẩu',

            confirmPassword: (value, values) =>
                value !== values.password ? translate.formatMessage(message.validateConfirmPassword) : null,
        },
    });
    const { executeRegister, loading } = useRegister({
        isCloseRegister,
        isOpenLogin,
        isDesktop: true,
        form,
    });

    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => executeRegister(values))}>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.fullName)}
                            placeholder="Nhập họ và tên"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('fullName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.emailAddress)}
                            placeholder="mail@example.com"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('email')}
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

                <Group mt="xl" justify="center">
                    <Button type="submit" radius="md" classNames={{ root: styles.btnRegister, label: styles.label }}>
                        {translate.formatMessage(message.register)}
                    </Button>
                </Group>
                {/* <div className={styles.otherLogin}>
                    <span>{translate.formatMessage(message.otherLogin)}</span>
                </div>

                <Group mt="15" justify="center" classNames={{ root: styles.groupBrand }}>
                    <Button
                        color={'#DC2626'}
                        radius="lg"
                        leftSection={<img style={{ width: '16px' }} src={iconGoogle} />}
                    >
                        Google
                    </Button>

                    <Button
                        color={'#1778F2'}
                        radius="lg"
                        leftSection={<img style={{ width: '16px', height: '20px' }} src={iconFacebook} />}
                    >
                        FaceBook
                    </Button>
                </Group> */}
            </form>
        </Box>
    );
};

export default ModalRegisterForm;
