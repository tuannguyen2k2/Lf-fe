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
import { setData } from '@utils/localStorage';
import useRegister from '@hooks/useRegister';
import { useState } from 'react';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import useQueryParams from '@hooks/useQueryParams';
const message = defineMessages({
    register: 'Đăng ký FaceBook',
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
});
const RegisterFBMobileComponent = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ registerLoading, setLoading ] = useState(false);

    const form = useForm();
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { execute: fbProfile, loading: fbProfileloading } = useFetch(apiConfig.student.ProfleFaceBook);
    const { deserializeParams, serializeParams, params } = useQueryParams();
    const queryFilter = useMemo(() => deserializeParams(params), [ params ]);
    const loginFaceBookFunc = (values, dataFacebook) => {
        fbProfile({
            data: { ...values, ...dataFacebook },
            onCompleted: (res) => {

                if (res?.data.access_token) {
                    setCacheAccessToken(res.data.access_token);

                    if (res.data.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        showSucsessMessage(translate.formatMessage(message.loginSuccess));
                        navigate(routes.homePage.path);
                    }
                }
                dispatch(actions.hideAppLoading());
            },

            onError: (res) => {
                if (res.result == false) {
                    showErrorMessage(res?.message);
                }
                navigate(routes.homePage.path);
                dispatch(actions.hideAppLoading());
            },
        });
    };

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

                <form onSubmit={form.onSubmit((values) => loginFaceBookFunc(values, queryFilter))}>
                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                // withAsterisk
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

export default RegisterFBMobileComponent;
