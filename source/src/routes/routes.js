import React, { useEffect } from 'react';

import { Routes, BrowserRouter, Route } from 'react-router-dom';

import ValidateAccess from './ValidateAccess';

import routes from '.';
import useAuth from '@hooks/useAuth';
import Loading from '@components/common/loading';
import PageNotFound from '@components/common/page/PageNotFound';
import AppNavigate from '@modules/layout/common/AppNavigate';
import { webSocket } from '@utils/webSocket';
import { getCacheAccessToken } from '@services/userService';
import useTranslate from '@hooks/useTranslate';
import { useDispatch } from 'react-redux';
import { appActions, cartActions } from '@store/actions';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import useShoppingCart from '@hooks/useShoppingCart';
import InitRoute from './InitRoute';
const routesArray = Object.values(routes);

const AppRoutes = () => {
    const { isAuthenticated, loading: loadingProfile, profile } = useAuth();
    const translate = useTranslate();

    const dispatch = useDispatch();
    const { data: slideShow, execute: executeSlideshow } = useFetch(apiConfig.slideShow.getList, {
        immediate: true,
        mappingData: (res) => res.data.content,
    });

    useEffect(() => {
        if (slideShow) {
            dispatch(appActions.getSlideshow(slideShow));
        }
    }, [ slideShow ]);
    const { cart } = useShoppingCart({ immediate: true });
    const renderRoute = (route) => {
        // TODO: handle render component by site config
        const component = route.component || PageNotFound;

        return (
            <Route
                key={route.path || 'not-found'}
                path={route.path}
                index={route.index}
                element={
                    loadingProfile ? (
                        <Loading show />
                    ) : (
                        <ValidateAccess
                            authRequire={route.auth}
                            component={component}
                            componentProps={route.componentProps}
                            isAuthenticated={isAuthenticated}
                            profile={profile}
                        />
                    )
                }
            />
        );
    };
    useEffect(() => {
        const accessToken = getCacheAccessToken();
        if (accessToken) webSocket(accessToken, translate);
    }, []);

    return (
        <BrowserRouter>
            <InitRoute />
            <Routes>
                <Route element={<AppNavigate />}>{routesArray.map(renderRoute)}</Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
