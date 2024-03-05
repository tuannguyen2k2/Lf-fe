import React from 'react';
import { Tabs, Button, Group, Box, Flex } from '@mantine/core';
import styles from './index.module.scss';
import ItemCourse from './ItemCourse';
import Healing from '@components/common/elements/Healing';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import routes from '@routes';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import AppHeader from '@modules/layout/common/mobile/AppHeader';
import AppFooterMobile from '@modules/layout/common/mobile/Footer/appFooterMobile';
import SkeLeton from '@components/common/elements/Skeleton';

const message = defineMessages({
    myCourse: 'Khóa học của tôi ',
    freeCourse: 'Khóa học miễn phí',
    feeCourse: 'Khóa học đã mua',
});

const CourseInfoMobile = ({ myCourse }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParameters = new URLSearchParams(window.location.search);
    const isFree = queryParameters.get('isFree');
    const isFinished = queryParameters.get('isFinished');

    return (
        <div style={{ width: '100%' }}>
            <div className={styles.contentCourse}>
                <div className={styles.titleProfile}>
                    <Typo size="small" type="bold" style={{ color: 'var(--text-color)' }}>
                        {translate.formatMessage(message.myCourse)}
                    </Typo>
                    <div className={styles.iconClose}>
                        <i
                            className={styles.iconClose}
                            onClick={(e) => {
                                e.stopPropagation();
                                // navigate(generatePath(routes.profilePage.path), {
                                //     state: { action: 'home', prevPath: location.pathname },
                                // });
                                navigate(-1);
                            }}
                        >
                            <Close />
                        </i>
                    </div>
                </div>
                {/* <Tabs
                    defaultValue={isFree ? isFree : 'true'}
                    classNames={{
                        root: styles.tabsCategory,
                        list: styles.listCategory,
                        tabLabel: styles.tabLabelCategory,
                        // tab: styles.categoryTab,
                    }}
                    onChange={(value) => {
                        navigate(`${location.pathname}?content=course-learn&isFree=${value}`);
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="true">
                            <Typo size="sub" type="semi-bold">
                                {translate.formatMessage(message.freeCourse)}
                            </Typo>
                        </Tabs.Tab>
                        <Tabs.Tab value="false">
                            <Typo size="sub" type="semi-bold">
                                {translate.formatMessage(message.feeCourse)}
                            </Typo>
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="true">
                        <Flex mb={22} gap={10}>
                            <Button
                                color={isFinished === 'true' && 'gray'}
                                onClick={() => {
                                    navigate(`${location.pathname}?content=course-learn&isFree=true&isFinished=false`);
                                }}
                                size="xs"
                                variant="outline"
                                classNames={{ root: styles.buttonRoot, inner: styles.inner }}
                            >
                                <FormattedMessage defaultMessage="Đang học" />
                            </Button>

                            <Button
                                color={isFinished !== 'true' && 'gray'}
                                onClick={() => {
                                    navigate(`${location.pathname}?content=course-learn&isFree=true&isFinished=true`);
                                }}
                                size="xs"
                                variant="outline"
                                classNames={{ root: styles.buttonRoot, inner: styles.inner }}
                            >
                                <FormattedMessage defaultMessage="Hoàn thành" />
                            </Button>
                        </Flex>
                        {myCourse?.content?.map((item, index) => (
                            <ItemCourse key={index} detail={item} />
                        ))}
                    </Tabs.Panel>
                    <Tabs.Panel value="false">
                        <Flex mb={22} gap={10}>
                            <Button
                                color={isFinished === 'true' && 'gray'}
                                onClick={() => {
                                    navigate(`${location.pathname}?content=course-learn&isFree=false&isFinished=false`);
                                }}
                                size="xs"
                                variant="outline"
                                classNames={{ root: styles.buttonRoot, inner: styles.inner }}
                            >
                                <FormattedMessage defaultMessage="Đang học" />
                            </Button>

                            <Button
                                size="xs"
                                variant="outline"
                                color={isFinished !== 'true' && 'gray'}
                                onClick={() => {
                                    navigate(`${location.pathname}?content=course-learn&isFree=false&isFinished=true`);
                                }}
                                classNames={{ root: styles.buttonRoot, inner: styles.inner }}
                            >
                                <FormattedMessage defaultMessage="Hoàn thành" />
                            </Button>
                        </Flex>
                        {myCourse?.content?.map((item, index) => (
                            <ItemCourse key={index} detail={item} />
                        ))}
                    </Tabs.Panel>
                </Tabs> */}
                <Group mt={20} mb={20}>
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
                )) : <SkeLeton numRow={8}/>}
            </div>
            {/* <div style={{ margin: '0 -18px' }}>
                <AppFooterMobile />
            </div> */}
        </div>
    );
};

export default CourseInfoMobile;
