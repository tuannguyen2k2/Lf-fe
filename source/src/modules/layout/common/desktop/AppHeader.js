import React, { useEffect, useState } from 'react';
import styles from './AppHeader.module.scss';
import { useDisclosure } from '@mantine/hooks';
import DefaultComponent from './Header/DefaultComponent';
import ModalForgetPassword from './ModalForgetPassword';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import { useSelector } from 'react-redux';
import { selectHeaderType } from '@selectors/app';
import classNames from 'classnames';
import { Button, Flex, Transition } from '@mantine/core';
import DetailComponent from './Header/DetailComponent';
import { CSSTransition } from 'react-transition-group';
import ModalProfile from './ModalProfile';
import ModalConfirm from './ModalConfirm';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { setCacheAccessToken } from '@services/userService';
import { AppConstants, GROUP_KIND_STUDENT, storageKeys } from '@constants';
import { setData } from '@utils/localStorage';
import { showSucsessMessage } from '@services/notifyService';
import useFetchAction from '@hooks/useFetchAction';
import { accountActions } from '@store/actions';
import ModalFbRegister from '@modules/layout/desktop/landing/Login/ModalFbRegister';
import { useGoogleLogin } from '@react-oauth/google';
import ModalGgRegister from '@modules/layout/desktop/landing/Login/ModalGoogleRegister';
import ModalChangePasswordForgetPassword from './ModalChangePasswordForgetPassword ';
import useQueryParams from '@hooks/useQueryParams';
import { USER_EMAIL_GG_EXISTS, errorMessage } from '@constants/ErrorCode';
import { showErrorMessage, showInfoMessage, showWarningMessage } from '@services/notifyService';
import useTranslate from '@hooks/useTranslate';
const AppHeader = () => {
    const [ openedLogin, { open: openLogin, close: closeLogin } ] = useDisclosure(false);
    const [ openedRegister, { open: openRegister, close: closeRegister } ] = useDisclosure(false);
    const [ openedForgetPassword, { open: openForgetPassword, close: closeForgetPassword } ] = useDisclosure(false);
    const [ openedChangeForgetPassword, { open: openChangeForgetPassword, close: closeChangeForgetPassword } ] =
        useDisclosure(false);
    const [ openedProfile, { open: openProfile, close: closeProfile } ] = useDisclosure(false);
    const { setQueryParams } = useQueryParams();
    const isDefaultHeader = useSelector(selectHeaderType);
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const [ openprofile, setOpenedProfile ] = useState(false);
    const { execute: fbLogin, loading: fbLoginloading } = useFetch(apiConfig.student.LoginFaceBook);
    const [ dataFacebook, setDataFacebook ] = useState({});
    const queryParameters = new URLSearchParams(window.location.search);
    useEffect(() => {
        if (queryParameters.get('isRegisterStudent') === 'true') openRegister();
    }, []);
    const translate = useTranslate();

    const loginFaceBookFunc = (fbres) => {
        fbLogin({
            data: { token: fbres?.accessToken },
            onCompleted: (res) => {
                if (res?.data?.accessToken?.access_token) {
                    setCacheAccessToken(res.data.accessToken.access_token);

                    if (res.data?.accessToken?.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    }
                } else {
                    setDataFacebook(res);
                    setOpenedProfile(true);

                    // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                }
            },
            onError: (res) => {},
        });
    };
    const [ openProfileGG, setOpenedProfileGg ] = useState(false);
    const [ ggData, setGGData ] = useState({});
    const { execute: ggLogin, loading: ggLoginloading } = useFetch(apiConfig.student.loginGoogle);
    const [ idCode, setIdCode ] = useState({});
    const { execute: excuteTokenResponse, loading: tokenLoading } = useFetch(apiConfig.student.oauth2Google);

    const loginGoogleFunc = (ggres) => {
        ggLogin({
            data: { token: ggres?.access_token },
            onCompleted: (res) => {
                setGGData(res.data);
                if (res?.data?.accessToken?.access_token) {
                    setCacheAccessToken(res.data.accessToken.access_token);
                    if (res?.data?.accessToken?.user_kind === GROUP_KIND_STUDENT) {
                        executeGetProfile();
                        setData(storageKeys.USER_KIND, GROUP_KIND_STUDENT);
                        // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                    }
                } else {
                    setOpenedProfileGg(true);
                    // showSucsessMessage(translate.formatMessage(message.loginSuccess));
                }
            },

            onError: (error) => {
                error?.response?.data?.code == USER_EMAIL_GG_EXISTS
                    ? showErrorMessage(translate.formatMessage(errorMessage.USER_EMAIL_GG_EXISTS))
                    : '';
            },
        });
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            excuteTokenResponse({
                params: {
                    client_id: AppConstants.GGClientId,
                    client_secret: AppConstants.GGClienSecret,
                    redirect_uri: AppConstants.GGRedirectURI,
                    grant_type: 'authorization_code',
                    code: tokenResponse.code,
                },
                onError: (res) => {
                    // closeLogin();
                    loginGoogleFunc(res);
                    // loginGoogleFunc()
                },
            });
        },
        flow: 'auth-code',
    });

    const { data: reviewData, execute: executeReviewData } = useFetch(apiConfig.review.myReview, {
        immediate: false,
        mappingData: ({ data }) => {
            return data;
        },
    });

    return (
        <>
            <div id="header" className={classNames(styles.appHeader, !isDefaultHeader && styles.appHeaderDetail)}>
                <Flex align="center" style={{ height: '100%' }}>
                    <CSSTransition
                        in={!isDefaultHeader}
                        // timeout={200}
                        classNames={{
                            enter: styles.detailEnter,
                            enterActive: styles.detailEnterActive,
                            exit: styles.detailExit,
                            exitActive: styles.detailExitActive,
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        <DetailComponent reviewData={reviewData} executeReviewData={executeReviewData} />
                    </CSSTransition>
                    <CSSTransition
                        in={isDefaultHeader}
                        // timeout={200}
                        classNames={{
                            enter: styles.detailEnter,
                            enterActive: styles.detailEnterActive,
                            exit: styles.detailExit,
                            exitActive: styles.detailExitActive,
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        <DefaultComponent openLogin={openLogin} openProfile={openProfile} />
                    </CSSTransition>
                </Flex>
                <ModalProfile opened={openedProfile} close={closeProfile} />
                <ModalLogin
                    opened={openedLogin}
                    close={closeLogin}
                    openRegister={openRegister}
                    loginFaceBookFunc={loginFaceBookFunc}
                    openForgetPassword={openForgetPassword}
                    loginGoogleFunc={loginGoogleFunc}
                    login={login}
                />
                <ModalGgRegister data={ggData} opened={openProfileGG} close={() => setOpenedProfileGg(false)} />
                <ModalRegister
                    opened={openedRegister}
                    close={() => {
                        closeRegister();
                        setQueryParams({
                            isRegisterStudent: false,
                        });
                    }}
                    openLogin={openLogin}
                />
                <ModalForgetPassword
                    opened={openedForgetPassword}
                    close={closeForgetPassword}
                    openChangeForgetPassword={openChangeForgetPassword}
                    openRegister={openRegister}
                    setIdCode={setIdCode}
                    idCode={idCode}
                    openLogin={openLogin}
                />
                <ModalChangePasswordForgetPassword
                    opened={openedChangeForgetPassword}
                    close={closeChangeForgetPassword}
                    openLogin={openLogin}
                    openRegister={openRegister}
                    idCode={idCode}
                />
                <ModalFbRegister
                    opened={openprofile}
                    close={() => setOpenedProfile(false)}
                    dataFacebook={dataFacebook}
                />
            </div>
        </>
    );
};

export default AppHeader;
