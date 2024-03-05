import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import avatar from '@assets/images/avatar_profile.png';
import { TextInput, Button, Box, Group, Checkbox, Grid, Select, Avatar, PasswordInput, Flex, LoadingOverlay } from '@mantine/core';
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
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorMessage } from '@services/notifyService';
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
    enterPassword: 'Nhập mật khẩu',
    profile: 'Hồ sơ công khai',
    oldPassword: 'Xác nhận mật khẩu',
    success: 'Thành công',
    updateSuccess: 'Cập nhật thành công',
    district: 'Quận/Huyện',
    ward: 'Phường/Xã',
    birthday: 'Ngày sinh',
    updateFalse: 'Lỗi không thể cập nhật',
    WrongPass: 'Sai mật khẩu không thể cập nhật',
});

const InfoProfile = ({ avatarPath }) => {
    const translate = useTranslate();
    const { profile, loading } = useAuth();
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
            password: '',
            oldPassword: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            oldPassword: (value) => (value ? null : 'Vui lòng nhập mật khẩu'),
            fullName: (value) => (value ? null : 'Vui lòng nhập họ và tên'),
        },
    });
    const { execute: executeGetNation, loading: getNationLoading } = useFetch(apiConfig.nation.autocomplete);
    const handleGetNation = (setOpts, kind, parentId) => {
        executeGetNation({
            params: {
                kind,
                parentId,
            },
            onCompleted: (res) => {
                setOpts(
                    res.data?.content?.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                    })),
                );
            },
        });
    };

    const handleGetProvinces = () => {
        handleGetNation(setProvincesOpts, nationKinds.PROVINCE_KIND);
    };

    const handleGetDistricts = (parentId) => {
        handleGetNation(setDistrictsOpts, nationKinds.DISTRICT_KIND, parentId);
    };

    const handleGetWards = (parentId) => {
        handleGetNation(setWardsOpts, nationKinds.VILLAGE_KIND, parentId);
    };

    useEffect(() => {
        handleGetProvinces(true);
        if (profile?.district?.id) {
            handleGetDistricts(profile?.province?.id);
        }
        if (profile?.ward?.id) {
            handleGetWards(profile?.district?.id);
        }
    }, []);

    const onFinish = (values) => {
        // values.birthday = formatDateString(values?.birthday, DATE_FORMAT_DISPLAY) + ' 00:00:00';
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
                data: { ...values, avatarPath },
                onCompleted: (res) => {
                    executeGetProfile();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (error) => {
                    dispatch(actions.hideAppLoading());
                    error?.response?.data?.code == ACCOUNT_ERROR_WRONG_PASSWORD
                        ? form.setFieldError(
                            'oldPassword',
                            translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD),
                        )
                        : '';

                    // toast.error(translate.formatMessage(message.updateFalse));
                },
            });
        } else {
            executeUpdateProfileSeller({
                data: { ...values, avatarPath },
                onCompleted: (res) => {
                    executeGetSellerProfile();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading()); //
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
                    {/* <Grid>
                        <Grid.Col>
                            <DateInput
                                mt={'24'}
                                label={translate.formatMessage(message.birthday)}
                                placeholder={translate.formatMessage(message.birthday)}
                                value={form.values.birthday != null ? new Date(form.values.birthday) : null}
                                onChange={(date) => {
                                    form.setFieldValue('birthday', date);
                                }}
                                classNames={{
                                    root: styles.dateInputRoot,
                                    label: styles.label,
                                    input: styles.input,
                                }}
                                valueFormat={'DD/MM/YYYY'}
                            />
                        </Grid.Col>
                    </Grid> */}
                    <Grid>
                        <Grid.Col>
                            <TextInput
                                // withAsterisk
                                disabled
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
                        <Grid.Col>
                            <TextInput
                                // withAsterisk
                                disabled
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
                    {userKind !== UserTypes?.EXPERT && (
                        <>
                            <Grid>
                                <Grid.Col>
                                    <Select
                                        // withAsterisk
                                        mt={'24'}
                                        label={translate.formatMessage(message.province)}
                                        placeholder="Chọn"
                                        classNames={{
                                            root: styles.textInputRoot,
                                            label: styles.label,
                                            input: styles.input,
                                        }}
                                        data={provincesOpts}
                                        {...form.getInputProps('provinceId')}
                                        onChange={(value) => {
                                            form.setFieldValue('provinceId', value);
                                            form.setFieldValue('districtId', null);
                                            form.setFieldValue('wardId', null);
                                            handleGetDistricts(value);
                                        }}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <Grid.Col>
                                    <Select
                                        // withAsterisk
                                        disabled={!form.getInputProps('provinceId').value}
                                        mt={'24'}
                                        label={translate.formatMessage(message.district)}
                                        placeholder="Chọn"
                                        classNames={{
                                            root: styles.textInputRoot,
                                            label: styles.label,
                                            input: styles.input,
                                        }}
                                        data={districtsOpts}
                                        {...form.getInputProps('districtId')}
                                        onChange={(value) => {
                                            form.setFieldValue('districtId', value);
                                            form.setFieldValue('wardId', null);
                                            handleGetWards(value);
                                        }}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <Grid.Col>
                                    <Select
                                        // withAsterisk
                                        disabled={!form.getInputProps('districtId').value}
                                        mt={'24'}
                                        label={translate.formatMessage(message.ward)}
                                        placeholder="Chọn"
                                        classNames={{
                                            root: styles.textInputRoot,
                                            label: styles.label,
                                            input: styles.input,
                                        }}
                                        data={wardsOpts}
                                        {...form.getInputProps('wardId')}
                                    />
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <Grid.Col>
                                    <TextInput
                                        // withAsterisk
                                        mt={'24'}
                                        label={translate.formatMessage(message.address)}
                                        placeholder="Nhập địa chỉ"
                                        classNames={{
                                            root: styles.textInputRoot,
                                            label: styles.label,
                                            input: styles.input,
                                        }}
                                        {...form.getInputProps('address')}
                                    />
                                </Grid.Col>
                            </Grid>
                        </>
                    )}

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
                                placeholder={translate.formatMessage(message.oldPassword)}
                            />
                        </Grid.Col>
                    </Grid>

                    <Group mt="xl" justify="center" style={{ paddingBottom: 30 }}>
                        <Button
                            type="submit"
                            // onClick={() => {
                            //     dispatch(actions.showAppLoading());
                            // }}
                            classNames={{ root: styles.btnUpdate, label: styles.label }}
                            // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                        >
                            {translate.formatMessage(message.update)}
                        </Button>
                        {/* <Button
                            variant="outline"
                            // type="submit"
                            classNames={{ root: styles.btnChange, label: styles.label }}
                            // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                        >
                            {translate.formatMessage(message.changePassword)}
                        </Button> */}
                    </Group>
                </form>
            </Box>
            <LoadingOverlay
                visible={loading}
                // zIndex={0}
                overlayProps={{ radius: 'sm' }}
                loaderProps={{ type: 'bars' }}
            />
        </div>
    );
};

export default InfoProfile;
