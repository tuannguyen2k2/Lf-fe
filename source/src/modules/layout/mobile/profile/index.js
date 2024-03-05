import { ReactComponent as Arrow } from '@assets/icons/arowright.svg';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import { ReactComponent as Language } from '@assets/icons/lang.svg';
import avatar from '@assets/images/avatar_profile.png';
import bannerProfile from '@assets/images/bannerProfile.png';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { AppConstants, GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, storageKeys } from '@constants';
import configPages from '@constants/menuConfig';
import useAuth from '@hooks/useAuth';
import { Box, Flex, Grid, Image } from '@mantine/core';
import { modals } from '@mantine/modals';
import routes from '@routes';
import { removeCacheToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { getData } from '@utils/localStorage';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import CourseInfoMobile from './Course/index';
import InfoProfile from './Info';
import styles from './index.module.scss';
import NotificationMobile from './Notification';

const ProfileMobileComponent = ({ myCourse }) => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const content = queryParameters.get('content');
    const isSeller = profile?.isSeller;
    const kindUser = getData(storageKeys.USER_KIND);
    const [ active, setActive ] = useState(configPages[0].key);
    const dispatch = useDispatch();
    const profileComponent = (content) => {
        if (content === 'info') {
            return <InfoProfile />;
        } else if (content === 'course-learn') {
            return <CourseInfoMobile myCourse={myCourse} />;
        } else if (content === 'change') {
            return <ChangePassword />;
        } else if (content === 'notification') {
            return <NotificationMobile />;
        }
    };
    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
    };
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
    return (
        <Container>
            {content === null ? (
                <Flex direction="column">
                    <Image src={bannerProfile} style={{ margin: '0 -18px', width: 'calc(100% + 36px)' }} />
                    <div className={styles.iconClose}>
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
                    <Box style={{ position: 'relative' }}>
                        <Grid className={styles.infoGroup}>
                            <Grid.Col span={12}>
                                <div
                                    className={styles.infoItem}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(generatePath(routes.profilePage.path) + `?content=info`, {
                                            state: {
                                                action: 'home',
                                                prevPath: location.pathname,
                                            },
                                        });
                                    }}
                                >
                                    <div className={styles.infoItemName}>
                                        <Image
                                            src={
                                                profile?.account?.avatar?.includes('https') ||
                                                profile?.account?.avatar == undefined
                                                    ? avatar
                                                    : AppConstants.contentRootUrl + profile?.account?.avatar
                                            }
                                            w={50}
                                            style={{
                                                borderRadius: '50%',
                                                border: '1px solid #00acc1',
                                            }}
                                        />
                                        <div>
                                            <Typo
                                                size="primary"
                                                type="semi-bold"
                                                style={{ color: 'var(--title-color)' }}
                                            >
                                                {profile?.account?.fullName}
                                            </Typo>
                                            <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                                                {profile?.account?.email}
                                            </Typo>
                                        </div>
                                    </div>
                                    <Arrow />
                                </div>
                            </Grid.Col>
                        </Grid>
                        <Grid className={styles.navbarMain}>
                            <Grid.Col span={12}>
                                {configPages.map((item, index) => {
                                    if (
                                        (isSeller && item?.access?.includes(GROUP_KIND_SELLER)) ||
                                        (!isSeller &&
                                            kindUser == GROUP_KIND_STUDENT &&
                                            item?.access?.includes(GROUP_KIND_STUDENT)) ||
                                        (kindUser == GROUP_KIND_EXPERT && item?.access.includes(GROUP_KIND_EXPERT))
                                    )
                                        return (
                                            <div key={index} className={`${styles.item}`}>
                                                <div
                                                    className={styles.item}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(
                                                            generatePath(routes.profilePage.path) +
                                                                `?content=${item?.key}`,
                                                            {
                                                                state: {
                                                                    action: 'home',
                                                                    prevPath: location.pathname,
                                                                },
                                                            },
                                                        );
                                                    }}
                                                >
                                                    <div className={styles.typo}>
                                                        <div className={styles.titleItem}>
                                                            {item.icon}
                                                            <div> {item.title}</div>
                                                        </div>
                                                        <Arrow />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                })}

                                {/* <div
                                    key={'language'}
                                    className={`${styles.item} ${active === 'logout' ? styles.activeItem : ''}`}
                                >
                                    <div className={styles.item}>
                                        <div className={styles.typo}>
                                            <div className={styles.titleItem}>
                                                <Language />
                                                <div>
                                                    <FormattedMessage defaultMessage="Ngôn ngữ" />
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: '20px',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typo
                                                    size="primary"
                                                    type="nomal"
                                                    style={{ color: 'var(--title-color)' }}
                                                >
                                                    <FormattedMessage defaultMessage="Tiếng việt" />
                                                </Typo>
                                                <Arrow />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div
                                    key={'logout'}
                                    className={`${styles.item} ${active === 'logout' ? styles.activeItem : ''}`}
                                >
                                    <div className={styles.itemLogout} onClick={() => LogoutConfirm()}>
                                        <div className={styles.typo}>
                                            <div className={styles.titleItem}>
                                                <Exit />
                                                <div>
                                                    <FormattedMessage defaultMessage="Đăng xuất" />
                                                </div>
                                            </div>

                                            <Arrow />
                                        </div>
                                    </div>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Box>
                </Flex>
            ) : (
                profileComponent(content)
            )}
        </Container>
    );
};

export default ProfileMobileComponent;
