import React from 'react';
import { Tabs, Button, Group, Box } from '@mantine/core';
import styles from './index.module.scss';
import RelevantList from '../../detail/Relevant/RelevantList';
import ItemRelevant from '../../detail/Relevant/ItemRelevant';
import ItemCourse from './ItemCourse';
import Healing from '@components/common/elements/Healing';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    myCourse: 'Khóa học của tôi ',
    freeCourse: 'Khóa học miễn phí',
    feeCourse: 'Khóa học đã mua',
});

const CourseInfo = ({ myCourse }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParameters = new URLSearchParams(window.location.search);

    const isFinished = queryParameters.get('isFinished');
    return (
        <div style={{ width: '910px' }}>
            <Group mt={20}>
                <Button
                    variant="outline"
                    color={isFinished === 'true' && 'gray'}
                    onClick={() => {
                        navigate(`${location.pathname}?content=course-learn&isFinished=false`);
                    }}
                >
                    <Typo size="sub">
                        <FormattedMessage defaultMessage="Đang học" />
                    </Typo>
                </Button>

                <Button
                    variant="outline"
                    color={isFinished !== 'true' && 'gray'}
                    onClick={() => {
                        navigate(`${location.pathname}?content=course-learn&isFinished=true`);
                    }}
                >
                    <Typo size="sub">
                        <FormattedMessage defaultMessage="Hoàn thành" />
                    </Typo>
                </Button>
            </Group>

            { myCourse ? myCourse?.content?.map((item) => (
                <ItemCourse key={item?.id} detail={item} />
            )) : <SkeLeton numRow={8} style={{ marginTop:20 }}/>}
        </div>
    );
};

export default CourseInfo;
