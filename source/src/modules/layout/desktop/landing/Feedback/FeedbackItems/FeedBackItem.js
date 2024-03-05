import React from 'react';
import styles from './index.module.scss';
import { Text, Avatar, Group, Box } from '@mantine/core';
import avatar from '@assets/images/avatar-default.png';
import Typo from '@components/common/elements/Typo';
import classNames from 'classnames';
import useAuth from '@hooks/useAuth';
import { AppConstants } from '@constants';
const FeedBackItem = ({ data, key, renderLink }) => {
    return (
        <div className={styles.card} key={key}>
            <Typo style={{ height: 340, fontSize:18 }} className={classNames(styles.mainContent, 'limit-line')}>
                {data.message}
            </Typo>

            <div className={styles.feedback__authur}>
                <Avatar
                    color="cyan"
                    radius="999"
                    size="lg"
                    src={AppConstants.contentRootUrl + data?.studentInfo?.account?.avatar}
                ></Avatar>
                <Box>
                    <Typo size="primary" className={styles.name}>
                        {data?.studentInfo?.account?.fullName}
                    </Typo>
                    <Typo size="sub" className={styles.desc}>
                        Học viên ngành Thiết kế đồ họa
                    </Typo>
                </Box>
            </div>
        </div>
    );
};

export default FeedBackItem;
