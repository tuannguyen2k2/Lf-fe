import { UserTypes, storageKeys } from '@constants';
import { defineMessages } from 'react-intl';
import { getData } from './localStorage';
import React from 'react';
import { IconBellRinging } from '@tabler/icons-react';
import { showErrorMessage, showInfoMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';

const messages = defineMessages({
    studentDoneTaskDescription: 'Bạn vừa hoàn thành task: ',
    studentNewTaskDescription: 'Bạn vừa được giao task: ',
    cancelTaskDescription: 'Bạn vừa bị huỷ task : ',
    leaderNewTaskDescription: 'Một task mới vừa được tạo: ',
    leaderDoneTaskDescription: 'Thông báo đã hoàn thành task: ',
});

export const webSocket = (tokenLogin, translate) => {
    var wsUri = process.env.REACT_APP_WEB_SOCKET_URL;
    var websocket;
    var isClosedIntentionally = false;
    document.addEventListener('visibilitychange', handleVisibilityChange);
    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            // If the page becomes visible, reconnect WebSocket
            webSocket();
        } else {
            // If the page becomes hidden, close WebSocket
            if (websocket) {
                isClosedIntentionally = true;
                websocket.close();
            }
        }
    }

    function init() {
        webSocket();
        setInterval(() => {
            doPing();
        }, 30000);
    }
    function webSocket() {
        websocket = new WebSocket(wsUri);

        websocket.onopen = onOpen;

        websocket.onclose = onClose;

        websocket.onmessage = onMessage;

        websocket.onerror = onError;
    }
    function onOpen(evt) {
        console.log('CONNECTED');

        var client_info = {
            cmd: 'CLIENT_INFO',
            platform: 0,
            clientVersion: '1.0',
            lang: 'vi',
            token: tokenLogin,
            app: 'CLIENT_APP',
            data: {
                app: 'CLIENT_APP',
            },
        };
        doSend(JSON.stringify(client_info));
    }

    function onClose(evt) {
        console.log('DISCONNECTED');
        if (!isClosedIntentionally) {
            setTimeout(() => {
                webSocket();
            }, 5000);
        }
        isClosedIntentionally = false;
    }

    function onMessage(evt) {
        const data = JSON.parse(evt?.data)?.data;
        if (JSON.stringify(data) !== '{}') {
            const dataNotification = data?.message ? JSON.parse(data.message) : null;
            const useKind = getData(storageKeys.USER_KIND);
            if (useKind == UserTypes.STUDENT) {
                if (data?.kind == 1) {
                    showSucsessMessage(
                        translate.formatMessage(messages.studentDoneTaskDescription) + dataNotification?.taskName,
                    );
                } else if (data?.kind == 2) {
                    showInfoMessage(
                        translate.formatMessage(messages.studentNewTaskDescription) + dataNotification?.taskName,
                    );
                } else if (data?.kind == 3) {
                    showErrorMessage(
                        translate.formatMessage(messages.cancelTaskDescription) + dataNotification?.taskName,
                    );
                } else if (data?.kind == 5) {
                    showSucsessMessage(
                        translate.formatMessage(messages.studentDoneTaskDescription) + dataNotification?.lectureName,
                    );
                } else if (data?.kind == 6) {
                    showInfoMessage(
                        translate.formatMessage(messages.studentNewTaskDescription) + dataNotification?.lectureName,
                    );
                } else if (data?.kind == 7) {
                    showErrorMessage(
                        translate.formatMessage(messages.cancelTaskDescription) + dataNotification?.lectureName,
                    );
                }
            }

            localStorage.setItem(storageKeys.HAS_NOTIFICATION, true);
        }
        //websocket.close();
    }
    function onError(evt) {
        console.log(evt.data);
    }

    function doSend(message) {
        // console.log('SENT: ' + message);
        if (websocket.readyState === WebSocket.OPEN) {
            websocket.send(message);
        } else {
            console.error('WebSocket is in CLOSING or CLOSED state.');
        }
    }
    function doReceived(message) {
        return message;
    }

    function doPing() {
        var pingRequest = {
            cmd: 'CLIENT_PING',
            platform: 0,
            clientVersion: '1.0',
            lang: 'vi',
            token: tokenLogin,
            app: 'CLIENT_APP',
            data: {
                app: 'CLIENT_APP',
            },
        };
        doSend(JSON.stringify(pingRequest));
    }
    init();
};
