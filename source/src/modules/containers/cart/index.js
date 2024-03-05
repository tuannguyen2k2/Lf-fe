import RenderContext from '@components/common/elements/RenderContext';
import CartComponentDesktop from '@modules/layout/desktop/cart';
import CartComponentMobile from '@modules/layout/mobile/cart';
import useFetch from '@hooks/useFetch';
import { useEffect } from 'react';
import { getCacheAccessToken } from '@services/userService';
import React from 'react';
import apiConfig from '@constants/apiConfig';
import { useDispatch } from 'react-redux';
import useAuth from '@hooks/useAuth';
const CartPageContainer = () => {
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });
    const { execute: getList, data: dataGetList } = useFetch(apiConfig.course.getList, {
        immediate: false,
        mappingData: (res) => res?.data?.content,
    });
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: CartComponentDesktop,
                },
                mobile: {
                    defaultTheme: CartComponentMobile,
                },
            }}
            data={[]}
            executeGetList={getList}
            dataGetList={dataGetList}
        />
    );
};

export default CartPageContainer;
