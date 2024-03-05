import { Box, Modal, ScrollArea, Text } from '@mantine/core';
import React from 'react';
import styles from '../index.module.scss';
import { LESSON_KIND_SECTION, LESSON_KIND_TEXT, LESSON_KIND_VIDEO } from '@constants';
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import ReactQuill from 'react-quill';
import PreviewList from './PreviewList';
import Typo from '@components/common/elements/Typo';
import { useCallback } from 'react';
import { formatLesson } from '@utils';
const ModalPreview = ({ closePreview, openedPreview, lessonPreviewData, coursePreviewData, handlePreview }) => {
    function getNextLessonId(currentLessonId, lessonsData) {
        for (let i = 0; i < lessonsData?.length; i++) {
            if (currentLessonId === lessonsData[i].id && lessonsData[i + 1]) return lessonsData[i + 1];
            else if (currentLessonId === lessonsData[i].id && i + 1 === lessonsData.length) return true;
        }
        return;
    }
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
        return (
            <VideoJsPlayer
                source={lessonPreviewData?.data?.videoUrl}
                height={'360px'}
                handleVideoEnded={() => handleVideoEnded(coursePreviewData)}
            />
        );
    }, [ lessonPreviewData?.data?.videoUrl ]);

    return (
        <Box>
            <Modal
                classNames={{
                    header: styles.header,
                    body: styles.body,
                }}
                size={720}
                style={{ top: 100 || 'auto', zIndex: 200, yOffset: 100 }}
                opened={openedPreview}
                // onAfterOpen={afterOpenModal}
                // onClose={onCloseModal}
                onClose={closePreview}
                removeScrollProps={true}
                // centered
                closeOnClickOutside={true}
                scrollAreaComponent={ScrollArea.Autosize}
                withCloseButton={false}
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
            >
                <Box px={10} py={20}>
                    {LESSON_KIND_VIDEO === lessonPreviewData?.data?.kind && lessonPreviewData?.data?.content && (
                        <VideoPlayer />
                    )}
                    {LESSON_KIND_TEXT === lessonPreviewData?.data?.kind && (
                        <Box pl={24} pb={10}>
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
        </Box>
    );
};
export default ModalPreview;
