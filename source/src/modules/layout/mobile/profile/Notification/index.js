import React from 'react';
import { Tabs, Button, Group, Box, Flex, Text } from '@mantine/core';
import styles from './index.module.scss';
import ItemNotificatin from './ItemNoti';
import Healing from '@components/common/elements/Healing';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import { generatePath, useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import AppHeader from '@modules/layout/common/mobile/AppHeader';
import AppFooterMobile from '@modules/layout/common/mobile/Footer/appFooterMobile';
import { ReactComponent as Trash } from '@assets/icons/trash.svg';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { useState } from 'react';
import { useEffect } from 'react';
import { NOTIFICATION_APPROVE_EXPERT, NOTIFICATION_SING_UP_STUDENT, storageKeys } from '@constants';
import { modals } from '@mantine/modals';
import { Center } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
const message = defineMessages({
    notification: 'Thông báo ',
    freeCourse: 'Khóa học miễn phí',
    feeCourse: 'Khóa học đã mua',
    NotMessages: 'Chưa có thông báo',
});

const NotificationMobile = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const {
        data: data,
        execute: executeGetData,
        loading: loadingDataMyNotification,
    } = useFetch(apiConfig.notification.myNotification, {
        immediate: true,
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

    const [ activeButtonAll, setActiveButtonAll ] = useState(true);
    const [ activeIcon, setActiveIcon ] = useState(false);

    const [ dataNotification, setDataNotification ] = useState([]);
    const [ isLoadMore, setIsLoadMore ] = useState(false);
    let [ countLoadMore, setCountLoadMore ] = useState(1);
    const [ hiddenItems, setHiddenItems ] = useState([]);
    const [ deleteAll, setDeleteAll ] = useState(false);
    const [ readAll, setReadAll ] = useState(false);
    const [ dataNotificationUnRead, setDataNotificationUnRead ] = useState([]);
    const [ hasNotification, setHasNotification ] = useState(false);

    const hostPath = window.location.host;

    const { execute: executeReadAll } = useFetch(apiConfig.notification.readAll, {
        immediate: false,
    });
    const { execute: executeDeleteAll } = useFetch(apiConfig.notification.deleteAll, {
        immediate: false,
    });
    const { execute: executeUpdateState } = useFetch(apiConfig.notification.changeState, {
        immediate: false,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const hasNotificationLocalStr = JSON.parse(localStorage.getItem(storageKeys.HAS_NOTIFICATION));
            if (hasNotificationLocalStr && !hasNotification) {
                setHasNotification(true);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isLoadMore && data) {
            setDataNotification([ ...dataNotification, ...data ]);
        } else {
            setDataNotification(data);
        }
    }, [ data ]);
    // useEffect(() => {
    //     setDataNotificationUnRead(dataNotification?.filter((item) => item.state == 0));
    // }, [ dataNotification ]);
    useEffect(() => {
        if (activeButtonAll) {
            executeGetData();
        } else {
            executeGetData({
                params: { state: 0 },
            });
        }
        setReadAll(false);
        setDeleteAll(false);
        localStorage.setItem(storageKeys.HAS_NOTIFICATION, false);
        setHasNotification(false);

        // setHiddenItems([]);
    }, [ activeIcon ]);

    useEffect(() => {
        if (activeButtonAll) {
            executeGetData();
        } else {
            executeGetData({
                params: { state: 0 },
            });
        }

        setIsLoadMore(false);
        setCountLoadMore(1);
        setHiddenItems([]);
    }, [ activeButtonAll ]);

    const handleOnClickChecked = (id) => {
        executeUpdateState({
            data: { id },
        });

        if (hiddenItems?.length == dataNotificationUnRead?.length - 1) {
            setReadAll(true);
        }
        setHiddenItems([ ...hiddenItems, id ]);
    };

    const handleLoadMore = () => {
        setIsLoadMore(true);
        if (!activeButtonAll) {
            executeGetData({
                params: { state: 0, page: countLoadMore },
            });
        } else {
            executeGetData({
                params: { page: countLoadMore },
            });
        }
        setCountLoadMore((countLoadMore += 1));
    };
    const handleReadAll = () => {
        executeReadAll();
        setReadAll(true);
    };

    const handleDeleteAll = () => {
        modals.openConfirmModal({
            title: (
                <Typo size="primary" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Xác nhận'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn có muốn xóa hết thông báo?'} />
                </Typo>
            ),
            size: '80vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Xác nhận', cancel: 'Hủy' },
            onConfirm: () => {
                executeDeleteAll();
                setDeleteAll(true);
            },
        });
    };
    const handleClickItem = (item) => {
        const kind = item?.kind;
        executeUpdateState({
            data: { id: item?.id },
        });
        if (hiddenItems?.length == dataNotificationUnRead?.length - 1) {
            setReadAll(true);
        }
        setHiddenItems([ ...hiddenItems, item?.id ]);
        setActiveIcon(false);
    };
    return (
        <div style={{ width: '100%' }}>
            <div className={styles.contentCourse}>
                <div className={styles.titleProfile}>
                    <Typo size="small" type="bold" style={{ color: 'var(--text-color)' }}>
                        {translate.formatMessage(message.notification)}
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
                <Flex mb={22} mt={34} justify={'space-between'}>
                    <Flex gap={13}>
                        <Button
                            radius="md"
                            variant={activeButtonAll ? 'filled' : 'default'}
                            onClick={() => {
                                setActiveButtonAll(true);
                            }}
                        >
                            <FormattedMessage defaultMessage="Tất cả" />
                        </Button>

                        <Button
                            radius="md"
                            variant={!activeButtonAll ? 'filled' : 'default'}
                            onClick={() => {
                                setActiveButtonAll(false);
                            }}
                        >
                            <FormattedMessage defaultMessage="Chưa đọc" />
                        </Button>
                        <Button radius="md" variant={'default'} onClick={handleReadAll}>
                            <FormattedMessage defaultMessage="Đọc tất cả" />
                        </Button>
                    </Flex>
                    <Button
                        size="xs"
                        variant="filled"
                        color="red"
                        classNames={{ root: styles.buttonDelete, inner: styles.inner }}
                        disabled={!dataNotification?.listNotification}
                        onClick={handleDeleteAll}
                    >
                        <Trash />
                    </Button>
                </Flex>
                <Flex direction={'column'} gap={7}>
                    {dataNotification?.listNotification ? (
                        dataNotification?.listNotification?.map((item) => {
                            return (
                                <ItemNotificatin
                                    hiddenItems={hiddenItems}
                                    item={item}
                                    key={item?.key}
                                    readAll={readAll}
                                    deleteAll={deleteAll}
                                    onClick={() => handleOnClickChecked(item?.id)}
                                />
                            );
                        })
                    ) : (
                        <Center mt={30}>
                            <Text
                                size={'var(--primary-font-size)'}
                                fw={'var(--font-normal)'}
                                c={'var(--primary-color)'}
                                ta={'center'}
                            >
                                Chưa có thông báo
                            </Text>
                        </Center>
                    )}
                </Flex>
            </div>
            {/* <div style={{ margin: '0 -18px' }}>
                <AppFooterMobile />
            </div> */}
        </div>
    );
};

export default NotificationMobile;
