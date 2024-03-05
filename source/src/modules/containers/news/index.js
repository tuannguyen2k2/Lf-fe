import RenderContext from '@components/common/elements/RenderContext';

import UserComponent from '@modules/layout/desktop/user';

import React from 'react';
import { useParams } from 'react-router-dom';
import ExpertMobile from '@modules/layout/mobile/expert';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { reviewKind } from '@constants';
import NewsComponent from '@modules/layout/desktop/news';
import NewsMobile from '@modules/layout/mobile/news';
const NewsContainer = () => {
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });

    const id = useParams();

    const { data: newsData, loading: newsDataLoading } = useFetch(apiConfig.news.clientNewsGet, {
        immediate: true,
        pathParams: { ...id },
        mappingData: (res) => res?.data,
    });

    const { data: newsDataList, loading: newsDataListLoading } = useFetch(apiConfig.news.clientNews, {
        immediate: true,
        params: { kind: reviewKind.CATEGORY_KIND_NEWS },
        mappingData: (res) => res?.data?.content,
    });


    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: NewsComponent,
                },
                mobile: {
                    defaultTheme: NewsMobile,
                },
            }}
            data={[]}
            newsData={newsData}
            newsDataLoading={newsDataLoading}
            newsDataList={newsDataList}
        />
    );
};

export default NewsContainer;
