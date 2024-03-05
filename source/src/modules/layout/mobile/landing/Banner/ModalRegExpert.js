import Typo from '@components/common/elements/Typo';
import AutoCompleteLocationField from '@components/common/form/AutoCompleteLocationField';
import { categoryKinds, storageKeys } from '@constants';
import apiConfig from '@constants/apiConfig';
import useExpertRegister from '@hooks/useExpertRegister';
import useFetch from '@hooks/useFetch';
import useNationField from '@hooks/useNationField';
import useTranslate from '@hooks/useTranslate';
import { Box, Button, Grid, Group, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getData } from '@utils/localStorage';
import React from 'react';
import { defineMessages } from 'react-intl';
import styles from './index.module.scss';
import { ReactComponent as Close } from '@assets/icons/close.svg';
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
    desc: 'Mô tả bản thân',
    province: 'Tỉnh/Thành phố',
    district: 'Quận/ Huyện',
    ward: 'Phường/Xã',
    refCode: 'Mã giới thiệu',
    shortDes: 'Mô tả ngắn',
});

const ModalRegExpert = ({ closeRegister }) => {
    const translate = useTranslate();

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
            phone: (value) => (value ? null : 'Vui lòng nhập số điện thoại'),
            fieldId: (value) => (value ? null : 'Vui lòng chọn chuyên ngành'),
            address: (value) => (value ? null : 'Vui lòng nhập địa chỉ'),
            provinceId: (value) => (value ? null : 'Vui lòng chọn tỉnh'),
            districtId: (value) => (value ? null : 'Vui lòng chọn quận/huyện'),
            wardId: (value) => (value ? null : 'Vui lòng chọn phường'),
            shortInfo: (value) => (value ? null : 'Vui lòng nhập giới thiệu ngắn'),
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
        params: { kind: categoryKinds.CATEGORY_KIND_NEWS },
    });

    const option = majorData?.data?.content?.map((item) => ({ value: `${item.id}`, label: item.name }));

    const { executeExpertRegister: onFinish } = useExpertRegister({
        close: () => {
            closeRegister();
        },
        form,
    });

    return (
        <section className="container">
            <div className={styles?.headerRegister}>
                <Typo size="big" type="bold" style={{ color: 'var(--title-color)' }} className={styles.title}>
                    {translate.formatMessage(message.register)}
                </Typo>
                <i
                    className={styles.iconClose}
                    onClick={() => {
                        closeRegister();
                    }}
                >
                    <Close />
                </i>
            </div>
            <Box maw={'100%'}>
                <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                    <Grid>
                        <Grid.Col>
                            <TextInput
                                // required
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
                        <Grid.Col>
                            <TextInput
                                withAsterisk
                                mt={'24'}
                                // required
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
                        // required
                        withAsterisk
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
                    <Grid>
                        <Grid.Col>
                            <TextInput
                                withAsterisk
                                // required
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
                    <Grid>
                        <Grid.Col>
                            <TextInput
                                withAsterisk
                                // required
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
                        <Grid.Col>
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
                                {...form.getInputProps('introduction')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
                            <TextInput
                                mt={'24'}
                                withAsterisk
                                label={translate.formatMessage(message.shortDes)}
                                placeholder={translate.formatMessage(message.shortDes)}
                                classNames={{
                                    root: styles.textInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                {...form.getInputProps('shortInfo')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
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
                            // classNames={{ root: styles.btnRegister, label: styles.label }}
                            style={{ height: '50px', fontSize: 'var(--primary-font-size)' }}
                        >
                            {translate.formatMessage(message.register)}
                        </Button>
                    </Group>
                </form>
            </Box>
        </section>
    );
};

export default ModalRegExpert;
