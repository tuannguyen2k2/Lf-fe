import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import UploadCamera from '@assets/icons/cameraUpload.svg';
import avatar from '@assets/images/avatar_profile.png';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { AppConstants, GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, storageKeys } from '@constants';
import configPages from '@constants/menuConfig';
import useAuth from '@hooks/useAuth';
import useTranslate from '@hooks/useTranslate';
import { Avatar, Box, Flex, Indicator, ThemeIcon } from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';
import { getData } from '@utils/localStorage';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import InfoProfile from './Info';
import styles from './index.module.scss';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { removeCacheToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CourseInfo from './Course';
import Revenue from './Revenue';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from '@routes';
import HistorySeller from './HistorySeller';
import CourseSelling from './CourseSelling';
import { IconReplace } from '@tabler/icons-react';
import ChangePassword from './ChangePassword';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import CropImageLink from '@components/common/elements/CropImage';
import { toast } from 'react-toastify';
/*
	auth
		+ null: access seller and not student
		+ true: access seller only
		+ false: access student only
*/

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
    oldPassword: 'Mật khẩu cũ',
    success: 'Thành công',
    updateSuccess: 'Cập nhật thành công',
    district: 'Quận/Huyện',
    ward: 'Phường/Xã',
    birthday: 'Ngày sinh',
    updateProfile: 'Chỉnh sửa hồ sơ',
});

const ProfileComponent = ({ myCourse }) => {
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const content = queryParameters.get('content');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ active, setActive ] = useState(content ? content : configPages[0].key);
    const { profile } = useAuth();
    const isSeller = profile?.isSeller;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { execute: executeUpdateProfileStudent, loading: loadingStudent } = useFetch({
        ...apiConfig.student.updateProfile,
    });
    const [ avatarImage, setAvatar ] = useState();
    const kindUser = getData(storageKeys.USER_KIND);
    // const ContentComponent = configPages.find((item) => item.key === active)?.component || InfoProfile;
    const Title = configPages.find((item) => item.key === active)?.title || InfoProfile;
    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
    };
    const LogoutConfirm = () => {
        modals.openConfirmModal({
            title: (
                <Typo size="primary" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Đăng xuất'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn muốn đăng xuất khỏi tài khoản này?'} />
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
    const profileComponent = (content) => {
        if (content === 'info') {
            return <InfoProfile avatarPath={avatarImage} />;
        } else if (content === 'course-learn') {
            return <CourseInfo myCourse={myCourse} />;
        } else if (content === 'change') {
            return <ChangePassword />;
        } else if (content === 'course-sell') {
            return <CourseSelling />;
        } else if (content === 'HistorySeller') {
            return <HistorySeller />;
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
                    setActive(configPages[0].key);
                    navigateProfile({
                        key: 'info',
                    });
                }
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const navigateProfile = (item) => {
        navigate(generatePath(routes.profilePage.path) + `?content=${item?.key}`, {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };

    return (
        <Container styles={{ width: '1350px' }}>
            <Flex className={styles.profile}>
                <div>
                    <Flex px={40} py={33} align="center" direction="column" w={300}>
                        <CropImageLink
                            id="image-uploader"
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
                        {/* <Indicator
                            size={45}
                            offset={25}
                            position="bottom-end"
                            zIndex={'1'}
                            label={
                                <ThemeIcon radius="xl" size={30}>
                                    <IconCamera />
                                </ThemeIcon>
                            }
                            withBorder
                            mb={20}
                        >
                            
                        </Indicator> */}
                        <Typo type="semi-bold" size="primary">
                            {profile?.account?.fullName}
                        </Typo>
                    </Flex>
                    <div className={styles.navbarMain}>
                        {configPages.map((item, index) => {
                            if (
                                (isSeller &&
                                    item?.access?.includes(GROUP_KIND_SELLER) &&
                                    item?.key != 'notification') ||
                                (!isSeller &&
                                    kindUser == GROUP_KIND_STUDENT &&
                                    item?.access?.includes(GROUP_KIND_STUDENT) &&
                                    item?.key != 'notification') ||
                                (kindUser == GROUP_KIND_EXPERT &&
                                    item?.access.includes(GROUP_KIND_EXPERT) &&
                                    item?.key != 'notification')
                            )
                                return (
                                    <div
                                        key={index}
                                        // onClick={() => setActive(item.key)}
                                        onClick={(e) => {
                                            setActive(item.key);
                                            e.stopPropagation();
                                            navigateProfile(item);
                                        }}
                                        className={`${styles.item} ${active === item.key ? styles.activeItem : ''}`}
                                    >
                                        {/* <item.icon classNae={styles.linkIcon} stroke={1.5} /> */}
                                        <div className={styles.item}>
                                            <div className={styles.typo}>
                                                <Box w={'40px'}>
                                                    <Group align="center" w={40} h={40}>
                                                        {item.icon}
                                                    </Group>
                                                </Box>
                                                <div> {item.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                        })}

                        <div
                            key={'logout'}
                            onClick={() => setActive('logout')}
                            className={`${styles.item} ${active === 'logout' ? styles.activeItem : ''}`}
                        >
                            {/* <item.icon classNae={styles.linkIcon} stroke={1.5} /> */}
                            <div className={styles.item} onClick={() => LogoutConfirm()}>
                                <div className={styles.typo}>
                                    <Box w={'40px'}>
                                        <Group align="center" w={40} h={40}>
                                            <Exit />
                                        </Group>
                                    </Box>

                                    <div>
                                        <FormattedMessage defaultMessage="Đăng xuất" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <Typo type="semi-bold" size="small" className={styles.title}>
                        {Title}
                    </Typo>
                    <Flex justify={'center'}>
                        {content === null ? <InfoProfile /> : profileComponent(content)}
                        {/* <ContentComponent /> */}
                    </Flex>
                </div>
            </Flex>
        </Container>
    );
};

export default ProfileComponent;
