import RenderContext from '@components/common/elements/RenderContext';
import LandingPageDesktop from '@modules/layout/desktop/landing';
import LandingPageMobile from '@modules/layout/mobile/landing';
import React, { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useAppLoading from '@hooks/useAppLoading';
import SearchComponent from '@modules/layout/desktop/search';
import { useParams } from 'react-router-dom';
import SearchComponentMobile from '@modules/layout/mobile/search';
import qs from 'query-string';
const isFreeOptions = [
    {
        id: 1,
        name: 'Có trả phí',
        value: 'false',
    },
    {
        id: 2,
        name: 'Miễn phí',
        value: 'true',
    },
];
const SearchPageContainer = () => {
    const params = useParams();
    const queryParameters = new URLSearchParams(window.location.search);
    const query = queryParameters.get('query');
    const isFree = queryParameters.get('isFree');
    const currentParams = qs.parse(location.search);
    const [ categoryOptions, setCategoryOptions ] = useState();
    const { data: courseList, execute: executeCourse } = useFetch(apiConfig.course.getClientList);
    const { data: categories, execute: executeCategories } = useFetch(apiConfig.category.autocomplete);

    const handeGetListCourse = () => {
        executeCourse({
            params: { query, isFree },
            onCompleted: (res) => {},
        });
    };

    const handeGetListCategory = () => {
        executeCategories({
            params: { kind: 1 },
            onCompleted: (res) => {
                const newArray = res?.data?.content.map(({ id, name }) => ({ value: id.toString(), name: name }));
                setCategoryOptions(newArray);
            },
        });
    };
    useEffect(() => {
        handeGetListCourse();
        handeGetListCategory();
    }, [ query, isFree ]);
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: SearchComponent,
                },
                mobile: {
                    defaultTheme: SearchComponentMobile,
                },
            }}
            courseList={courseList?.data?.content || []}
            categoryOptions={categoryOptions || []}
            isFreeOptions={isFreeOptions}
        />
    );
};

export default SearchPageContainer;
