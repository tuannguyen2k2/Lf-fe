import { Avatar, Group, Rating, Text, Box, Image, Divider, Progress, Flex, Grid } from '@mantine/core';
import React from 'react';
import styles from './ItemCourse.module.scss';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import { Link } from 'react-router-dom';
import arrow from '@assets/icons/arowright.png';
import clock from '@assets/icons/clockicon.png';
import course from '@assets/icons/courseicon.png';
import { ReactComponent as CheckTrue } from '@assets/icons/checkTrue.svg';
import { ReactComponent as CheckFalse } from '@assets/icons/checkFalse.svg';
import { ReactComponent as Dotblue } from '@assets/icons/dotBlue.svg';
import { IconInfoCircle } from '@tabler/icons-react';
import {
    NOTIFICATION_APPROVE_EXPERT,
    NOTIFICATION_SING_UP_STUDENT,
    NOTIFICATION_REG_EXPERT,
    DEFAULT_FORMAT,
} from '@constants';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { convertUtcToLocalTime } from '@utils';
const message = defineMessages({
    newStudent: '1 Thành viên đã đăng ký thành công bằng mã giới thiệu của bạn',
    newExpert: '1 Chuyên gia đã chấp nhận thành công bằng mã giới thiệu của bạn',
    newRegExpert: '1 Chuyên gia đã đăng ký thành công bằng mã giới thiệu của bạn',
});
const ItemNotificatin = ({ item, readAll, deleteAll, onClick, hiddenItems }) => {
    const translate = useTranslate();
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
    return (
        <div className={styles.item} onClick={() => onClick()}>
            <Grid
                className={styles.itemcart}
                // style={{ background: '#F3F4F9' }}
                style={{
                    backgroundColor:
                        item?.state == 1 || hiddenItems.includes(item?.id) || readAll ? '#e9e9e9' : '#fafafa',
                    margin: '4px 0',
                    opacity: item?.state == 1 || hiddenItems.includes(item?.id) || readAll ? '50%' : '100%',

                    display: deleteAll ? 'none' : '',
                }}
            >
                <Grid.Col span={2} className={styles.iconStt}>
                    <IconInfoCircle color="blue" />
                </Grid.Col>
                <Grid.Col span={10}>
                    <Flex direction="column" gap={9}>
                        <Flex direction="column" gap={7}>
                            <Typo size="sub" type="semi-bold">
                                {titleNotification(item)}
                            </Typo>
                        </Flex>
                        <Typo size="tiny" style={{ color: 'rgba(84, 84, 84, 0.81)' }}>
                            {convertUtcToLocalTime(item?.createdDate, DEFAULT_FORMAT, DEFAULT_FORMAT)}
                        </Typo>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={1}>{item?.state == 0 && <Dotblue className={styles.iconDot} />}</Grid.Col>
            </Grid>
        </div>
    );
};

export default ItemNotificatin;
