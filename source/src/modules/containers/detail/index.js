import RenderContext from '@components/common/elements/RenderContext';
import useFetch from '@hooks/useFetch';
import DetailComponentDesktop from '@modules/layout/desktop/detail';
import DetailComponentMobile from '@modules/layout/mobile/detail';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '@constants/apiConfig';
import useAppLoading from '@hooks/useAppLoading';

const DetailPageContainer = () => {
    const id = useParams();
    const queryParameters = new URLSearchParams(window.location.search);
    const sellCode = queryParameters.get('sellCode');
    const [ noData, setNoData ] = useState(false);
    const {
        data: course,
        loading: courseLoading,
        execute: excuteCourse,
    } = useFetch(apiConfig.course.getDetail, {
        immediate: false,
        pathParams: { ...id },
        params: { ...(sellCode && { sellCode: sellCode }) },
        mappingData: (res) => res?.data,
    });

    const {
        data: getListReviewByCourse,
        loading: getListReviewByCourseLoading,
        execute: excuteGetListReviewByCourse,
    } = useFetch(apiConfig.review.getListCourse, {
        pathParams: { ...id },
        mappingData: (res) => res?.data?.content,
    });

    const {
        execute: summaryReview,
        data: summaryReviewData,
        loading: summaryReviewLoading,
    } = useFetch(apiConfig.review.reviewCourseStar, {
        pathParams: { courseId: id?.id },
        mappingData: (res) => {
            return res?.data;
        },
    });

    const { data: courseListRef, execute: executeCourseListRef } = useFetch(apiConfig.course.getClientList, {
        immediate: true,
        params: {
            refWithId: id.id,
        },
        mappingData: (res) => res?.data?.content,
    });

    useEffect(() => {
        excuteCourse({
            pathParams: { ...id },
            params: { ...(sellCode && { sellCode: sellCode }) },
            onCompleted: (res) => {},
            onError: () => {
                setNoData(true);
            },
        });
        summaryReview({
            pathParams: { courseId: id?.id },
            mappingData: (res) => {
                return res?.data;
            },
        });
        executeCourseListRef({
            params: {
                refWithId: id.id,
            },
            mappingData: (res) => res?.data?.content,
        });
        excuteGetListReviewByCourse({ pathParams: { ...id }, mappingData: (res) => res?.data?.content });
    }, [ id?.id ]);
    const { setLoading } = useAppLoading();
    // setLoading(summaryReviewLoading && getListReviewByCourseLoading && courseLoading);
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: DetailComponentDesktop,
                },
                mobile: {
                    defaultTheme: DetailComponentMobile,
                },
            }}
            data={[]}
            course={course}
            sellCode={sellCode}
            getListReviewByCourse={getListReviewByCourse}
            summaryReviewData={summaryReviewData}
            courseListRef={courseListRef}
            loading={courseLoading}
            noData={noData}
        />
    );
};

export default DetailPageContainer;
