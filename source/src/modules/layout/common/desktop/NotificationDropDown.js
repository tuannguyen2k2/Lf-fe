import { ReactComponent as Exit } from '@assets/icons/exit.svg';
import avatar from '@assets/images/avatar_profile.png';
import { ReactComponent as Notification } from '@assets/icons/notification.svg';

import {
    Avatar,
    Box,
    Divider,
    Flex,
    Group,
    Menu,
    Space,
    Text,
    Button,
    Card,
    ScrollArea,
    ActionIcon,
    Center,
    Indicator,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import {
    IconBell,
    IconBellRinging,
    IconCheck,
    IconCircleCheck,
    IconCircleX,
    IconInfoCircle,
    IconTrash,
} from '@tabler/icons-react';
import Typo from '@components/common/elements/Typo';
import { NOTIFICATION_APPROVE_EXPERT, NOTIFICATION_SING_UP_STUDENT, NOTIFICATION_REG_EXPERT } from '@constants';
import { modals } from '@mantine/modals';
import { ReactComponent as Dotblue } from '@assets/icons/dotBlue.svg';
const message = defineMessages({
    All: 'Tất cả',
    Unread: 'Chưa đọc',
    readAll: 'Đọc tất cả',
    delete: 'Xoá tất cả',
    loadMore: 'Xem thêm',
    project: 'Dự án',
    course: 'Course',
    doneTaskTitle: 'Task đã xong',
    newTaskTitle: 'Task mới',
    cancelTaskTitle: 'Task đã hủy',
    notifyDoneTaskTitle: ' Hoàn thành task',
    doneTaskDescription: 'Bạn đã hoàn thành task: ',
    studentNewTaskDescription: 'Bạn đã được giao task: ',
    cancelTaskDescription: 'Bạn đã bị huỷ task : ',
    leaderNewTaskDescription: 'Một task mới được tạo: ',
    leaderDoneTaskDescription: 'Thông báo xong task: ',
    deleteAllConfirm: 'Bạn có muốn xoá toàn bộ thông báo không ?',
    newStudent: '1 Thành viên đã đăng ký thành công bằng mã giới thiệu của bạn',
    newExpert: '1 Chuyên gia đã chấp nhận thành công bằng mã giới thiệu của bạn',
    newRegExpert: '1 Chuyên gia đã đăng ký thành công bằng mã giới thiệu của bạn',
});
import { storageKeys } from '@constants';
import useTranslate from '@hooks/useTranslate';
import styles from './DropDown.module.scss';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';

const NotificationDropDown = ({
    data,
    executeGetData,
    executeUpdateState,
    loading,
    unReadTotal,
    pageTotal,
    ...props
}) => {
    const [ activeButtonAll, setActiveButtonAll ] = useState(true);
    const [ activeIcon, setActiveIcon ] = useState(false);
    const translate = useTranslate();
    const [ dataNotification, setDataNotification ] = useState([]);
    const [ isLoadMore, setIsLoadMore ] = useState(false);
    let [ countLoadMore, setCountLoadMore ] = useState(1);
    const [ hiddenItems, setHiddenItems ] = useState([]);
    const [ deleteAll, setDeleteAll ] = useState(false);
    const [ readAll, setReadAll ] = useState(false);
    const [ dataNotificationUnRead, setDataNotificationUnRead ] = useState([]);
    const [ hasNotification, setHasNotification ] = useState(false);
    const navigate = useNavigate();
    const hostPath = window.location.host;

    const { profile } = useAuth();
    const { execute: executeReadAll } = useFetch(apiConfig.notification.readAll, {
        immediate: false,
    });
    const { execute: executeDeleteAll } = useFetch(apiConfig.notification.deleteAll, {
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
    useEffect(() => {
        setDataNotificationUnRead(dataNotification?.filter((item) => item.state == 0));
    }, [ dataNotification ]);
    useEffect(() => {
        if (activeIcon) {
            if (activeButtonAll) {
                executeGetData();
            } else {
                executeGetData({
                    params: { state: 0 },
                });
            }
        }
        setReadAll(false);
        setDeleteAll(false);
        localStorage.setItem(storageKeys.HAS_NOTIFICATION, false);
        setHasNotification(false);

        // setHiddenItems([]);
    }, [ activeIcon ]);

    useEffect(() => {
        if (activeIcon) {
            if (!activeButtonAll) {
                executeGetData({
                    params: { state: 0 },
                });
            } else {
                executeGetData();
            }
        }
        setIsLoadMore(false);
        setCountLoadMore(1);
        setHiddenItems([]);
    }, [ activeButtonAll ]);

    const iconNotification = (kind, style, size) => {
        if (kind == 1 || kind == 5) {
            return <IconCircleCheck color="green" style={style} size={size} />;
        } else if (kind == 2 || kind == 6) {
            return <IconInfoCircle color="blue" style={style} size={size} />;
        } else if (kind == 3 || kind == 7) {
            return <IconCircleX color="red" style={style} size={size} />;
        } else if (kind == 4 || kind == 8) {
            return <IconBellRinging color="orange" style={style} size={size} />;
        }
    };
    const titleNotification = (item) => {
        const kind = item?.kind;

        if (kind == NOTIFICATION_SING_UP_STUDENT) {
            return translate.formatMessage(message.newStudent);
        }
        if (kind == NOTIFICATION_APPROVE_EXPERT) {
            translate.formatMessage(message.newStudent);
        }
        if (kind == NOTIFICATION_REG_EXPERT) {
            translate.formatMessage(message.newRegExpert);
        }
    };
    const descriptionNotification = (item) => {
        const kind = item?.kind;
        // const taskName = item?.taskName ? item?.taskName : item?.lectureName;
        // const taskName = 'Task name';
        // if (kind == 1 || kind == 6) {
        //     return translate.formatMessage(message.leaderNewTaskDescription) + taskName;
        // } else if (kind == 2 || kind == 8) {
        //     return translate.formatMessage(message.leaderDoneTaskDescription) + taskName;
        // }
    };
    // const timeNotification = (createdDate) => {
    //     const dateTime = convertStringToDateTime(createdDate, DEFAULT_FORMAT, DEFAULT_FORMAT).add(7, 'hour');
    //     const dateTimeString = convertDateTimeToString(dateTime, DEFAULT_FORMAT);
    //     return dateTimeString;
    // };
    const handleOnClickChecked = (id) => {
        // e.stopPropagation();
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
            size: '27vw',
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
        <div>
            <Menu
                openDelay={100}
                closeDelay={400}
                shadow="md"
                zIndex={9999}
                closeOnItemClick={false}
                classNames={{
                    dropdown: styles.rootNotification,
                    item: styles.item,
                    arrow: styles.arrow,
                }}
                onOpen={() => {
                    setActiveIcon(true);
                }}
                onClose={() => {
                    setActiveIcon(false);
                }}
            >
                <Menu.Target>
                    {/* <div style={{ color: 'var(--primary-color)' }}>
                        <Notification />
                    </div> */}
                    <div
                        style={{ color: 'var(--primary-color)' }}
                        onClick={() => {
                            activeIcon ? setActiveIcon(false) : setActiveIcon(true);
                        }}
                    >
                        {(unReadTotal > 0 && !readAll && !deleteAll && !loading) || hasNotification ? (
                            <Indicator color="red" size={8} offset={-2}>
                                <Notification />
                            </Indicator>
                        ) : (
                            <Notification />
                        )}
                    </div>
                </Menu.Target>
                <Menu.Dropdown p={24} style={{ background: '#e9e9e9' }}>
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'}>
                        Thông báo
                    </Text>
                    <Flex justify="space-between" mb={10} mt={20}>
                        <Group>
                            <Button
                                radius="md"
                                variant={activeButtonAll ? 'filled' : 'default'}
                                onClick={() => {
                                    setActiveButtonAll(true);
                                }}
                            >
                                {translate.formatMessage(message.All)}
                            </Button>
                            <Button
                                radius="md"
                                variant={!activeButtonAll ? 'filled' : 'default'}
                                onClick={() => {
                                    setActiveButtonAll(false);
                                }}
                            >
                                {translate.formatMessage(message.Unread)}
                            </Button>
                        </Group>
                        <Group>
                            <Button radius="md" variant="default" onClick={handleReadAll}>
                                {translate.formatMessage(message.readAll)}
                            </Button>
                            <ActionIcon color="red" size="lg" onClick={handleDeleteAll}>
                                <IconTrash></IconTrash>
                            </ActionIcon>
                            {/* <Button radius="xl" variant="filled" color="red">
                                {translate.formatMessage(message.delete)}
                            </Button> */}
                        </Group>
                    </Flex>
                    <ScrollArea h={'100vh'} offsetScrollbars>
                        {dataNotification ? (
                            dataNotification?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.itemNotification}
                                        style={{
                                            backgroundColor:
                                                item?.state == 1 || hiddenItems.includes(item?.id) || readAll
                                                    ? '#e9e9e9'
                                                    : '#fafafa',
                                            margin: '4px 0',
                                            opacity: item?.state == 1 || readAll ? '50%' : '100%',
                                            display: deleteAll ? 'none' : '',
                                            border: '1px solid #fafafa',
                                            borderRadius: '10px',
                                        }}
                                        onClick={() => handleOnClickChecked(item?.id)}
                                    >
                                        <Menu.Item>
                                            <Flex justify={'space-evenly'} align={'center'}>
                                                <IconInfoCircle color="blue" size={30} />
                                                <Flex direction="column" w={370} justify="center">
                                                    <Typo size="sub" type="semi-bold">
                                                        {titleNotification(item)}
                                                    </Typo>
                                                    <Typo size="tiny" type="semi-bold">
                                                        {descriptionNotification(item)}
                                                    </Typo>
                                                    <Typo size="tiny"> {item?.createdDate}</Typo>
                                                </Flex>
                                                {/* <IconCheck size={30} color="var(--primary-color)" /> */}

                                                {item?.state == 0 && <Dotblue className={styles.iconDot} />}
                                            </Flex>
                                        </Menu.Item>
                                    </div>
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
                        {/* {pageTotal > 0 &&
                            countLoadMore != pageTotal &&
                            !deleteAll &&
                            !(readAll && !activeButtonAll) &&
                            !loading && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                <Button variant="outline"> {translate.formatMessage(message.loadMore)}</Button>
                            </div>
                        )} */}
                    </ScrollArea>
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default NotificationDropDown;
