import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '@store/actions';
import { actions } from '@store/actions/app';

const InitRoute = () => {
    const { isAuthenticated } = useAuth();
    const dispatch = useDispatch();

    const {
        data: dataMyNotification,
        execute: executeGetDataMyNotification,
        loading: loadingDataMyNotification,
    } = useFetch(apiConfig.notification.myNotification, {
        immediate: false,
        mappingData: ({ data }) => {
            const pageTotal = data?.totalPages;
            const unReadTotal = data?.totalUnread;
            const listNotification = data?.content?.map((item) => {
                const msg = JSON.parse(item?.msg);
                return {
                    id: item?.id,
                    kind: item?.kind,
                    createdDate: item?.createdDate,
                    state: item?.state,
                    projectId: msg?.projectId,
                    taskName: msg?.taskName,
                    projectName: msg?.projectName,
                    courseId: msg?.courseId,
                    lectureName: msg?.lectureName,
                    courseName: msg?.courseName,
                };
            });
            return {
                pageTotal,
                unReadTotal,
                listNotification,
            };
        },
    });
    useEffect(() => {
        if (isAuthenticated) {
            executeGetDataMyNotification();
            dispatch(actions.setNotification(dataMyNotification));
        }
    }, [ isAuthenticated ]);
    useEffect(() => {
        if (dataMyNotification) {
            dispatch(actions.setNotification(dataMyNotification));
        }
    }, [ dataMyNotification ]);
    return null;
};
export default InitRoute;
