import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import { ReactComponent as Copy } from '@assets/icons/copy.svg';
import avatar from '@assets/images/avatar_profile.png';
import { Avatar, Box, Divider, Group, Menu, Text } from '@mantine/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import configPages from '@constants/menuConfig';
import useAuth from '@hooks/useAuth';
import useTranslate from '@hooks/useTranslate';
import { removeCacheToken } from '@services/userService';
import { accountActions } from '@store/actions';

import { modals } from '@mantine/modals';
import { getData } from '@utils/localStorage';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { copyToClipboard } from '@utils';

import Typo from '@components/common/elements/Typo';
import { AppConstants, GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, storageKeys } from '@constants';
const message = defineMessages({
    study: 'Việc học của tôi',
    teach: 'Dạy học trên Life Uni',
    membership: 'Hội viên',
    setting: 'Cài đặt tài khoản',
    lang: 'Ngôn ngữ',
    logout: 'Đăng xuất',
    copy: 'Sao chép mã giới thiệu',
});

const ProfileDropDown = ({ openLogin, openProfile }) => {
    const translate = useTranslate();
    const { profile } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
        navigate('/');
    };

    const isSeller = profile?.isSeller;
    const kindUser = getData(storageKeys.USER_KIND);

    const LogoutConfirm = () => {
        modals.openConfirmModal({
            title: (
                <Typo
                    size="primary"
                    type="semi-bold"
                    style={{
                        color: 'var(--primary-color)',
                        paddingTop: '10px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                    }}
                >
                    <FormattedMessage defaultMessage={'Xác nhận đăng xuất'} />
                </Typo>
            ),
            children: (
                <Typo
                    size="sub"
                    style={{
                        paddingTop: '10px',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingBottom: '10px',
                    }}
                >
                    <FormattedMessage defaultMessage={'Bạn có muốn đăng xuất'} />
                </Typo>
            ),
            size: '27vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Đăng xuất', cancel: 'Hủy' },
            onConfirm: () => onLogout(),
        });
    };
    return (
        <div>
            <Menu trigger="hover" openDelay={100} closeDelay={400} width={300} shadow="md">
                <Menu.Target>
                    <div>
                        <Avatar
                            src={
                                profile?.account?.avatar?.includes('https') || profile?.account?.avatar == undefined
                                    ? avatar
                                    : AppConstants.contentRootUrl + profile?.account?.avatar
                            }
                            size={37}
                            style={{
                                borderRadius: '50%',
                                border: '1px solid #00acc1',
                                // boxShadow: '0px 0px 5px 0px #00acc1',
                            }}
                        />
                    </div>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Link to="/profile">
                            <Box style={{ padding: '10px 0px' }}>
                                <Group>
                                    <Avatar
                                        src={
                                            profile?.account?.avatar?.includes('https') ||
                                            profile?.account?.avatar == undefined
                                                ? avatar
                                                : AppConstants.contentRootUrl + profile?.account?.avatar
                                        }
                                        size={40}
                                        style={{
                                            borderRadius: '50%',
                                            border: '1px solid #00acc1',
                                            // boxShadow: '0px 0px 5px 0px #00acc1',
                                        }}
                                    />

                                    <Box w={'200px'}>
                                        <Text
                                            lineClamp={1}
                                            size={'var(--primary-font-size)'}
                                            fw={'var(--font-bold)'}
                                            c="var(--primary-color)"
                                        >
                                            {profile?.account?.fullName}
                                        </Text>

                                        <Text c="dimmed" size={'var(--sub-font-size)'} mt={10} lineClamp={1}>
                                            {profile?.account?.email}
                                        </Text>
                                    </Box>
                                </Group>
                            </Box>
                        </Link>
                    </Menu.Item>
                    <Divider />

                    {configPages.map((item, index) => {
                        if (
                            (isSeller && item?.access?.includes(GROUP_KIND_SELLER) && item?.key != 'notification') ||
                            (!isSeller &&
                                kindUser == GROUP_KIND_STUDENT &&
                                item?.access?.includes(GROUP_KIND_STUDENT) &&
                                item?.key != 'notification') ||
                            (kindUser == GROUP_KIND_EXPERT &&
                                item?.access.includes(GROUP_KIND_EXPERT) &&
                                item?.key != 'notification')
                        )
                            return (
                                <div key={index}>
                                    <Menu.Item>
                                        <Link to={`/profile?content=${item.key}`}>
                                            <Box style={{ padding: '5px 5px 5px 5px', height: 40 }}>
                                                <Group align="center" justify="start">
                                                    <Box w={20}>
                                                        <Group c="var(--text-color)">{item.icon}</Group>
                                                    </Box>

                                                    <Text size="var(--sub-font-size)" fw={'var(--font-normal)'}>
                                                        {item.title}
                                                    </Text>
                                                </Group>
                                            </Box>
                                        </Link>
                                    </Menu.Item>

                                    <Divider />
                                </div>
                            );
                    })}
                    {isSeller && (
                        <Menu.Item>
                            <Box
                                style={{ padding: '5px 5px 5px 5px', height: 40 }}
                                onClick={() =>
                                    copyToClipboard(
                                        window.location.origin +
                                            `?refCode=${profile?.referralCode}&isRegisterStudent=true`,
                                    )
                                }
                            >
                                <Group align="center" gap="1px">
                                    <Box w={35} h={30}>
                                        <Group w={30} h={15} c="var(--text-color)">
                                            <Copy />
                                        </Group>
                                    </Box>
                                    <Text size="var(--sub-font-size)" fw={'var(--font-normal)'}>
                                        {translate.formatMessage(message.copy)}
                                    </Text>
                                </Group>
                            </Box>
                        </Menu.Item>
                    )}
                    <Divider />
                    <Menu.Item>
                        <Box style={{ padding: '5px 5px 5px 5px', height: 40 }} onClick={() => LogoutConfirm()}>
                            <Group align="center" gap="1px">
                                <Box w={35} h={30}>
                                    <Group w={27} h={15} c="var(--text-color)">
                                        <Exit />
                                    </Group>
                                </Box>
                                <Text size="var(--sub-font-size)" fw={'var(--font-normal)'}>
                                    {translate.formatMessage(message.logout)}
                                </Text>
                            </Group>
                        </Box>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default ProfileDropDown;
