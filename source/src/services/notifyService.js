import { notifications } from '@mantine/notifications';
import React from 'react';
import {
    IconBook,
    IconCamera,
    IconCoins,
    IconAlertTriangle,
    IconCheck,
    Icon123,
    IconExclamationCircle,
    IconBell,
} from '@tabler/icons-react';
const showSucsessMessage = (content, translate) => {
    notifications.show({
        color: 'green',
        title: translate?.t(`${translate.ns}:error`, 'Error Message') || 'Thành công',
        message: content,
        icon: <IconCheck />,
        autoClose: 2000,
    });
};

const showErrorMessage = (content, translate) => {
    notifications.show({
        color: 'red',
        title: translate?.t(`${translate.ns}:error`, 'Error Message') || 'Lỗi',
        message: content,
        icon: <IconExclamationCircle />,
        autoClose: 2000,
    });
};

const showWarningMessage = (content, translate) => {
    notifications.show({
        color: 'yellow',
        title: translate?.t(`${translate.ns}:error`, 'Error Message') || 'Cảnh báo',
        message: content,
        icon: <IconAlertTriangle />,
        autoClose: 2000,
    });
};

const showInfoMessage = (content, translate) => {
    notifications.show({
        color: 'cyan',
        title: translate?.t(`${translate.ns}:error`, 'Error Message') || 'Thông báo',
        message: content,
        icon: <IconBell />,
        autoClose: 2000,
    });
};

export { showErrorMessage, showWarningMessage, showSucsessMessage, showInfoMessage };
