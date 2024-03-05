import RenderContext from '@components/common/elements/RenderContext';
import LandingPageDesktop from '@modules/layout/desktop/landing';
import LandingPageMobile from '@modules/layout/mobile/landing';
import React, { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useAppLoading from '@hooks/useAppLoading';
import CategoryComponent from '@modules/layout/desktop/category';
import CategoryMobile from '@modules/layout/mobile/category';
import { useParams } from 'react-router-dom';
const CategoryPageContainer = () => {
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });
    const params = useParams();
    const { data: courseList } = useFetch(apiConfig.course.getClientList, {
        immediate: true,
        params: { categoryId: params?.id },
        mappingData: (res) => res?.data?.content,
    });
    const { data: category } = useFetch(apiConfig.category.getById, {
        immediate: true,
        pathParams: { ...params },
        mappingData: (res) => res?.data,
    });

    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: CategoryComponent,
                },
                mobile: {
                    defaultTheme: CategoryMobile,
                },
            }}
            courseList={courseList}
            category={category}
        />
    );
};

export default CategoryPageContainer;
