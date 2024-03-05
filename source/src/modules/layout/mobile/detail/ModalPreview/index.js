import { Box, Modal, ScrollArea, Text } from '@mantine/core';
import React, { useCallback } from 'react';
import styles from '../index.module.scss';
import { LESSON_KIND_SECTION, LESSON_KIND_TEXT, LESSON_KIND_VIDEO } from '@constants';
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import ReactQuill from 'react-quill';
import PreviewList from './PreviewList';
import Typo from '@components/common/elements/Typo';
import { ReactComponent as Close } from '@assets/icons/close.svg';
import { IconX } from '@tabler/icons-react';
import { formatLesson } from '@utils';
function getNextLessonId(currentLessonId, lessonsData) {
    for (let i = 0; i < lessonsData?.length; i++) {
        if (currentLessonId === lessonsData[i].id && lessonsData[i + 1]) return lessonsData[i + 1];
        else if (currentLessonId === lessonsData[i].id && i + 1 === lessonsData.length) return true;
    }
    return;
}
const ModalPreview = ({ closePreview, openedPreview, lessonPreviewData, coursePreviewData, handlePreview }) => {
    const handleVideoEnded = () => {
        const previewLessonList = coursePreviewData.filter(
            (obj) => obj.kind !== LESSON_KIND_SECTION && obj.isPreview == true,
        );
        const lesson = previewLessonList.find((lesson) => lesson?.id == lessonPreviewData?.data?.id);
        const nextLesson = getNextLessonId(lesson?.id, previewLessonList);

        // console.log(data);
        if (nextLesson) handlePreview(nextLesson?.id);
    };
    const VideoPlayer = useCallback(() => {
        if (!coursePreviewData) return <></>;
        return (
            <VideoJsPlayer
                source={lessonPreviewData?.data?.videoUrl}
                height={'245px'}
                handleVideoEnded={handleVideoEnded}
            />
        );
    }, [ lessonPreviewData, coursePreviewData ]);
    return (
        <Modal
            classNames={{
                header: styles.header,
                body: styles.body,
            }}
            fullScreen={true}
            zIndex={300}
            opened={openedPreview}
            radius={0}
            onClose={closePreview}
            centered
            withCloseButton={false}
            title={
                <Box px={10}>
                    <Text size={'var(--sub-font-size)'} c={'white'}>
                        Xem trước khóa học
                    </Text>
                    <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'white'} mt={10}>
                        {lessonPreviewData?.data?.course?.name}
                    </Text>
                    <i className={styles.iconClose} onClick={closePreview}>
                        <IconX size={20} color="#fff" />
                    </i>
                </Box>
            }
        >
            <Box>
                {LESSON_KIND_VIDEO === lessonPreviewData?.data?.kind && lessonPreviewData?.data?.content && (
                    <VideoPlayer />
                )}
                {LESSON_KIND_TEXT === lessonPreviewData?.data?.kind && (
                    <Box px={24} py={10}>
                        <ReactQuill
                            value={lessonPreviewData?.data?.content}
                            readOnly={true}
                            theme={'bubble'}
                            // {...props}
                        />
                    </Box>
                )}
                <PreviewList
                    handlePreview={handlePreview}
                    coursePreviewData={formatLesson(coursePreviewData)}
                    lessonActive={lessonPreviewData?.data.id}
                />
            </Box>
        </Modal>
    );
};
export default ModalPreview;
