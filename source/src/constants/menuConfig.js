import logout from '@assets/icons/logout.svg';
import { ReactComponent as Study } from '@assets/icons/study.svg';
import { ReactComponent as User } from '@assets/icons/user.svg';
import { ReactComponent as RevenueIcon } from '@assets/icons/revenue.svg';
import { ReactComponent as Notification } from '@assets/icons/notification.svg';

import { Image } from '@mantine/core';
import { IconCoins, IconMenu2 } from '@tabler/icons-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CourseInfo from '@modules/layout/desktop/profile/Course';
import CourseSelling from '@modules/layout/desktop/profile/CourseSelling';
import HistorySeller from '@modules/layout/desktop/profile/HistorySeller';
import InfoProfile from '@modules/layout/desktop/profile/Info';
import Revenue from '@modules/layout/desktop/profile/Revenue';

import { GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT } from '@constants';
import ChangPassword from '@modules/layout/desktop/profile/ChangePassword';
import { IconReplace } from '@tabler/icons-react';
import NotificationMobile from '@modules/layout/mobile/profile/Notification';
const configPages = [
    {
        title: <FormattedMessage defaultMessage="Hồ sơ" />,
        component: InfoProfile,
        key: 'info',
        icon: <User />,
        access: [ GROUP_KIND_EXPERT, GROUP_KIND_STUDENT, GROUP_KIND_SELLER ],
    },
    {
        title: <FormattedMessage defaultMessage="Khóa học của tôi" />,
        component: CourseInfo,
        key: 'course-learn',
        icon: <Study />,
        access: [ GROUP_KIND_STUDENT, GROUP_KIND_SELLER ],
    },
    {
        title: <FormattedMessage defaultMessage="Thông báo" />,
        component: NotificationMobile,
        key: 'notification',
        icon: <Notification />,
        access: [ GROUP_KIND_STUDENT, GROUP_KIND_SELLER ],
    },

    {
        title: <FormattedMessage defaultMessage="Đổi mật khẩu" />,
        component: ChangPassword,
        key: 'change',
        icon: <IconReplace />,
        access: [ GROUP_KIND_STUDENT, GROUP_KIND_SELLER ],
    },
];

export default configPages;
