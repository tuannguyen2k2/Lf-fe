/* eslint-disable array-bracket-spacing */
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import styles from './index.module.scss';
import arrow from '@assets/icons/arrow.svg';
import {
    Collapse,
    Flex,
    Grid,
    Text,
    Title,
    Paper,
    Image,
    Modal,
    Textarea,
    Stack,
    Avatar,
    Rating,
    Button,
    Box,
    Divider,
    Center,
} from '@mantine/core';
import play from '@assets/icons/playButton.svg';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';
import { Accordion, rem, Group } from '@mantine/core';
import {
    IconPhoto,
    IconPrinter,
    IconCameraSelfie,
    IconX,
    IconCircleCheckFilled,
    IconEditCircle,
} from '@tabler/icons-react';

import Typo from '@components/common/elements/Typo';
import Iconclose from '@assets/icons/close.svg';
import star from '@assets/icons/starIconMobi.svg';
import starDone from '@assets/icons/starIconDone.svg';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useTranslate from '@hooks/useTranslate';
import { convertToHoursMinutes } from '@utils';
import { AppConstants, LESSON_KIND_VIDEO, reviewKind } from '@constants';
import { IconFileText } from '@tabler/icons-react';
import { ReactComponent as Play } from '@assets/icons/playButton.svg';
import { timeConvert } from '@utils';
import { useForm } from '@mantine/form';
import useAuth from '@hooks/useAuth';
import { showSucsessMessage } from '@services/notifyService';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import avatar from '@assets/images/avatar_profile.png';
import BasicModal from '@components/common/form/BasicModal';
import { commonMessage } from '@constants/intl';
import { IconEdit } from '@tabler/icons-react';
import { IconStarFilled } from '@tabler/icons-react';
const message = defineMessages({
    content: 'Nội dung khoá học',
    lesson: 'bài giảng',
    minute: 'Phút',
});

