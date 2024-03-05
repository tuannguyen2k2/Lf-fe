import React, { useCallback } from 'react';
import DetailInfo from './DetailInfo';
import { Box } from '@mantine/core';
import RichTextRender from '@components/common/elements/RichTextRender';
import Recommended from '../cart/Recommended';
import CourseCarouselList from '../common/CourseCarouselList';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import LessonList from './LessonList';
import Review from './Review';
import styles from './index.module.scss';
import RecommendCourse from './RecommendCourse';
import Container from '@components/common/elements/Container';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage } from '@services/notifyService';
import useTranslate from '@hooks/useTranslate';
import useDisclosure from '@hooks/useDisclosure';
import BasicSocialShare from '@components/common/form/BasicSocialShare';
import BasicModal from '@components/common/form/BasicModal';
import { LESSON_KIND_TEXT, LESSON_KIND_VIDEO } from '@constants';
import { Text, Modal } from '@mantine/core';
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import ReactQuill from 'react-quill';
import { ScrollArea } from '@mantine/core';
import ModalPreview from './ModalPreview';
import { formatLesson } from '@utils';
import { ReactComponent as Empty } from '@assets/icons/nodata.svg';

import { defineMessages } from 'react-intl';
const message = defineMessages({
    titleNoData: 'Khoá học không tồn tại!',
    subTitleNodata: 'Vui lòng thử lại với khoá học khác, hoặc quay lại trang chủ.',
});
const DetailComponentMobile = ({
    course,
    sellCode,
    summaryReviewData,
    getListReviewByCourse,
    courseListRef,
    loading,
    noData,
}) => {
    const { execute: registerRetail, data: registerRetailData } = useFetch(apiConfig.courseRetail.registerRetail);
    const params = useParams();
    const translate = useTranslate();
    const [ openedPreview, { open: openPreview, close: closePreview } ] = useDisclosure(false);
    const [ openedShare, { open: openShare, close: closeShare } ] = useDisclosure(false);
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

    const handlePreview = (id) => {
        getLessonPreview({
            pathParams: { id: id },
            onCompleted: (res) => {
                openPreview();
            },
            onError: (error) => {
                showErrorMessage(translate.formatMessage('Không đăng ký thành công khóa học '));
            },
        });
    };
    if (noData) {
        return (
            <div className={styles.noData}>
                <Empty width={180} />
                <div className={styles.text}> {translate.formatMessage(message.titleNoData)}</div>
                <div className={styles.subText}>{translate.formatMessage(message.subTitleNodata)}</div>
            </div>
        );
    }
    return (
        <Container>
            <Box>
                <DetailInfo
                    data={course}
                    registerRetailHandle={registerRetailHandle}
                    sellCode={sellCode}
                    loading={loading}
                />
                <Box mb={10}></Box>
                {course?.field?.description && (
                    <Typo type="bold" size="small">
                        <FormattedMessage defaultMessage="Bạn sẽ học được gì" />
                    </Typo>
                )}
                {course?.description && <RichTextRender data={course?.description} />}

                <LessonList data={formatLesson(course?.lessons)} handlePreview={handlePreview} />
                <Review summaryReviewData={summaryReviewData} getListReviewByCourse={getListReviewByCourse} />
                <RecommendCourse courseListRef={courseListRef} />
                <BasicSocialShare
                    opened={openedShare}
                    close={closeShare}
                    registerRetailData={registerRetailData}
                    param={params}
                />

                {/* <Modal
                    opened={openedPreview}
                    radius={0}
                    transitionProps={{ transition: 'fade', duration: 200 }}
                    zIndex={300}
                    onClose={closePreview}
                    size={'360px'}
                    centered
                    classNames={{
                        header: styles.header,
                    }}
                    title={
                        <Box px={10}>
                            <Text size={'var(--sub-font-size)'} c={'white'}>
                                Xem trước khóa học
                            </Text>
                            <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'white'} mt={10}>
                                {lessonPreviewData?.data?.course?.name}
                            </Text>
                        </Box>
                    }
                    scrollAreaComponent={ScrollArea.Autosize}
                    withCloseButton={false}
                >
                    <Box mt={10}>
                        {LESSON_KIND_VIDEO === lessonPreviewData?.data?.kind && lessonPreviewData?.data?.content && (
                            <VideoJsPlayer source={lessonPreviewData?.data?.videoUrl} height={'180px'} />
                        )}
                        {LESSON_KIND_TEXT === lessonPreviewData?.data?.kind && (
                            <ReactQuill
                                value={lessonPreviewData?.data?.content}
                                readOnly={true}
                                theme={'bubble'}
                                // {...props}
                            />
                            // <RichTextRender data={lessonPreviewData?.data?.content} fullText={true} />
                        )}
                    </Box>
                </Modal> */}
                <ModalPreview
                    closePreview={closePreview}
                    openedPreview={openedPreview}
                    coursePreviewData={course?.lessons}
                    lessonPreviewData={lessonPreviewData}
                    handlePreview={handlePreview}
                />
            </Box>
        </Container>
    );
};

export default DetailComponentMobile;
