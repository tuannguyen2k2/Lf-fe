import RichTextRender from '@components/common/elements/RichTextRender';
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import { AppShell, Box, Flex, ScrollArea } from '@mantine/core';
import React, { useCallback, useMemo } from 'react';
import LessonMenu from './LessonMenu';
import { LESSON_KIND_TEXT, LESSON_KIND_VIDEO } from '@constants';

function getFirstUndoneLesson(chapters, lessonId) {
    for (const chapter of chapters) {
        const lessons = chapter.lessons;

        if (Array.isArray(lessons)) {
            for (const lesson of lessons) {
                if (lesson.id == lessonId) {
                    return lesson;
                }
            }
        }
    }
    return null;
}

const CourseComponentDesktop = ({ courseDetailData, lessonDetailData, handleVideoEnded, doneLesson, course }) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const lessonId = queryParameters.get('lessonId');
    const lessonItemFromList = useMemo(() => {
        const lesson = getFirstUndoneLesson(courseDetailData, lessonId);
        if (lesson) return lesson;
        else return {};
    }, [ lessonId, courseDetailData ]);

    const VideoPlayer = useCallback(() => {
        if (!lessonItemFromList) return <></>;
        console.log(1);
        return (
            <VideoJsPlayer
                source={lessonDetailData?.videoUrl}
                handleVideoEnded={() => handleVideoEnded(lessonItemFromList, courseDetailData)}
                track={true}
                secondProgress={lessonDetailData?.secondProgress}
                isFinished={lessonDetailData?.isFinished}
            />
        );
    }, [ lessonDetailData?.videoUrl, lessonId ]);

    return (
        <div>
            <AppShell
                aside={{
                    width: 'calc(24%)',
                    // breakpoint: 'sm',
                }}
                withBorder={false}
            >
                <AppShell.Main withBorder={false}>
                    <Box mt={'-10px'}>
                        {LESSON_KIND_VIDEO === lessonDetailData?.kind && lessonDetailData?.content && (
                            <>
                                <VideoPlayer />
                                <Flex justify="center" mt={40} align="center" p={10}>
                                    <RichTextRender data={course?.description} />
                                </Flex>
                            </>
                        )}

                        {/* <Breadcrumb
                            className={styles.breadcrumb}
                            routes={[
                                { name: 'Bạn sẽ học được gì ?', path: '/', active: true },
                                { name: 'Giới thiệu', path: '/' },
                                { name: 'Nội dung khóa học', path: '/' },
                                { name: 'Đánh giá', path: '/' },
                            ]}
                        /> */}
                        {LESSON_KIND_TEXT === lessonDetailData?.kind && (
                            <Box p={20}>
                                <RichTextRender data={lessonDetailData?.content} MAX_LENGTH_TEXT_EDITOR={4000} />
                            </Box>
                        )}
                    </Box>
                </AppShell.Main>
                <AppShell.Aside withBorder={true} zIndex={80}>
                    <ScrollArea>
                        <LessonMenu data={courseDetailData} doneLesson={doneLesson} course={course} />
                    </ScrollArea>
                </AppShell.Aside>
            </AppShell>
        </div>
    );
};

export default CourseComponentDesktop;
