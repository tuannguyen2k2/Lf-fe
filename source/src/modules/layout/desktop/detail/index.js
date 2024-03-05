import React, { useCallback, useEffect, useState } from 'react';
import Banner from './Banner';
import styles from './index.module.scss';
import Breadcrumb from '@components/common/elements/Breadcrumb';
import Container from '@components/common/elements/Container';
import RichTextRender from '@components/common/elements/RichTextRender';
import PageLayout from '@modules/layout/common/PageLayout';
import CardDetail from './Card';
import CourseComponent from './Course';
import ReviewComponent from './Review';
import RelevantComponent from './Relevant';
import useAuth from '@hooks/useAuth';
import BasicSocialShare from '@components/common/form/BasicSocialShare';
import { useDisclosure } from '@mantine/hooks';
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import { setData } from '@utils/localStorage';
import { storageKeys } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useTranslate from '@hooks/useTranslate';
import { showErrorMessage } from '@services/notifyService';
import { useParams } from 'react-router-dom';
import useShoppingCart from '@hooks/useShoppingCart';
import BasicModal from '@components/common/form/BasicModal';
import { LESSON_KIND_TEXT } from '@constants';
import { LESSON_KIND_VIDEO } from '@constants';
import { Box, Button, Modal, ScrollArea, Skeleton, Text } from '@mantine/core';
import ReactQuill from 'react-quill';
import RelevantList from './Relevant/RelevantList';
import ModalPreview from './ModalPreview';
// import { Helmet } from 'react-helmet';
import { formatLesson } from '@utils';
import { ReactComponent as Empty } from '@assets/icons/nodata.svg';
import SkeLeton from '@components/common/elements/Skeleton';
import { defineMessages } from 'react-intl';
const message = defineMessages({
    titleNoData: 'Khoá học không tồn tại!',
    subTitleNodata: 'Vui lòng thử lại với khoá học khác, hoặc quay lại trang chủ.',
});
const DetailComponentDesktop = ({
    course,
    sellCode,
    getListReviewByCourse,
    summaryReviewData,
    courseListRef,
    noData,
    loading,
}) => {
    const { addItem } = useShoppingCart({ immediate: false });
    const [ openedShare, { open: openShare, close: closeShare } ] = useDisclosure(false);
    const [ openedPreview, { open: openPreview, close: closePreview } ] = useDisclosure(false);
    const { profile } = useAuth();
    const param = useParams();
    const translate = useTranslate();
    const { execute: registerRetail, data: registerRetailData } = useFetch(apiConfig.courseRetail.registerRetail);
    const params = useParams();

    const registerRetailHandle = () => {
        registerRetail({
            data: {
                courseId: params?.id,
            },

            onCompleted: (res) => {
                openShare();
                // copyToClipboard(AppConstants.clientUrl + `detail/${id?.id}?sellCode=${res?.data?.refCode}`);
            },
            onError: (error) => {
                showErrorMessage(translate.formatMessage('Không đăng ký thành công khóa học '));
            },
        });
        openShare;
    };

    const { execute: getLessonPreview, data: lessonPreviewData } = useFetch(apiConfig.lesson.getDetail);

    const [ lessonDetail, setLessonDetail ] = useState();
    const handlePreview = (id) => {
        if (id) {
            getLessonPreview({
                pathParams: { id: id },
                onCompleted: (res) => {
                    if (!openedPreview) openPreview();
                },
            });
        }
    };

    const CourseComponentLimit = useCallback(() => {
        return <CourseComponent data={formatLesson(course?.lessons)} openPreview={handlePreview} />;
    }, [ course?.lessons ]);
    if (noData) {
        return (
            <div className={styles.noData}>
                <Empty />
                <div className={styles.text}> {translate.formatMessage(message.titleNoData)}</div>
                <div className={styles.subText}>{translate.formatMessage(message.subTitleNodata)}</div>
            </div>
        );
    }
    return (
        <div className={styles.page}>
            <Banner course={course} loading={loading} />
            <PageLayout
            // breadScrumbs={[
            //     { name: 'Bạn sẽ học được gì ?', path: '/', active: true },
            //     { name: 'Giới thiệu', path: '/' },
            //     { name: 'Nội dung khóa học', path: '/course' },
            //     { name: 'Đánh giá', path: '/' },
            // ]}
            >
                <PageLayout.Body>
                    {course?.description ? (
                        <RichTextRender data={course?.description} style={{ width: 1100 }} />
                    ) : (
                        <SkeLeton numRow={20} />
                    )}

                    <CourseComponent data={formatLesson(course?.lessons)} openPreview={handlePreview} />
                    <ReviewComponent getListReviewByCourse={getListReviewByCourse} summaryReview={summaryReviewData} />
                    <RelevantComponent courseListRef={courseListRef} />
                </PageLayout.Body>
                <PageLayout.Side>
                    <CardDetail
                        openShare={openShare}
                        course={course}
                        sellCode={sellCode}
                        registerRetailHandle={registerRetailHandle}
                        addItem={addItem}
                    />
                </PageLayout.Side>
            </PageLayout>
            <BasicSocialShare
                opened={openedShare}
                close={closeShare}
                registerRetailData={registerRetailData}
                param={params}
            />

            <ModalPreview
                closePreview={closePreview}
                openedPreview={openedPreview}
                coursePreviewData={course?.lessons}
                lessonPreviewData={lessonPreviewData}
                handlePreview={handlePreview}
            />
        </div>
    );
};

export default DetailComponentDesktop;
