import RenderContext from '@components/common/elements/RenderContext';
import { LESSON_KIND_SECTION, LESSON_KIND_TEXT } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useQueryParams from '@hooks/useQueryParams';
import useTranslate from '@hooks/useTranslate';
import CourseComponentDesktop from '@modules/layout/desktop/course';
import CourseComponentMobile from '@modules/layout/mobile/course';
import { actions } from '@store/actions/app';
import { formatLesson } from '@utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { defineMessages } from 'react-intl';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const message = defineMessages({
    completion: 'Hoàn thành bài học!',
});
function getNextLessonId(currentLessonId, lessonsData) {
    for (let i = 0; i < lessonsData.length; i++) {
        if (currentLessonId === lessonsData[i].id && lessonsData[i + 1]) return lessonsData[i + 1];
        else if (currentLessonId === lessonsData[i].id && i + 1 === lessonsData.length) return true;
    }
    return;
}

const CoursePageContainer = ({ dispatch }) => {
    const translate = useTranslate();
    const videoJsPlayerRef = useRef();
    const { setQueryParams } = useQueryParams();

    const [ firstLesson, setFirstLesson ] = useState();

    const queryParameters = new URLSearchParams(window.location.search);
    const lessonId = queryParameters.get('lessonId');

    const [ doneLesson, setDoneLesson ] = useState([]);
    useEffect(() => {
        dispatch(actions.changeHeader(false));
        return () => {
            dispatch(actions.changeHeader(true));
        };
    }, []);
    const params = useParams();
    const { data: courseDetailData, execute: courseDetailexcute } = useFetch(apiConfig.course.getDetail, {
        immediate: true,
        pathParams: {
            id: params?.id,
        },
        mappingData: ({ data }) => {
            return data;
        },
    });

    const { execute: executeLessonDetail, data: lessonDetailData } = useFetch(apiConfig.lesson.getDetail);
    const { execute: executeCompletion, data: completionData } = useFetch(apiConfig.completion.completionLesson);

    const { data: reviewData, execute: executeReviewData } = useFetch(apiConfig.review.myReview, {
        immediate: false,
        mappingData: ({ data }) => {
            return data;
        },
    });

    useEffect(() => {
        const firstLesson = courseDetailData?.lessons?.find((lesson) => lesson.kind !== LESSON_KIND_SECTION);
        const unDoneLesson = courseDetailData?.lessons?.find((lesson) => {
            return lesson?.kind !== LESSON_KIND_SECTION && lesson?.isDone == false;
        });

        setFirstLesson(firstLesson);
        !lessonId && firstLesson && setQueryParams({ lessonId: firstLesson?.id });

        // unDoneLesson && !lessonId
        //     ? setQueryParams({ lessonId: unDoneLesson?.id })
        //     : firstLesson && !lessonId && setQueryParams({ lessonId: firstLesson?.id });
    }, [ courseDetailData ]);

    useEffect(() => {
        if (lessonId) {
            executeLessonDetail({
                pathParams: {
                    id: lessonId,
                },
                onCompleted: (res) => {
                    if (res?.data?.kind === LESSON_KIND_TEXT) {
                        const lesson = courseDetailData?.lessons?.find((lesson) => lesson?.id == lessonId);
                        if (!lesson?.isDone && !doneLesson?.includes(`${lesson?.id}`)) {
                            handleCreateCompletion(params?.id, lessonId || firstLesson?.id);
                        }
                    }
                },
            });
        }
    }, [ courseDetailData, lessonId ]);
    const handleCreateCompletion = useCallback((courseId, lessonId) => {
        executeCompletion({
            data: {
                courseId: courseId,
                lessonId: lessonId,
            },
            onCompleted: (res) => {
                // toast.success(translate.formatMessage(message.completion));
                // courseDetailexcute({
                //     pathParams: {
                //         id: params?.id,
                //     },
                //     mappingData: ({ data }) => {
                //         return data;
                //     },
                // });
                setDoneLesson([ ...doneLesson, lessonId ]);
            },
        });
    });

    const handleVideoEnded = () => {
        const lesson = courseDetailData?.lessons?.find((lesson) => lesson?.id == lessonId);
        if (!lesson.isDone && !doneLesson?.includes(`${lesson?.id}`)) {
            handleCreateCompletion(params?.id, lessonId || firstLesson?.id);
        }
        let nextLesson;

        for (let j = 0; j < formatLesson(courseDetailData?.lessons).length; j++) {
            const data = getNextLessonId(
                lessonDetailData?.data?.id,
                formatLesson(courseDetailData?.lessons)[j]?.lessons,
            );
            if (data === true) nextLesson = formatLesson(courseDetailData?.lessons)[j + 1]?.lessons?.[0];
            else if (data) nextLesson = data;
        }
        if (!nextLesson && videoJsPlayerRef.current) {
            videoJsPlayerRef.current.pause();
        }
        if (nextLesson) setQueryParams({ lessonId: nextLesson.id });
    };
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: CourseComponentDesktop,
                },
                mobile: {
                    defaultTheme: CourseComponentMobile,
                },
            }}
            data={[]}
            reviewData={reviewData}
            executeReviewData={executeReviewData}
            courseDetailData={formatLesson(courseDetailData?.lessons) || []}
            lessonDetailData={lessonDetailData?.data || {}}
            handleVideoEnded={handleVideoEnded}
            doneLesson={doneLesson}
            course={courseDetailData}
        />
    );
};

export default CoursePageContainer;
