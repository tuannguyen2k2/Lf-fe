import Container from '@components/common/elements/Container';
import React from 'react';
import logo from '@assets/images/icon_logo.png';
import styles from '../AppHeader.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import search from '@assets/images/searching_icon.png';
import order from '@assets/images/order_icon.png';
import planet from '@assets/icons/planet.svg';
import { ReactComponent as Notification } from '@assets/icons/notification.svg';
import ProfileDropDown from '../ProfileDropDown';
import { ActionIcon, Button, Flex, Input, Tooltip } from '@mantine/core';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import useAuth from '@hooks/useAuth';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { scrollToID } from '@utils';
import { IconBellFilled, IconSearch } from '@tabler/icons-react';
import NotificationDropDown from '../NotificationDropDown';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { Link as LinkScroll } from 'react-scroll';

import { Indicator, Text } from '@mantine/core';
import { ReactComponent as Cart } from '@assets/icons/carIcon.svg';
import { useSelector } from 'react-redux';
import { selectedNotificationSelector } from '@selectors/app';
import { useForm } from '@mantine/form';
import classNames from 'classnames';
const navs = [
    { title: 'Khoá học', to: 'course' },
    { title: 'Thể loại', to: 'detail' },

    { title: 'Chuyên gia', to: 'expert' },
    { title: 'Giới thiệu', to: 'about' },
];
const message = defineMessages({
    expertLogin: ' Đăng nhập',
    studentLogin: 'Student Login',
    inputSearch: 'Nhập từ khoá...',
});

const DefaultComponent = ({ openLogin, style, openProfile, openConfirm }) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const query = queryParameters.get('query');
    const translate = useTranslate();
    const { isAuthenticated } = useAuth();
    const numberCart = useSelector((state) => state.cart.cart);
    const navigate = useNavigate();
    // Notification
    const path = window.location.pathname;
    const notification = useSelector(selectedNotificationSelector);
    const {
        data: dataMyNotification,
        execute: executeGetDataMyNotification,
        loading: loadingDataMyNotification,
    } = useFetch(apiConfig.notification.myNotification, {
        immediate: false,
        mappingData: ({ data }) => {
            const pageTotal = data?.totalPages;
            const unReadTotal = data?.totalUnread;
            const listNotification = data?.content?.map((item) => {
                const msg = JSON.parse(item?.msg);
                return {
                    id: item?.id,
                    kind: item?.kind,
                    createdDate: item?.createdDate,
                    state: item?.state,
                    projectId: msg?.projectId,
                    taskName: msg?.taskName,
                    projectName: msg?.projectName,
                    courseId: msg?.courseId,
                    lectureName: msg?.lectureName,
                    courseName: msg?.courseName,
                };
            });
            return {
                pageTotal,
                unReadTotal,
                listNotification,
            };
        },
    });
    const { execute: executeUpdateState } = useFetch(apiConfig.notification.changeState, {
        immediate: false,
    });
    const scrollToTop = () => {
        // Using window.scrollTo for smooth scrolling to the top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isHomePage = path === '/';

    const handleLogoClick = () => {
        if (isHomePage) {
            scrollToTop();
        } else {
            // If not on the home page, navigate back to the home page
            navigate('/');
        }
    };
    const form = useForm({
        initialValues: {
            searchValue: query || '',
        },
        validate: {},
    });
    const handleSubmit = (values) => {
        try {
            navigate(`/search?query=${values?.searchValue}`);
        } catch (error) {
            console.error('Search error:', error);
        }
    };
    return (
        <div className={classNames(styles.headerContainer, 'container-fluid')}>
            <Flex align="center" gap={100}>
                <div className={styles.headerLogo}>
                    <img src={logo} alt="" style={{ width: '120%' }} onClick={handleLogoClick} />
                </div>
                {path == '/' && (
                    <div className={styles.headerNavigation}>
                        <ul className={styles.nav}>
                            {navs.map((item, index) => (
                                <li key={index} className={location.pathname === item.to && styles.active}>
                                    <LinkScroll
                                        to={item.to}
                                        activeClass="active"
                                        offset={-100}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                    >
                                        {item.title}
                                    </LinkScroll>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Flex>

            <div className={styles.headerIcon}>
                <li className={styles.search}>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className={styles.searchForm}>
                        <Input
                            {...form.getInputProps('searchValue')}
                            leftSectionPointerEvents="all"
                            leftSection={
                                <ActionIcon variant="transparent" type="submit">
                                    <IconSearch />
                                </ActionIcon>
                            }
                            radius="lg"
                            placeholder={translate.formatMessage(message.inputSearch)}
                        />
                    </form>
                </li>
                <li style={{ paddingTop: '5px' }}>
                    {/* <Link to="/cart">
                        <img src={order} alt="" />
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
                                width="30px"
                                height="25px"
                                color={numberCart?.length > 0 ? 'var(--primary-color)' : '#9C9C9C'}
                            />
                        </Link>
                    </Indicator>
                </li>
                {isAuthenticated ? (
                    <>
                        <li style={{ paddingTop: '5px' }}>
                            <NotificationDropDown
                                data={
                                    dataMyNotification
                                        ? dataMyNotification?.listNotification
                                        : notification?.listNotification
                                }
                                executeGetData={executeGetDataMyNotification}
                                executeUpdateState={executeUpdateState}
                                loading={loadingDataMyNotification}
                                unReadTotal={
                                    dataMyNotification ? dataMyNotification?.unReadTotal : notification?.unReadTotal
                                }
                                pageTotal={dataMyNotification ? dataMyNotification?.pageTotal : notification?.pageTotal}
                            />
                        </li>
                    </>
                ) : null}

                {isAuthenticated ? (
                    <li style={{ paddingRight: 10 }}>
                        <ProfileDropDown openLogin={openLogin} />
                    </li>
                ) : (
                    <>
                        <li>
                            <Button variant="outline" size="md" onClick={openLogin} px={40}>
                                {translate.formatMessage(message.expertLogin)}
                            </Button>
                        </li>
                        {/* <li style={{ paddingTop: '5px' }}>
                            <Link to="/">
                                <img src={planet} alt="" />
                            </Link>
                        </li> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default DefaultComponent;
