import { createAction } from '@store/utils';

export const showAppLoading = createAction('app/SHOW_LOADING');
export const hideAppLoading = createAction('app/HIDE_LOADING');
export const toggleActionLoading = createAction('app/ACTION_LOADING');
export const changeLanguage = createAction('app/CHANGE_LANGUAGE');
export const uploadFile = createAction('app/UPLOAD_FILE');
export const changeHeader = createAction('app/CHANGE_HEADER');
export const showAppCartModal = createAction('app/SHOW_CART_MODAL');
export const hideAppCartModal = createAction('app/HIDE_CART_MODAL');
export const setNotification = createAction('app/SET_NOTIFICATION');

export const getSlideshow = createAction('app/GET_SLIDE_SHOW');
export const actions = {
    showAppLoading,
    hideAppLoading,
    toggleActionLoading,
    changeLanguage,
    uploadFile,
    showAppCartModal,
    hideAppCartModal,
    changeHeader,
    setNotification,
    getSlideshow,
};
