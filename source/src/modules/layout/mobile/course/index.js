/* eslint-disable array-bracket-spacing */
import VideoJsPlayer from '@components/common/elements/VideoPlayer/VideoJsPlayer';
import { Box } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import LessonMenu from './LessonMenu';
import useDevices from '@hooks/useDevices';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { LESSON_KIND_TEXT, LESSON_KIND_VIDEO } from '@constants';
import RichTextRender from '@components/common/elements/RichTextRender';
import Container from '@components/common/elements/Container';
import { toast } from 'react-toastify';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { formatLesson } from '@utils';
import { useRef } from 'react';
import { useCallback } from 'react';
const message = defineMessages({
    completion: 'Hoàn thành bài học!',
});
import { useMemo } from 'react';
import useQueryParams from '@hooks/useQueryParams';
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
function getNextLessonId(currentLessonId, lessonsData) {
    for (let i = 0; i < lessonsData.length; i++) {
        if (currentLessonId === lessonsData[i].id && lessonsData[i + 1]) return lessonsData[i + 1];
        else if (currentLessonId === lessonsData[i].id && i + 1 === lessonsData.length) return true;
    }
    return;
}

const CourseComponentMobile = ({
    reviewData,
    executeReviewData,
    courseDetailData,
    lessonDetailData,
    handleVideoEnded,
    doneLesson,
}) => {
    const translate = useTranslate();

    const queryParameters = new URLSearchParams(window.location.search);
    const lessonId = queryParameters.get('lessonId');

    const lessonItemFromList = useMemo(() => {
        const lesson = getFirstUndoneLesson(courseDetailData, lessonId);
        if (lesson) return lesson;
        else return {};
    }, [lessonId, courseDetailData]);

    const VideoPlayer = useCallback(() => {
        if (!lessonItemFromList) return <></>;
        return (
            <div style={{ marginTop: 70, position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
                <VideoJsPlayer
                    height="230px"
                    source={lessonDetailData?.videoUrl}
                    handleVideoEnded={() => handleVideoEnded(lessonItemFromList, courseDetailData)}
                    secondProgress={lessonDetailData?.secondProgress}
                    isFinished={lessonDetailData?.isFinished}
                />
            </div>
        );
    }, [lessonDetailData?.videoUrl, lessonId]);

    return (
        <div style={{ position: 'relative' }}>
            <Box>
                {LESSON_KIND_VIDEO === lessonDetailData?.kind && lessonDetailData?.content && <VideoPlayer />}

                {LESSON_KIND_TEXT === lessonDetailData?.kind && (
                    <Box>
                        <RichTextRender data={lessonDetailData?.content} style={{ padding: 15 }} />
                        <LessonMenu
                            lessonId={lessonId}
                            data={courseDetailData}
                            reviewData={reviewData}
                            executeReviewData={executeReviewData}
                            doneLesson={doneLesson}
                            style={{ width: '100%' }}
                        />
                    </Box>
                )}
            </Box>
            {LESSON_KIND_VIDEO === lessonDetailData?.kind && (
                <LessonMenu
                    lessonId={lessonId}
                    data={courseDetailData}
                    reviewData={reviewData}
                    executeReviewData={executeReviewData}
                    doneLesson={doneLesson}
                    style={{ marginTop: 300 }}
                />
            )}
        </div>
    );
};

export default CourseComponentMobile;