const LessonMenu = ({ lessonId, data, reviewData, executeReviewData, doneLesson, style }) => {
    const translate = useTranslate();
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [openedReview, { open: openReview, close: closeReview }] = useDisclosure(false);
    const [checkModal, setCheckModal] = useState(1);
    const form = useForm({
        initialValues: {
            star: 0,
        },
    });

    const [selected, setSelected] = useState([]);
    const params = useLocation();
    const valueParams = useParams();

    useEffect(() => {
        executeReviewData({
            params: {
                courseId: valueParams?.id,
            },
        });
    }, [params]);

    // const setOpen = (id) => {
    //     if (!selected.includes(id)) setSelected((pre) => [...pre, id]);
    // };

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

    const { execute: createReview, loading: loadingexpert } = useFetch(apiConfig.review.create);
    const handleCreateReview = (values) => {
        createReview({
            data: {
                ...values,
                kind: checkModal,
                courseId: params?.id,
                // ...(refcode && { referralCode: refcode }),
            },
            onCompleted: (res) => {
                showSucsessMessage('Đánh giá thành công');
                closeReview();
            },
            onError: (error) => {
                // error?.response?.data?.code == EXPERT_REGISTRATION_ERROR_PHONE_OR_EMAIL_ALREADY_USED
                //     ? showErrorMessage(
                //         translate.formatMessage(errorMessage.EXPERT_REGISTRATION_ERROR_PHONE_OR_EMAIL_ALREADY_USED),
                //     )
                //     : '';
            },
        });
    };

    return (
        <div style={style}>
            {/* <Image src={star} w="40px" onClick={() => openReview()}/> */}
            <Paper shadow="sm" p={15} width="100%">
                <Group justify="space-between">
                    <h3 className={styles.healing}>Nội dung khóa học</h3>

                    <Flex align="center" gap={10} mt={5}>
                        {reviewData?.totalElements === 0 && (
                            <img
                                src={star}
                                alt=""
                                style={{ width: '40px', color: '#FFAA33' }}
                                onClick={() => {
                                    setCheckModal(reviewKind.REVIEW_KIND_COURSE);
                                    openReview();
                                }}
                            />
                        )}
                    </Flex>
                </Group>
            </Paper>

            {data?.map((item, index) => {
                return (
                    <>
                        <Divider />
                        <div className={styles.item} onClick={() => setOpen(item.id)}>
                            <Flex pt={15} px={20} pr={24} justify="space-between" key={index} align="center">
                                <Typo size="primary" type="bold" className={styles.name}>
                                    {item.name}
                                </Typo>
                                <Flex justifyContent={Center} align={Center}>
                                    <Typo size="sub" className={styles.time} style={{ marginRight: 22, marginTop: 12 }}>
                                        {timeConvert(item?.totalStudyTime)}
                                    </Typo>
                                    <Typo>
                                        <img
                                            src={arrow}
                                            className={styles.arrow}
                                            style={isOpen(item.id) ? { transform: 'rotate(270deg)' } : {}}
                                        />
                                    </Typo>
                                </Flex>
                            </Flex>

                            <Flex gap={10} px={20} align="center" justify={'space-between'} pr={50} mt={10}>
                                <Typo size="sub" className={styles.time}>
                                    {item?.totalLesson} {translate.formatMessage(message.lesson)}
                                </Typo>
                            </Flex>
                        </div>

                        <Collapse in={isOpen(item.id)} className={styles.lessonWrapper}>
                            {item.lessons?.map((lesson, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.lesson}
                                        style={
                                            lesson?.id == lessonId
                                                ? { background: 'var(--background-color-light)' }
                                                : { background: 'var(--container-color)' }
                                        }
                                    >
                                        <Link to={`${params?.pathname}?lessonId=${lesson?.id}`}>
                                            <Flex
                                                py={10}
                                                px={20}
                                                align="center"
                                                gap="lg"
                                                style={{ position: 'relative', width: 'calc(100% - 30px)' }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Flex gap={'lg'} align={'center'}>
                                                        {lesson?.kind == LESSON_KIND_VIDEO ? (
                                                            <Play
                                                                width={20}
                                                                color="#000"
                                                                style={{ minWidth: '20px' }}
                                                            />
                                                        ) : (
                                                            <IconFileText width={20} color="#000" />
                                                        )}
                                                        <Typo size="sub" className={styles.lessonName}>
                                                            {lesson.name}
                                                        </Typo>
                                                    </Flex>
                                                    <Flex
                                                        gap={10}
                                                        direction="column"
                                                        justify={'center'}
                                                        align={'center'}
                                                    >
                                                        <Typo size="sub" className={styles.lessonName}>
                                                            {lesson.videoDuration
                                                                ? timeConvert(lesson.videoDuration)
                                                                : null}
                                                        </Typo>
                                                    </Flex>
                                                </div>
                                                {lesson?.isDone ? (
                                                    <IconCircleCheckFilled className={styles.icon} />
                                                ) : (
                                                    doneLesson?.includes(`${lesson?.id}`) && (
                                                        <IconCircleCheckFilled className={styles.icon} />
                                                    )
                                                )}
                                            </Flex>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Collapse>
                    </>
                );
            })}
            <BasicModal
                isOpen={openedReview}
                // size="calc(27vw)"
                onCloseModal={closeReview}
                footer={false}
                style={{ position: 'relative', width: '50vw', height: '50vh' }}
                title={
                    checkModal === 2
                        ? translate.formatMessage(commonMessage.reivewWrite)
                        : translate.formatMessage(commonMessage.reivewSystemWrite)
                }
                fullScreen="fullScreen"
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <Stack justify="center">
                    <form onSubmit={form.onSubmit((values) => handleCreateReview(values))}>
                        <Stack align="center" mt={20}>
                            <Avatar
                                radius="50%"
                                src={
                                    profile?.account?.avatar?.includes('https') || profile?.account?.avatar == undefined
                                        ? avatar
                                        : AppConstants.contentRootUrl + profile?.account?.avatar
                                }
                                size="8rem"
                            />
                            <Text fw={600} fz={18}>
                                {profile?.account?.fullName ?? profile?.account?.fullName}
                            </Text>
                            <Rating size="xl" {...form.getInputProps('star')} />
                        </Stack>

                        <Textarea
                            mt={24}
                            required
                            placeholder={translate.formatMessage(commonMessage.reivewWrite)}
                            minRows={4}
                            {...form.getInputProps('message')}
                        />

                        <Button fullWidth mt={10} type="submit" size="lg">
                            Viết đánh giá
                        </Button>
                    </form>
                </Stack>
            </BasicModal>
        </div>
    );
};

export default LessonMenu;
