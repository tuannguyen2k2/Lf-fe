/* eslint-disable array-bracket-spacing */
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import styles from './index.module.scss';
import arrow from '@assets/icons/arrow.svg';
import { Collapse, Flex, Grid, Text, Title, Paper, Divider, Box, Center, Rating } from '@mantine/core';
import { defineMessages } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import useTranslate from '@hooks/useTranslate';
import { Link, useLocation } from 'react-router-dom';
import { timeConvert } from '@utils';
import { LESSON_KIND_VIDEO } from '@constants';
import { IconFileText } from '@tabler/icons-react';
import { ReactComponent as Play } from '@assets/icons/playButton.svg';
import { IconCircleCheckFilled } from '@tabler/icons-react';
const message = defineMessages({
    content: 'Nội dung khoá học',
    lesson: 'bài giảng',
    minute: 'Phút',
    intro: 'Giới thiệu',
    nameExpert: 'Chuyên gia',
});

const LessonMenu = ({ data, doneLesson, course }) => {
    const translate = useTranslate();
    const params = useLocation();
    const queryParameters = new URLSearchParams(window.location.search);
    const lessonId = queryParameters.get('lessonId');
    const [selected, setSelected] = useState([]);
    const setOpen = useCallback(
        (id) => {
            if (selected.includes(id)) {
                const array = selected.filter((item) => item !== id);
                setSelected((pre) => [...array]);
            } else setSelected((pre) => [...pre, id]);
        },
        [selected],
    );

    const isOpen = useCallback(
        (id) => {
            return selected.includes(id);
        },
        [selected],
    );

    useEffect(() => {
        if (lessonId && data) {
            const filteredElements = data?.filter((item) => item.lessons?.some((lesson) => lesson.id == lessonId));
            const filteredIds = filteredElements?.map((item) => item.id);

            setSelected((pre) => [...new Set([...pre, ...filteredIds])]);
        }
    }, [lessonId, data]);
    return (
        <div className={styles.container}>
            {/* <Paper p={20} pt={120} pb={0}>
                <h2 className={styles.healing}>{translate.formatMessage(message.intro)}</h2>
            </Paper>
            <div className={styles.wrapper}>
                <Title fw="var(--font-semi-bold)" size="var(--sub-font-size)" mt="1rem" mb="1rem" ml={"1rem"}>
                    {translate.formatMessage(message.nameExpert)}: {course?.expert?.account?.fullName}
                </Title>
                <Flex mb="1rem" align="center" gap="sm" ml={"1rem"}>
                    <Rating fractions={4} value={course?.averageStar} color="var(--star-color)" readOnly />
                    <Title fw="var(--font-normal" size="var(--sub-font-size)" c="var(--star-color)">
                        {course?.soldQuantity && course?.soldQuantity} {'Học viên'}
                    </Title>
                </Flex>
                <Title fw="var(--font-normal)" size="var(--sub-font-size)" ml={"1rem"}>
                    {`Thời gian ${course?.totalStudyTime ? timeConvert(course?.totalStudyTime) : '00:00'}  - ${
                        course?.totalLesson ? course?.totalLesson : 0
                    } bài giảng`}
                </Title>
            </div> */}
            <Paper p={20} pt={120}>
                <h2 className={styles.healing}>{translate.formatMessage(message.content)}</h2>
            </Paper>

            {data?.map((item, index) => {
                return (
                    <div key={index}>
                        <Divider></Divider>
                        <div className={styles.item} onClick={() => setOpen(item.id)}>
                            <Flex px={20} pr={35} justify="space-between" align="flex-start" className={styles.section}>
                                <Typo size="sub" type="semi-bold" className={styles.name}>
                                    {item.name}
                                </Typo>
                                <img
                                    src={arrow}
                                    className={styles.arrow}
                                    style={isOpen(item.id) ? { transform: 'rotate(270deg)' } : {}}
                                />
                            </Flex>
                            <Flex gap={10} px={20} mt={10} pr={35} align="center" justify={'space-between'}>
                                <Typo size="sub" className={styles.time}>
                                    {item?.totalLesson} {translate.formatMessage(message.lesson)}
                                </Typo>

                                <Typo size="sub" className={styles.time}>
                                    {item?.totalStudyTime ? timeConvert(item?.totalStudyTime) : null}
                                </Typo>
                            </Flex>
                        </div>
                        <Divider></Divider>
                        <Collapse in={isOpen(item.id)} className={styles.lessonWrapper}>
                            {item.lessons?.map((lesson, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.lesson}
                                        style={
                                            lesson?.id == lessonId
                                                ? { background: 'var(--background-color-light)' }
                                                : {}
                                        }
                                    >
                                        <Link to={`${params?.pathname}?lessonId=${lesson?.id}`}>
                                            {lesson?.isDone ? (
                                                <IconCircleCheckFilled
                                                    className={styles.icon}
                                                    style={{ position: 'absolute' }}
                                                />
                                            ) : (
                                                doneLesson?.includes(`${lesson?.id}`) && (
                                                    <IconCircleCheckFilled
                                                        className={styles.icon}
                                                        style={{ position: 'absolute' }}
                                                    />
                                                )
                                            )}

                                            <Flex pt={20} pb={20} align="center" justify="space-between">
                                                <Flex align="center" gap={10}>
                                                    <Box width={20} height={20}>
                                                        <Center>
                                                            {lesson?.kind == LESSON_KIND_VIDEO ? (
                                                                <Play width={20} height={20} color="#000" />
                                                            ) : (
                                                                <IconFileText width={20} color="#000" />
                                                            )}
                                                        </Center>
                                                    </Box>
                                                    <Typo size="sub" className={styles.lessonName}>
                                                        {lesson.name}
                                                    </Typo>
                                                </Flex>
                                                <Typo size="sub" className={styles.lessonName}>
                                                    {lesson.videoDuration ? timeConvert(lesson.videoDuration) : null}
                                                </Typo>
                                            </Flex>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonMenu;
