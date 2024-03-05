import React from 'react';
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
import { FormattedMessage, defineMessages } from 'react-intl';
import { showErrorMessage, showInfoMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';
import { setCacheAccessToken } from '@services/userService';
import { getData, setData } from '@utils/localStorage';
import useTranslate from '@hooks/useTranslate';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';

const message = defineMessages({
    registerSuccess: 'Đăng ký thành công',
    registerFail: 'Đăng ký thất bại',
    exitsUser: 'Emall hoặc số điện thoại đã tồn tại',
    invailError: 'Email đã tồn tại',
});
import { removeItem } from '@utils/localStorage';
import {
    ACCOUNT_ERROR_EMAIL_EXISTS,
    USER_EMAIL_GG_EXISTS,
    USER_ERROR_PHONE_EXISTS,
    errorMessage,
} from '@constants/ErrorCode';
import { ValidationError } from 'yup';
import { commonValidation } from '@constants/intl';
const useRegister = ({ isCloseRegister, isOpenLogin, isDesktop, closeRegisterModal, form }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');
    const { execute, loading } = useFetch({
        ...apiConfig.student.signUp,
        authorization: `Basic ${base64Credentials}`,
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

    const onFinish = (values) => {
        const refcode = getData(storageKeys.REF_CODE);

        execute({
            data: {
                ...values,
                grant_type: 'student',
                // ...(refcode && { referralCode: refcode }),
            },

            onCompleted: (res) => {
                dispatch(actions.hideAppLoading());
                // setCacheAccessToken(res.access_token);
                // executeGetProfile();
                // console.log(res);
                // showSucsessMessage(res);
                removeItem(storageKeys.REF_CODE);
                showSucsessMessage(translate.formatMessage(message.registerSuccess));
                if (isDesktop) {
                    isCloseRegister();
                    isOpenLogin();
                } else {
                    if (location.pathname === routes.loginPage.path) {
                        closeRegisterModal();
                    } else {
                        navigate(generatePath(`${routes.loginPage.path}?isRegisterSuccess=${true}`), {
                            state: { action: 'login', prevPath: location.pathname },
                        });
                    }
                }
            },
            onError: (res) => {
                dispatch(actions.hideAppLoading());

                if (res?.response?.data?.code == ACCOUNT_ERROR_EMAIL_EXISTS) {
                    form.setFieldError('email', translate.formatMessage(commonValidation.emailValidation));
                }
                if (res?.response?.data?.code == USER_ERROR_PHONE_EXISTS) {
                    form.setFieldError('phone', translate.formatMessage(commonValidation.phoneExitsValidation));
                }
            },
        });
    };
    return {
        executeRegister: onFinish,
        loading,
    };
};

export default useRegister;
