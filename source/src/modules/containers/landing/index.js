import RenderContext from '@components/common/elements/RenderContext';
import LandingPageDesktop from '@modules/layout/desktop/landing';
import LandingPageMobile from '@modules/layout/mobile/landing';
import React, { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useAppLoading from '@hooks/useAppLoading';
import { useSelector } from 'react-redux';
import { selectSlideshow } from '@selectors/app';
import { STATUS_ACTIVE, categoryKinds, reviewKind } from '@constants';
const LandingPageContainer = () => {
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });
    // const { data: slideShowData, loading: slideShowDataLoading } = useFetch(apiConfig.slideShow.getList, {
    //     immediate: true,
    //     mappingData: (res) => res?.data?.content,
    // });

    const slideShowData = useSelector(selectSlideshow);
    const { data: expertList } = useFetch(apiConfig.expert.getClientList, {
        params: { isOutstanding: true },
        immediate: true,
        mappingData: (res) => res?.data?.content,
    });
    // const { data: courseList } = useFetch(apiConfig.course.getClientList, {
    //     immediate: true,

    //     mappingData: (res) => res?.data?.content,
    // });
    const { data: categoryCourseList, loading: courseListLoading } = useFetch(apiConfig.categoryHome.getListClient, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_NEWS, status: STATUS_ACTIVE },
        mappingData: (res) => res?.data?.content,
    });
    const { data: categoryCourseFree, loading: courseFreeLoading } = useFetch(apiConfig.categoryHome.getListClient, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_TOP_FREE, status: STATUS_ACTIVE },
        mappingData: (res) => res?.data?.content?.[0],
    });
    const { data: categoryCourseTop, loading: courseTopLoading } = useFetch(apiConfig.categoryHome.getListClient, {
        immediate: true,
        params: { kind: categoryKinds.CATEGORY_KIND_TOP_CHARGE, status: STATUS_ACTIVE },
        mappingData: (res) => res?.data?.content?.[0],
    });

    const { data: categoryCourseNew, loading: categoryCourseNewLoading } = useFetch(
        apiConfig.categoryHome.getListClient,
        {
            immediate: true,
            params: { kind: categoryKinds.CATEGORY_KIND_TOP_NEW, status: STATUS_ACTIVE },
            mappingData: (res) => res?.data?.content,
        },
    );

    const { data: reviewData, loading: reviewDataLoading } = useFetch(apiConfig.review.clientReview, {
        immediate: true,
        params: { kind: reviewKind.REVIEW_KIND_SYSTEM, status: STATUS_ACTIVE },
        mappingData: (res) => res?.data?.content,
    });

    const { data: newsData, loading: newsDataLoading } = useFetch(apiConfig.news.clientNews, {
        immediate: true,
        params: { kind: reviewKind.CATEGORY_KIND_NEWS },
        mappingData: (res) => res?.data?.content,
    });
    // const { setLoading } = useAppLoading();
    // setLoading(summaryReviewLoading && getListReviewByCourseLoading && courseLoading);

    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: LandingPageDesktop,
                },
                mobile: {
                    defaultTheme: LandingPageMobile,
                },
            }}
            slideShowData={slideShowData || []}
            expertList={expertList || []}
            categoryCourseList={categoryCourseList}
            categoryCourseFree={categoryCourseFree}
            categoryCourseTop={categoryCourseTop}
            categoryCourseNew={categoryCourseNew}
            reviewData={reviewData}
            courseFreeLoading={courseFreeLoading}
            courseTopLoading={courseTopLoading}
            categoryCourseNewLoading={categoryCourseNewLoading}
            courseListLoading={courseListLoading}
            reviewDataLoading={reviewDataLoading}
            newsData={newsData}
            newsDataLoading={newsDataLoading}
        />
    );
};

export default LandingPageContainer;
