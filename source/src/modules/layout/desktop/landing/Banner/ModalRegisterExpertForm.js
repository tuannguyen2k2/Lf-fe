import useRegister from '@hooks/useRegister';
import useTranslate from '@hooks/useTranslate';
import { Alert, Box, Button, Grid, Group, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { actions } from '@store/actions/app';
import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import styles from './banner.module.scss';
import { Textarea } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import { Combobox, useCombobox } from '@mantine/core';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { Select } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import AutoCompleteLocationField from '@components/common/form/AutoCompleteLocationField';
import useNationField from '@hooks/useNationField';
import { showSucsessMessage, showErrorMessage } from '@services/notifyService';
import useExpertRegister from '@hooks/useExpertRegister';
import { getData } from '@utils/localStorage';
import { categoryKinds, storageKeys } from '@constants';
import { commonValidation } from '@constants/intl';
import { EXPERT_REGISTRATION_ERROR_PHONE_OR_EMAIL_ALREADY_USED } from '@constants/ErrorCode';
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
    major: 'Chuyên ngành',
    address: 'Địa chỉ ',
    province: 'Tỉnh/Thành phố',
    district: 'Quận/ Huyện',
    ward: 'Phường/Xã',
    refCode: 'Mã giới thiệu',
    desc: 'Mô tả bản thân',
    shortDesc: 'Mô tả ngắn',
});

const ModalRegisterExpertForm = ({ close }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const [ detail, setDetail ] = useState();
    const {
        execute: major,
        loading: getNationLoading,
        data: majorData,
    } = useFetch(apiConfig.category.autocomplete, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_NEWS },
    });
    const refcode = getData(storageKeys.REF_CODE);
    const form = useForm({
        initialValues: {
            referralCode: refcode,
        },
        validate: {
            fullName: (value) => (value ? null : 'Vui lòng nhập họ tên'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Vui lòng nhập email'),
            phone: (value) => (value ? null : 'Vui lòng nhập số điện thoại'),
            fieldId: (value) => (value ? null : 'Vui lòng chọn chuyên ngành'),
            address: (value) => (value ? null : 'Vui lòng nhập địa chỉ'),
            provinceId: (value) => (value ? null : 'Vui lòng chọn tỉnh'),
            districtId: (value) => (value ? null : 'Vui lòng chọn quận/huyện'),
            wardId: (value) => (value ? null : 'Vui lòng chọn phường'),
            shortInfo: (value) => (value ? null : 'Vui lòng nhập giới thiệu ngắn'),
        },
    });
    console.log(form.errors);
    const option = majorData?.data?.content?.map((item) => ({ value: `${item.id}`, label: item.name }));

    const { provincesFieldProps, wardsFieldProps, districtsFieldProps, resetField } = useNationField({
        form,
    });
    const { executeExpertRegister: onFinish } = useExpertRegister({ close });

    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            // required
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
                        {/* <TextInput
                            // withAsterisk
                            
                            
                            placeholder="Chuyên ngành"
                            
                            {...form.getInputProps('email')}
                        /> */}

                        <Select
                            withAsterisk
                            // required
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
                    </Grid.Col>
                </Grid>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            // required
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
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            // required
                            mt={'24'}
                            label={translate.formatMessage(message.phone)}
                            placeholder="Số điện thoại"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                </Grid>
                {form.errors?.phone == ' ' && form.errors?.email == ' ' && (
                    <Alert variant="light" color="red" title="Thông báo" mt={20}>
                        <Text>{translate.formatMessage(commonValidation.phoneAndEmailExit)}</Text>
                    </Alert>
                )}

                <Grid>
                    <Grid.Col span={4}>
                        <AutoCompleteLocationField
                            // required
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
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <AutoCompleteLocationField
                            // required
                            disabled={!form.getInputProps('provinceId').value}
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
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <AutoCompleteLocationField
                            // required
                            disabled={!form.getInputProps('districtId').value}
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
                    </Grid.Col>
                </Grid>
                <TextInput
                    withAsterisk
                    // required
                    mt={'24'}
                    label={translate.formatMessage(message.address)}
                    placeholder="Địa chỉ"
                    classNames={{
                        root: styles.textInputRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    {...form.getInputProps('address')}
                />
                <Textarea
                    mt={24}
                    label={translate.formatMessage(message.desc)}
                    placeholder={translate.formatMessage(message.desc)}
                    size="md"
                    classNames={{
                        root: styles.textAreaRoot,
                        label: styles.label,
                        input: styles.input,
                    }}
                    minRows={4}
                    {...form.getInputProps('introduction')}
                />
                <Grid>
                    <Grid.Col span={6}>
                        <TextInput
                            mt={'24'}
                            withAsterisk
                            label={translate.formatMessage(message.shortDesc)}
                            placeholder={translate.formatMessage(message.shortDesc)}
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('shortInfo')}
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
            </form>
        </Box>
    );
};

export default ModalRegisterExpertForm;
