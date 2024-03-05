import { ReactComponent as Close } from '@assets/icons/close.svg';
import Typo from '@components/common/elements/Typo';
import useRegister from '@hooks/useRegister';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Combobox, Grid, Group, TextInput, Textarea, useCombobox } from '@mantine/core';
import { useForm } from '@mantine/form';
import routes from '@routes';
import { actions } from '@store/actions/app';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from './index.module.scss';
import AutoCompleteLocationField from '@components/common/form/AutoCompleteLocationField';
import useNationField from '@hooks/useNationField';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import { showSucsessMessage, showErrorMessage } from '@services/notifyService';
import { Select } from '@mantine/core';
import useExpertRegister from '@hooks/useExpertRegister';
import { getData } from '@utils/localStorage';
import { storageKeys } from '@constants';
const message = defineMessages({
    register: 'Đăng ký chuyên gia',
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
    major: 'Chuyên ngành',
    desc: 'Mô tả',

    province: 'Tỉnh',

    district: 'Quận/ Huyện',
    ward: 'Phường',
});

const RegisterExpertMobileComponent = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            confirmPassword: (value, values) =>
                value !== values.password ? translate.formatMessage(message.validateConfirmPassword) : null,
        },
    });
    const { provincesFieldProps, wardsFieldProps, districtsFieldProps, resetField } = useNationField({
        form,
    });

    const {
        execute: major,
        loading: getNationLoading,
        data: majorData,
    } = useFetch(apiConfig.category.autocomplete, {
        immediate: true,
    });

    const option = majorData?.data?.content?.map((item) => ({ value: `${item.id}`, label: item.name }));

    const { executeExpertRegister: onFinish } = useExpertRegister({});

    return (
        <section className="container">
            <Box maw={'100%'} mx="auto" mt={30}>
                <div className={styles?.headerLogin}>
                    <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles.title}>
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

                <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                required
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
                                // withAsterisk
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

                    {/* <TextInput
                            // withAsterisk
                            
                            
                            placeholder="Chuyên ngành"
                            
                            {...form.getInputProps('email')}
                        /> */}

                    <Select
                        required
                        mt={'24'}
                        label={translate.formatMessage(message.major)}
                        placeholder="Chuyên ngành"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        data={option}
                        {...form.getInputProps('fieldId')}
                    />

                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                // withAsterisk
                                required
                                mt={'24'}
                                label={translate.formatMessage(message.address)}
                                placeholder={translate.formatMessage(message.address)}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('address')}
                            />
                        </Grid.Col>
                    </Grid>

                    <AutoCompleteLocationField
                        required
                        mt={'24'}
                        withAsterisk
                        placeholder={translate.formatMessage(message.province)}
                        label={translate.formatMessage(message.province)}
                        form={form}
                        name="provinceId"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...provincesFieldProps}
                    />

                    <AutoCompleteLocationField
                        required
                        mt={'24'}
                        withAsterisk
                        placeholder={translate.formatMessage(message.district)}
                        label={translate.formatMessage(message.district)}
                        form={form}
                        name="districtId"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...districtsFieldProps}
                    />

                    <AutoCompleteLocationField
                        required
                        mt={'24'}
                        withAsterisk
                        placeholder={translate.formatMessage(message.ward)}
                        label={translate.formatMessage(message.ward)}
                        form={form}
                        name="wardId"
                        classNames={{
                            root: styles.textInputRoot,
                            label: styles.label,
                            input: styles.input,
                        }}
                        {...wardsFieldProps}
                    />

                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                // withAsterisk
                                required
                                mt={'24'}
                                label={translate.formatMessage(message.phone)}
                                placeholder={translate.formatMessage(message.phone)}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('major')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Grid>
                        <Grid.Col span={12}>
                            <Textarea
                                // withAsterisk
                                mt={'24'}
                                label={translate.formatMessage(message.desc)}
                                placeholder={translate.formatMessage(message.desc)}
                                classNames={{
                                    root: styles.textAreaRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Group mt="xl" justify="center" mb={20}>
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

export default RegisterExpertMobileComponent;
