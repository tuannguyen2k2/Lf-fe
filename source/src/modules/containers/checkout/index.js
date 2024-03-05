import RenderContext from '@components/common/elements/RenderContext';
import CheckoutComponentDesktop from '@modules/layout/desktop/checkout';
import CheckoutComponentMobile from '@modules/layout/mobile/checkout';
import React from 'react';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useAuth from '@hooks/useAuth';
import useShoppingCart from '@hooks/useShoppingCart';
const CheckoutPageContainer = () => {
    const { profile } = useAuth();
    const { cart, clearCart, removeItemCart } = useShoppingCart({ immediate: true });
    const { execute: getListCartItem, data: dataGetList } = useFetch(apiConfig.cartItem.getList, {
        immediate: true,
        params: { studentId: profile?.id },
        mappingData: (res) => {
            const cartItem = res.data?.content?.map((item) => {
                return {
                    itemCartId: item?.id,
                    ...item?.course,
                };
            });
            return {
                cartItem,
            };
        },
    });
    // const { data } = useFetch(apiConfig.news.getList, { immediate: true, mappingData: (res) => res.data.data });
    return (
        <RenderContext
            components={{
                desktop: {
                    defaultTheme: CheckoutComponentDesktop,
                },
                mobile: {
                    defaultTheme: CheckoutComponentMobile,
                },
            }}
            data={[]}
            cartItem={dataGetList?.cartItem}
            loading={getListCartItem}
        />
    );
};

export default CheckoutPageContainer;
