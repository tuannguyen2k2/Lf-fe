import { ReactComponent as Close } from '@assets/icons/close.svg';
import Typo from '@components/common/elements/Typo';
import { storageKeys } from '@constants';
import useRegister from '@hooks/useRegister';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Grid, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import routes from '@routes';
import { actions } from '@store/actions/app';
import { getData } from '@utils/localStorage';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from './index.module.scss';
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
    refCode: 'Mã giới thiệu',
    validateConfirmPassword: 'Mật khẩu không trùng khớp',
});
const RegisterMobileComponent = ({ closeRegsiter }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
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
        isDesktop: false,
        closeRegisterModal: closeRegsiter,
        form, // Pass the closeRegsiter function to useRegister
    });

    return (
        <section className="container">
            <Box maw={'100%'} mx="auto">
                <div className={styles?.headerLogin}>
                    <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles.title}>
                        {translate.formatMessage(message.register)}
                    </Typo>
                    <i
                        className={styles.iconClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeRegsiter();
                        }}
                    >
                        <Close />
                    </i>
                </div>
                <form onSubmit={form.onSubmit((values) => executeRegister(values))}>
                    <Grid>
                        <Grid.Col span={12}>
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
                    </Grid>
                    <Grid>
                        <Grid.Col span={12}>
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
                            // onClick={() => {
                            //     dispatch(actions.showAppLoading());
                            // }}
                            // classNames={{ root: styles.btnRegister, label: styles.label }}
                            style={{ height: '50px', fontSize: 'var(--primary-font-size)' }}
                        >
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
        </section>
    );
};

export default RegisterMobileComponent;
