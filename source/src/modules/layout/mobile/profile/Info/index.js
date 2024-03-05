import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import avatar from '@assets/images/avatar_profile.png';
import UploadCamera from '@assets/icons/cameraUploadMobile.svg';

import {
    TextInput,
    Button,
    Box,
    Group,
    Checkbox,
    Grid,
    Select,
    Avatar,
    PasswordInput,
    Flex,
    Indicator,
    ThemeIcon,
    Stack,
} from '@mantine/core';
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
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { IconCamera } from '@tabler/icons-react';
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
    AppConstants,
} from '@constants';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { formatDateString } from '@utils';
import Typo from '@components/common/elements/Typo';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
import CropImageLink from '@components/common/elements/CropImage';
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
    updateProfile: 'Chỉnh sửa hồ sơ',
    updateFalse: 'Lỗi không thể cập nhật',
    WrongPass: 'Sai mật khẩu không thể cập nhật',
});

const InfoProfile = ({ avatarPath }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { profile } = useAuth();
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [ provincesOpts, setProvincesOpts ] = useState([]);
    const [ districtsOpts, setDistrictsOpts ] = useState([]);
    const [ wardsOpts, setWardsOpts ] = useState([]);
    const [ avatarImage, setAvatar ] = useState();
    const formatBirthday = (birthday) => {
        var regex = /(\d+)/g;
        var d = birthday?.match(regex);
        var birthdayNew = d[2] + '-' + d[1] + '-' + d[0] + ' ' + d[3] + ':' + d[4];
        return birthdayNew;
    };
    const userKind = getData(storageKeys.USER_KIND) || GROUP_KIND_STUDENT;
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

    const form = useForm({
        initialValues: {
            email: profile?.account?.email,
            fullName: profile?.account?.fullName,
            phone: profile?.account?.phone,
            provinceId: profile?.province?.id.toString(),
            districtId: profile?.district?.id.toString(),
            wardId: profile?.ward?.id.toString(),
            // birthday: profile?.birthday && formatBirthday(profile?.birthday),
            address: profile?.address,
            password: '',
            oldPassword: '',
        },
        validate: {
            fullName: (value) => (value ? null : 'Vui lòng nhập họ và tên'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            oldPassword: (value) => (value ? null : 'Vui lòng nhập mật khẩu'),
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
        values.birthday = values?.birthday && formatDateString(values?.birthday, DATE_FORMAT_DISPLAY) + ' 00:00:00';
        dispatch(actions.showAppLoading());
        if (userKind === UserTypes?.STUDENT) {
            executeUpdateProfileStudent({
                data: { ...values, ...(avatarImage && { avatarPath: avatarImage }) },
                onCompleted: (res) => {
                    executeGetProfile();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (error) => {
                    console.log(error);
                    dispatch(actions.hideAppLoading());

                    // error?.response?.data?.code == ACCOUNT_ERROR_WRONG_PASSWORD
                    //     ? showErrorMessage(translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD))
                    //     : '';
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
                data: { ...values, ...(avatarImage && { avatarPath: avatarImage }) },
                onCompleted: (res) => {
                    executeGetSellerProfile();
                    toast.success(translate.formatMessage(message.updateSuccess));
                    dispatch(actions.hideAppLoading());
                },
                onError: (error) => {
                    console.log(error);
                    // error?.response?.data?.code == ACCOUNT_ERROR_WRONG_PASSWORD
                    //     ? showErrorMessage(translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD))
                    //     : '';

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

    const uploadFileThumbnail = (file) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    setAvatar(response.data.filePath);
                }
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    return (
        <Box className={styles.content} w={'100%'} pb={20}>
            <div className={styles.titleProfile}>
                <Typo size="small" type="bold" style={{ color: 'var(--text-color)' }}>
                    {translate.formatMessage(message.updateProfile)}
                </Typo>
                <div className={styles.iconClose}>
                    <i
                        className={styles.iconClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            // navigate(generatePath(routes.profilePage.path), {
                            //     state: { action: 'home', prevPath: location.pathname },
                            // });
                            navigate(-1);
                        }}
                    >
                        <Close />
                    </i>
                </div>
            </div>
            <form onSubmit={form.onSubmit((values) => onFinish(values))}>
                {/* <div className={styles.avtar}>
                    <Indicator
                        size={25}
                        offset={15}
                        position="bottom-end"
                        color="#D9D9D9"
                        label={
                            <ThemeIcon radius="xl" size={12} color="#D9D9D9">
                                <IconCamera color="black" />
                            </ThemeIcon>
                        }
                        withBorder
                    >
                        <Avatar size={104} radius="9999" src={avatar} />
                    </Indicator>
                </div> */}
                <Stack mt={15} align="center">
                    <CropImageLink
                        placeholder={<FormattedMessage defaultMessage="Cập nhật avatar" key="updateAvatar" />}
                        uploadFileThumbnail={uploadFileThumbnail}
                        shape="round"
                        required
                        defaultImage={
                            profile?.account?.avatar?.includes('https') || profile?.account?.avatar == undefined
                                ? avatar
                                : AppConstants.contentRootUrl + profile?.account?.avatar
                        }
                        name="avatar"
                        srcIcon={UploadCamera}
                        // {...form.getInputProps('avatar')}
                    />
                </Stack>

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
                            disabled
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
                <Grid>
                    <Grid.Col>
                        <TextInput
                            disabled
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
                                        form.setFieldValue('wardId', '');
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
                            placeholder={translate.formatMessage(message.enterPassword)}
                        />
                    </Grid.Col>
                </Grid>
                {/* <Grid>
                    <Grid.Col>
                        <PasswordInput
                            classNames={{
                                root: styles.passwordInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            label={translate.formatMessage(message.newPassword)}
                            mt={'24'}
                            {...form.getInputProps('newPassword')}
                            placeholder={translate.formatMessage(message.enterPassword)}
                        />
                    </Grid.Col>
                </Grid> */}
                <Group mt="xl" justify="center">
                    <Button
                        type="submit"
                        // onClick={() => {
                        //     dispatch(actions.showAppLoading());
                        // }}
                        classNames={{ root: styles.btnUpdate, label: styles.label }}
                        fullWidth
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.update)}
                    </Button>
                    {/* <Button
                        variant="outline"
                        type="submit"
                        classNames={{ root: styles.btnChange, label: styles.label }}
                        fullWidth
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.changePassword)}
                    </Button> */}
                </Group>
            </form>
        </Box>
    );
};

export default InfoProfile;
