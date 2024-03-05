import React from 'react';
import styles from './teacher.module.scss';
import avatar from '@assets/images/avatar.png';
import { Box, Image, Center, Avatar, Text } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { AppConstants } from '@constants';
import routes from '@routes';
import { Link } from 'react-router-dom';
import { generatePath, useNavigate } from 'react-router-dom';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
const TeacherItem = ({ item }) => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const navigateTeacher = () => {
        navigate(generatePath(routes.userPage.path, { id: item?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };

    const identification = item?.identification && JSON.parse(item?.identification);
    return (
        <Box className={styles.card} onClick={navigateTeacher}>
            <Center>
                <Image
                    src={item?.account.avatar ? AppConstants.contentRootUrl + item?.account.avatar : avatar}
                    w={'190px'}
                    radius={'50%'}
                    className={styles.avatar}
                />
            </Center>
            <Typo size="sub" className={styles.teacher__title}>
                {translate.formatMessage(commonMessage.expert)}
            </Typo>
            <Typo size="primary" type="semi-bold" className={styles.teacher__title_name} lineClamp={2}>
                {item?.account?.fullName}
            </Typo>
            <Text
                // fs={'var(--h3-font-size)'}
                fw={'var(--semi-bold-font)'}
                size="var(--primary-font-size)"
                ta="center"
                mt={25}
                lineClamp={2}
                style={{ lineHeight: '130%', fontSize: '18px' }}
            >
                {identification?.shortInfo}
            </Text>
        </Box>
    );
};

export default TeacherItem;
