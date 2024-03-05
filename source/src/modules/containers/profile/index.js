import RenderContext from '@components/common/elements/RenderContext';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import ProfileComponent from '@modules/layout/desktop/profile';
import ProfileMobileComponent from '@modules/layout/mobile/profile';
import { accountActions } from '@store/actions';
import React, { useEffect } from 'react';
import useDevices from '@hooks/useDevices';

const ProfilePageContainer = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const isFree = queryParameters.get('isFree');
    const isFinished = queryParameters.get('isFinished');
    const { isMobile } = useDevices();
    const { execute: executeMyCourse, data: myCourse, loading: myCourseLoading } = useFetch(apiConfig.student.myCourse);
    const handleGetLesson = (isFinished) => {
        executeMyCourse({
            params: {
                // isFree: isFree ? isFree : true,
                isFinished: isFinished ? isFinished : false,
            },
            onCompleted: (res) => {
                return res;
            },
        });
    };
    useEffect(() => {
        handleGetLesson(isFinished);
    }, [ isFinished ]);

    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: ProfileComponent,
                },
                mobile: {
                    defaultTheme: ProfileMobileComponent,
                },
            }}
            myCourse={myCourse?.data}
        />
    );
};

export default ProfilePageContainer;
