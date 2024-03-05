import RenderContext from '@components/common/elements/RenderContext';

import UserComponent from '@modules/layout/desktop/user';

import React from 'react';
import { useParams } from 'react-router-dom';
import ExpertMobile from '@modules/layout/mobile/expert';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
const UserContainer = () => {
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });

    const id = useParams();

    const { data: expert, loading: expertLoading } = useFetch(apiConfig.expert.getClientById, {
        immediate: true,
        pathParams: { ...id },
    });

    const { data: courseListOfEpexrt, loading: courseListOfEpexrtLoading } = useFetch(apiConfig.course.getClientList, {
        immediate: true,
        params: { expertId: id?.id },
        mappingData: (res) => res?.data?.content,
    });
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: UserComponent,
                },
                mobile: {
                    defaultTheme: ExpertMobile,
                },
            }}
            data={[]}
            expert={expert}
            courseListOfEpexrt={courseListOfEpexrt}
            loading={expertLoading}
        />
    );
};

export default UserContainer;
