import React from 'react';
import styles from './teacher.module.scss';
import avatar from '@assets/images/avatar.png';
import { Box, Image, Center, Text } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import { Link } from 'react-router-dom';
import { AppConstants } from '@constants';
import { Avatar } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import routes from '@routes';
import { generatePath, useNavigate } from 'react-router-dom';
const TeacherItem = ({ item }) => {
    const navigate = useNavigate();

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
        <Box
            miw={150}
            w={150}
            h={200}
            p={5}
            pt={20}
            style={{ boxShadow: 'var(--box-shadow)' }}
            onClick={navigateTeacher}
        >
            <Center>
                <Image
                    src={item?.account.avatar ? AppConstants.contentRootUrl + item?.account.avatar : avatar}
                    w={'80px'}
                    radius={'50%'}
                    className={styles.avatar}
                    // p={5}
                />
            </Center>
            <Typo size="tiny" type="normal" className={styles.teacher__pro}>
                <FormattedMessage defaultMessage="Chuyên gia" />
            </Typo>
            <Typo size="sub" type="semi-bold" className={styles.teacher__title}>
                {item?.account?.fullName}
            </Typo>

            {/* <Typo size="sub" type="normal" className={styles.teacher__desc}>
                <div dangerouslySetInnerHTML={{ __html: identification?.shortInfo?.substring(0, 200) }}></div>
            </Typo> */}
            <Text
                // fs={'var(--big-font-size)'}
                // fw={'var(--semi-bold-font)'}
                size="var(--sub-font-size)"
                ta="center"
                lineClamp={2}
                style={{ lineHeight: '130%', fontSize: '12px' }}
            >
                {identification?.shortInfo}
            </Text>
        </Box>
    );
};

export default TeacherItem;
