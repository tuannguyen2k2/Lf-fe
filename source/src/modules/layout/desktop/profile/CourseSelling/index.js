import React from 'react';
import { Tabs, Button, Group, Box, Image } from '@mantine/core';
import styles from './index.module.scss';
import ItemCourseSelling from './ItemCourseSelling';
import Healing from '@components/common/elements/Healing';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import IconEdit from '@assets/icons/edit.svg';
import Typo from '@components/common/elements/Typo';
const message = defineMessages({
    myCourse: 'Khóa học của tôi ',
    freeCourse: 'Khóa học miễn phí',
    feeCourse: 'Khóa học đã mua',
});

const CourseSelling = () => {
    const translate = useTranslate();
    return (
        <div style={{ width: '910px', margin: '30px' }}>
            <Group>
                <Button size="lg">
                    <Group>
                        <Image src={IconEdit} />
                        <Typo size="sub">
                            <FormattedMessage defaultMessage="Tạo khóa học mới" />
                        </Typo>
                    </Group>
                </Button>
                <Button size="lg" color="var(--red-color)">
                    <Group>
                        <Image src={IconEdit} />
                        <Typo size="sub">
                            <FormattedMessage defaultMessage="Edit" />
                        </Typo>
                    </Group>
                </Button>
            </Group>
            <ItemCourseSelling />
            <ItemCourseSelling />
            <ItemCourseSelling />
            <ItemCourseSelling />
            <ItemCourseSelling />
            <ItemCourseSelling />
        </div>
    );
};

export default CourseSelling;
