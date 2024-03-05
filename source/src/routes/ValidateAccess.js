import React from 'react';

import { accessRouteTypeEnum } from '@constants';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import routes from '.';
import { useDispatch } from 'react-redux';

const ValidateAccess = ({
    authRequire,
    component: Component,
    componentProps,
    isAuthenticated,
    profile,
    layout: Layout,
}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const getRedirect = (authRequire) => {
        if (authRequire === accessRouteTypeEnum.NOT_LOGIN && isAuthenticated) {
            return routes.homePage.path;
        }

        if (authRequire === accessRouteTypeEnum.REQUIRE_LOGIN && !isAuthenticated) {
            return routes.homePage.path;
        }

        // check permistion

        return false;
    };

    const redirect = getRedirect(authRequire);

    if (redirect) {
        return <Navigate state={{ from: location }} key={redirect} to={redirect} replace />;
    }

    return (
        <Component {...(componentProps || {})} dispatch={dispatch}>
            <Outlet />
        </Component>
    );
};

export default ValidateAccess;
