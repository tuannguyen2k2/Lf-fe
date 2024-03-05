import { storageKeys } from '@constants';
import { showErrorMessage, showSucsessMessage, showWarningMessage } from '@services/notifyService';
import { getData, setData } from '@utils/localStorage';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import useFetch from './useFetch';
import apiConfig from '@constants/apiConfig';
import { getCacheAccessToken } from '@services/userService';
import useAuth from './useAuth';
import { removeItem } from '@utils/localStorage';
import { defineMessage } from 'react-intl';
import { useTransition } from 'react';
import useTranslate from './useTranslate';
import { COURSE_TRANSACTION_EXITS, errorMessage } from '@constants/ErrorCode';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItemCart, removeItemCarts, getCartItemList } from '@store/actions/cart';
const message = defineMessage({
    addItemSuccess: 'Thêm khóa học thành công',
    exitCourse: 'Khóa học đã tồn tại trong giỏ hàng ',
});
import { useRef } from 'react';
const useShoppingCart = ({ immediate = false } = {}) => {
    const translate = useTranslate();
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const { execute: addCardItem } = useFetch(apiConfig.cartItem.create);
    const { execute: deleteCardItem } = useFetch(apiConfig.cartItem.delete);
    const { execute: getList, data: dataGetList } = useFetch(apiConfig.cartItem.getList, {
        // immediate: true,
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
    const { execute: deleteAllItem } = useFetch(apiConfig.cartItem.deleteAll);

    const { execute: createList } = useFetch(apiConfig.cartItem.createList);

    const accessToken = getCacheAccessToken();
    const firstRenderRef = useRef(true);

    useEffect(() => {
        const accessToken = getCacheAccessToken();
        if (immediate) {
            if (accessToken) {
                getList({
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
            }
        }
    }, [ accessToken ]);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
        } else {
            if (dataGetList?.cartItem) {
                dispatch(getCartItemList(dataGetList?.cartItem));
            } else {
                dispatch(getCartItemList([]));
            }
        }
    }, [ dataGetList?.cartItem, profile ]);
    useEffect(() => {
        if (immediate) {
            if (firstRenderRef.current) {
                firstRenderRef.current = false;
            } else {
                const storedCart = getData(storageKeys.ITEM_CART);
                if (accessToken) {
                    if (storedCart?.length > 0) {
                        const cartItem = storedCart?.map((item) => {
                            return {
                                courseId: item?.id,
                                ...(item?.sellCode && { sellCode: item?.sellCode }),
                                // ...item?.course,
                            };
                        });
                        createList({
                            data: {
                                cartItems: cartItem,
                            },

                            onCompleted: (res) => {
                                removeItem(storageKeys.ITEM_CART);
                                getList({
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
                            },
                            onError: (error) => {},
                        });
                    }
                } else {
                    const storedCart = getData(storageKeys.ITEM_CART);

                    storedCart ? dispatch(getCartItemList(storedCart)) : dispatch(getCartItemList([]));
                }
            }
        }
    }, [ dataGetList?.cartItem, accessToken ]);

    const addItem = (product, sellCode) => {
        const currentCartItems = [ ...cart ];

        // Find the index of the product in the cart
        const existingCartItem = currentCartItems.find((item) => item?.id === product.id);

        // If the product is already in the cart, update the quantity
        if (existingCartItem) {
            // showWarningMessage('Khóa học đã tồn tại');
        } else {
            if (accessToken) {
                addCardItem({
                    data: {
                        courseId: product?.id,
                        ...(sellCode && { sellCode: sellCode }),
                    },

                    onCompleted: (res) => {
                        // showSucsessMessage('Thêm giỏ hàng thành công');

                        dispatch(addItemCart({ ...product, ...(sellCode && { sellCode: sellCode }) }));
                    },
                    onError: (error) => {
                        error?.response?.data?.code == COURSE_TRANSACTION_EXITS
                            ? showErrorMessage(translate.formatMessage(errorMessage.COURSE_TRANSACTION_EXITS))
                            : '';
                    },
                });
            } else {
                // showSucsessMessage('Thêm giỏ hàng thành công');

                dispatch(addItemCart({ ...product, ...(sellCode && { sellCode: sellCode }) }));
                localStorage.setItem(
                    storageKeys.ITEM_CART,
                    JSON.stringify([ ...cart, { ...product, ...(sellCode && { sellCode: sellCode }) } ]),
                );
            }
        }
    };

    const removeItemCart = (product) => {
        const currentCartItems = [ ...cart ];

        const existingCartItem = currentCartItems.find((item) => item?.id === product?.id);

        if (existingCartItem) {
            if (accessToken) {
                deleteCardItem({
                    pathParams: { id: product?.itemCartId },

                    onCompleted: (res) => {
                        // showSucsessMessage('Đã xóa khóa học khỏi giỏ hàng');
                        currentCartItems.splice(currentCartItems.indexOf(existingCartItem), 1);

                        dispatch(removeItemCarts(product));
                    },
                    onError: (res) => {},
                });
            } else {
                currentCartItems.splice(currentCartItems.indexOf(existingCartItem), 1);
                localStorage.setItem(storageKeys.ITEM_CART, JSON.stringify([ ...currentCartItems ]));
                // showSucsessMessage('Đã xóa khóa học khỏi giỏ hàng');
                dispatch(removeItemCarts(product));
            }
            // showSucsessMessage('Đã xóa khóa học khỏi giỏ hàng');
        }
    };

    const clearCart = () => {
        if (accessToken) {
            deleteAllItem({
                onCompleted: (res) => {
                    showSucsessMessage('Xóa giỏ hàng thành công ');
                    getList({
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
                },
                onError: (error) => {},
            });
        } else dispatch(getCartItemList([]));
    };

    return { clearCart, removeItemCart, cart, addItem };
};

export default useShoppingCart;
