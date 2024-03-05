import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import avatar from '@assets/images/avatar_profile.png';
import { TextInput, Button, Box, Group, Checkbox, Grid, Select, Avatar, PasswordInput, Flex } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconChevronDown } from '@tabler/icons-react';
import Healing from '@components/common/elements/Healing';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import { getData } from '@utils/localStorage';
import { DateInput } from '@mantine/dates';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';

import {
    GROUP_KIND_EXPERT,
    GROUP_KIND_SELLER,
    GROUP_KIND_STUDENT,
    storageKeys,
    UserTypes,
    nationKinds,
    DATE_FORMAT_DISPLAY,
    DEFAULT_FORMAT,
} from '@constants';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { formatDateString } from '@utils';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { ACCOUNT_ERROR_WRONG_PASSWORD, errorMessage } from '@constants/ErrorCode';

const message = defineMessages({
    update: 'Cập nhật',
    emailAddress: 'Email',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    nation: 'Quốc gia',
    province: 'Tỉnh / thành',
    updatelater: 'Bỏ qua, tôi sẽ cập nhật sau',
    changePassword: 'Đổi mật khẩu',
    newPassword: 'Mật khẩu mới',
    enterOldPassword: 'Nhập mật khẩu cũ',
    enterNewPassword: 'Nhập mật khẩu mới',
    profile: 'Hồ sơ công khai',
    oldPassword: 'Mật khẩu cũ',
    success: 'Thành công',
    updateSuccess: 'Cập nhật thành công',
    district: 'Quận/Huyện',
    ward: 'Phường/Xã',
    birthday: 'Ngày sinh',
    confirmPassword: 'Xác nhận mật khẩu mới',
    validateConfirmPassword: 'Mật khẩu không khớp',
    requiredField: 'Vui lòng nhập mật khẩu cũ',
    requiredNewPassword: 'Vui lòng nhập mật khẩu mới',
    validateNewPassword: 'Mật khẩu mới không được trùng với mật khẩu cũ',
});

const ChangePassword = () => {
    const translate = useTranslate();
    const { profile } = useAuth();
    const dispatch = useDispatch();

    const [ provincesOpts, setProvincesOpts ] = useState([]);
    const [ districtsOpts, setDistrictsOpts ] = useState([]);
    const [ wardsOpts, setWardsOpts ] = useState([]);

    const formatBirthday = (birthday) => {
        var regex = /(\d+)/g;
        var d = birthday?.match(regex);
        var birthdayNew = d[2] + '-' + d[1] + '-' + d[0] + ' ' + d[3] + ':' + d[4];
        return birthdayNew;
    };
    const userKind = getData(storageKeys.USER_KIND) || GROUP_KIND_STUDENT;
    const { execute: executeUpdateProfileExpert, loading: loadingExpert } = useFetch({
        ...apiConfig.expert.updateProfile,
    });
    const { execute: executeUpdateProfileStudent, loading: loadingStudent } = useFetch({
        ...apiConfig.student.updateProfile,
    });
    const { execute: executeUpdateProfileSeller, loading: loadingSeller } = useFetch({
        ...apiConfig.seller.updateProfile,
    });
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { execute: executeGetSellerProfile } = useFetchAction(accountActions.getSellerProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { execute: executeGetExpertProfile } = useFetchAction(accountActions.getExpertProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const form = useForm({
        initialValues: {
            email: profile?.account?.email,
            fullName: profile?.account?.fullName,
            phone: profile?.account?.phone,
            provinceId: profile?.province?.id.toString(),
            districtId: profile?.district?.id.toString(),
            wardId: profile?.ward?.id.toString(),
            // birthday: formatBirthday(profile?.birthday),
            address: profile?.address,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: {
            newPassword: (value, values) =>
                value.length < 1
                    ? translate.formatMessage(message.requiredNewPassword)
                    : value === values.oldPassword
                        ? translate.formatMessage(message.validateNewPassword)
                        : null,
            oldPassword: (value) => (value.length < 1 ? translate.formatMessage(message.requiredField) : null),
            confirmPassword: (value, values) =>
                value !== values.newPassword ? translate.formatMessage(message.validateConfirmPassword) : null,
        },
    });

    const onFinish = (values) => {
        dispatch(actions.showAppLoading());
        if (userKind === UserTypes?.EXPERT) {
            executeUpdateProfileExpert({
                data: { ...values },
                onCompleted: (res) => {
                    executeGetExpertProfile();
                    form.reset();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (res) => {
                    dispatch(actions.hideAppLoading());
                },
            });
        } else if (userKind === UserTypes?.STUDENT) {
            executeUpdateProfileStudent({
                data: { ...values },
                onCompleted: (res) => {
                    executeGetProfile();
                    // toast.success(translate.formatMessage(message.updateSuccess));
                    showSucsessMessage(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (error) => {
                    error?.response?.data?.code == ACCOUNT_ERROR_WRONG_PASSWORD
                        ? form.setFieldError(
                            'oldPassword',
                            translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD),
                        )
                        : '';
                    dispatch(actions.hideAppLoading());
                },
            });
        } else {
            executeUpdateProfileSeller({
                data: { ...values },
                onCompleted: (res) => {
                    executeGetSellerProfile();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (error) => {
                    error?.response?.data?.code == ACCOUNT_ERROR_WRONG_PASSWORD
                        ? form.setFieldError(
                            'oldPassword',
                            translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD),
                        )
                        : '';
                    dispatch(actions.hideAppLoading());
                },
            });
        }
    };

    return (
        <div>
            <Box className={styles.content}>
                <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                    <Grid>
                        <Grid.Col>
                            <PasswordInput
                                withAsterisk
                                classNames={{
                                    root: styles.passwordInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                label={translate.formatMessage(message.oldPassword)}
                                mt={'24'}
                                {...form.getInputProps('oldPassword')}
                                placeholder={translate.formatMessage(message.enterOldPassword)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
                            <PasswordInput
                                withAsterisk
                                classNames={{
                                    root: styles.passwordInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                label={translate.formatMessage(message.newPassword)}
                                mt={'24'}
                                {...form.getInputProps('newPassword')}
                                placeholder={translate.formatMessage(message.enterNewPassword)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col>
                            <PasswordInput
                                withAsterisk
                                classNames={{
                                    root: styles.passwordInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                label={translate.formatMessage(message.confirmPassword)}
                                mt={'24'}
                                {...form.getInputProps('confirmPassword')}
                                placeholder={translate.formatMessage(message.confirmPassword)}
                            />
                        </Grid.Col>
                    </Grid>
                    <Group mt="xl" justify="center" style={{ paddingBottom: 30 }}>
                        <Button
                            variant="outline"
                            type="submit"
                            classNames={{ root: styles.btnChange, label: styles.label }}
                            // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                        >
                            {translate.formatMessage(message.changePassword)}
                        </Button>
                    </Group>
                </form>
            </Box>
        </div>
    );
};

export default ChangePassword;
