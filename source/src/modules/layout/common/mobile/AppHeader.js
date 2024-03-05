import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import avatar from '@assets/images/avatar_profile.png';
import logo from '@assets/images/icon_logo.png';
import Typo from '@components/common/elements/Typo';
import configPages from '@constants/menuConfig';
import useAuth from '@hooks/useAuth';
import { Avatar, Box, Divider, Group, Indicator, Text, Grid, Flex, Center } from '@mantine/core';
import { modals } from '@mantine/modals';
import { accountActions } from '@store/actions';
import { IconMenu2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.scss';
import NavDrawer from './NavDrawer';
import { ReactComponent as Login } from '@assets/icons/login.svg';
import { ReactComponent as Signup } from '@assets/icons/reg.svg';

import { ReactComponent as Cart } from '@assets/icons/carIcon.svg';
import { ReactComponent as Search } from '@assets/icons/search.svg';

import { AppConstants, GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, storageKeys } from '@constants';
import { removeCacheToken } from '@services/userService';
import { getData } from '@utils/localStorage';
import { Button } from '@mantine/core';
import { defineMessages, useIntl } from 'react-intl';
import { Modal } from '@mantine/core';
import useDisclosure from '@hooks/useDisclosure';
import RegisterMobileComponent from '@modules/layout/mobile/login/Register';
import { useEffect } from 'react';
import useQueryParams from '@hooks/useQueryParams';
import useTranslate from '@hooks/useTranslate';
import { copyToClipboard } from '@utils';
import { ReactComponent as Copy } from '@assets/icons/copy.svg';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
const message = defineMessages({
    login: 'Đăng nhập',
    signUp: 'Đăng ký',
    logout: 'Đăng xuất',
    copy: 'Sao chép mã giới thiệu',
});
const AppHeader = () => {
    const intl = useIntl();

    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { profile } = useAuth();
    const dispatch = useDispatch();

    const location = useLocation();
    const isSeller = profile?.isSeller;
    const kindUser = getData(storageKeys.USER_KIND);
    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
        setOpen(false);
        navigate('/');
    };
    const { setQueryParams } = useQueryParams();

    const queryParameters = new URLSearchParams(window.location.search);
    const translate = useTranslate();

    const [ openedRegsiter, { open: openRegsiter, close: closeRegsiter } ] = useDisclosure(false);
    const [ openedSearch, { open: openSearch, close: closeSearch } ] = useDisclosure(false);

    useEffect(() => {
        if (queryParameters.get('isRegisterStudent') === 'true') openRegsiter();
    }, []);
    const numberCart = useSelector((state) => state.cart.cart);
    const LogoutConfirm = () => {
        modals.openConfirmModal({
            title: (
                <Typo size="small" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Đăng xuất'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn muốn đăng xuất khỏi tài khoản này?'} />
                </Typo>
            ),
            size: '80vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Đăng xuất', cancel: 'Hủy' },
            onConfirm: () => onLogout(),
        });
    };

    const handleOpenRegster = () => {
        openRegsiter();
        setOpen(false);
    };

    const [ isTopZero, setIsTopZero ] = useState(true);

    const changeTopValue = () => {
        if (!isTopZero) {
            closeSearch();
        }
        const wrapper = document.getElementById('search-bar');
        if (wrapper) {
            wrapper.style.transition = 'top 0.3s ease';
            wrapper.style.top = isTopZero ? '75px' : '0';
            setIsTopZero(!isTopZero);
        }
    };
    return (
        <div className={classNames(styles.appHeader, styles.appHeaderMobile)} id="">
            <Flex justify="space-between" align={'center'} wrap="no-wrap" bg={'#fff'}>
                <Box w="20%" lh={1} pl={14}>
                    <IconMenu2
                        size={35}
                        style={{ cursor: 'pointer' }}
                        className={styles.hamburger}
                        alt=""
                        onClick={() => setOpen(true)}
                        color="var(--primary-color)"
                    />
                </Box>
                <Flex justify={'center'} w="60%">
                    <Link to="/">
                        <img src={logo} alt="" style={{ width: '100%' }} />
                    </Link>
                </Flex>
                <Flex justify="end" w="20%" pr={18} wrap="no-wrap" gap={10}>
                    <div onClick={changeTopValue}>
                        <Search width="27px" height="25px" />
                    </div>
                    {/* <Link to="/cart" width="4px" height="25px">
                        <Cart width="27px" height="25px" color={'var(--primary-color)'} />
                    </Link> */}
                    <Indicator
                        inline
                        label={
                            <Text size={10} c={numberCart?.length > 0 ? 'white' : 'var(--primary-color)'}>
                                {numberCart?.length}
                            </Text>
                        }
                        size={16}
                        // color="#D9D9D9"
                        color={numberCart?.length > 0 ? 'red' : '#D9D9D9'}
                    >
                        <Link to="/cart" width="4px" height="25px">
                            <Cart
                                width="27px"
                                height="25px"
                                color={numberCart?.length > 0 ? 'var(--primary-color)' : '#9C9C9C'}
                            />
                        </Link>
                    </Indicator>
                </Flex>
            </Flex>
            <SearchBar
                id="search-bar"
                openedSearch={openedSearch}
                openSearch={openSearch}
                closeSearch={closeSearch}
                className={styles.wrapperSearch}
            />

            <NavDrawer open={open} onClose={() => setOpen(false)} headerTitle="Menu">
                <ul className={styles.nav}>
                    {profile ? (
                        <>
                            <Link to="/profile">
                                <Box px={10} py={10} style={{ borderBottom: '1.2px solid #e3e3e3' }}>
                                    <Group gap={22}>
                                        <Avatar
                                            src={
                                                profile?.account?.avatar?.includes('https') ||
                                                profile?.account?.avatar == undefined
                                                    ? avatar
                                                    : AppConstants.contentRootUrl + profile?.account?.avatar
                                            }
                                            // radius="lg"
                                            size={50}
                                            style={{
                                                borderRadius: '50%',
                                                border: '1px solid #00acc1',
                                                // boxShadow: '0px 0px 5px 0px #00acc1',
                                            }}
                                        />

                                        <div>
                                            <Text
                                                size={'var(--primary-font-size)'}
                                                fw={'var(--font-bold)'}
                                                c="var(--primary-color)"
                                            >
                                                {profile?.account?.fullName}
                                            </Text>

                                            <Text c="dimmed" size={'var(--sub-font-size)'} mt={5}>
                                                {profile?.account?.email}
                                            </Text>
                                        </div>
                                    </Group>
                                </Box>
                            </Link>

                            {configPages.map((item, index) => {
                                if (
                                    (isSeller && item?.access?.includes(GROUP_KIND_SELLER)) ||
                                    (!isSeller &&
                                        kindUser == GROUP_KIND_STUDENT &&
                                        item?.access?.includes(GROUP_KIND_STUDENT)) ||
                                    (kindUser == GROUP_KIND_EXPERT && item?.access.includes(GROUP_KIND_EXPERT))
                                )
                                    return (
                                        <div>
                                            <Link to={`/profile?content=${item.key}`}>
                                                <Box px={20} py={10} style={{ borderBottom: '1.2px solid #e3e3e3' }}>
                                                    <Group align="center">
                                                        <Group h={40} c="var(--content-color)">
                                                            <i className={styles.iconMenu}>{item.icon}</i>
                                                        </Group>
                                                        <Text
                                                            size="var(--primary-font-size)"
                                                            c={'var(--content-color)'}
                                                        >
                                                            {item.title}
                                                        </Text>
                                                    </Group>
                                                </Box>
                                                {/* <Divider /> */}
                                            </Link>
                                        </div>
                                    );
                            })}
                            {isSeller && (
                                <Box
                                    px={20}
                                    py={10}
                                    onClick={() =>
                                        copyToClipboard(
                                            window.location.origin +
                                                `?refCode=${profile?.referralCode}&isRegisterStudent=true`,
                                        )
                                    }
                                    style={{ borderBottom: '1.2px solid #e3e3e3', cursor: 'pointer' }}
                                >
                                    <Group align="center">
                                        <Group align="center" h={40} color="var(--text-color)">
                                            <i className={styles.iconMenu}>
                                                <Copy color="var(--text-color)" />
                                            </i>
                                        </Group>
                                        <Text size="var(--primary-font-size)" c={'var(--content-color)'}>
                                            {intl.formatMessage(message.copy)}
                                        </Text>
                                    </Group>
                                </Box>
                            )}

                            <Box px={20} py={10} onClick={() => LogoutConfirm()} style={{ cursor: 'pointer' }}>
                                <Group align="center">
                                    <Group align="center" h={40} color="var(--text-color)">
                                        <i className={styles.iconMenu}>
                                            <Exit color="var(--text-color)" />
                                        </i>
                                    </Group>
                                    <Text size="var(--primary-font-size)" c={'var(--content-color)'}>
                                        {intl.formatMessage(message.logout)}
                                    </Text>
                                </Group>
                            </Box>
                        </>
                    ) : (
                        <>
                            {location.pathname !== '/login' && (
                                <Box>
                                    <Link to="/login">
                                        <Box px={20} py={20}>
                                            <Group align="center">
                                                <Login color="var(--text-color)" />
                                                <Text size="var(--primary-font-size)" c={'var(--content-color)'}>
                                                    {intl.formatMessage(message.login)}
                                                </Text>
                                            </Group>
                                        </Box>
                                    </Link>
                                    <Divider />

                                    <Box px={20} py={20} onClick={() => handleOpenRegster()}>
                                        <Group align="center">
                                            <Signup color="var(--text-color)" />
                                            <Text size="var(--primary-font-size)" c={'var(--content-color)'}>
                                                {intl.formatMessage(message.signUp)}
                                            </Text>
                                        </Group>
                                    </Box>
                                </Box>
                            )}
                        </>
                    )}
                </ul>
            </NavDrawer>
            <Modal
                opened={openedRegsiter}
                onClose={() => {
                    closeRegsiter();
                    setQueryParams({});
                }}
                withCloseButton={false}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                zIndex={300}
                styles={{
                    title: {
                        fontSize: 'var(--h1-font-size)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--title-color)',
                        marginLeft: '130px',
                    },
                    header: {
                        paddingTop: '20px',
                        paddingBottom: 0,
                        paddingRight: '15px',
                    },
                    body: {
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
            >
                <RegisterMobileComponent closeRegsiter={closeRegsiter} />
            </Modal>
        </div>
    );
};

export default AppHeader;
