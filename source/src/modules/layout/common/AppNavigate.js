import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';

import { navigateTypeEnum } from '@constants';
import { useCallback } from 'react';
import useKeepPositionScroll from '@hooks/useKeepPositionScroll';
const AppNavigate = () => {
    const navigateType = useNavigationType();
    const location = useLocation();
    // useKeepPositionScroll();
    useEffect(() => {
        const root = document.getElementsByTagName('body')[0];
        if (navigateType !== navigateTypeEnum.POP) {
            window.scrollTo(0, 0);
        }
    }, [ location.pathname, navigateType ]);

    return <Outlet />;
};

export default AppNavigate;
