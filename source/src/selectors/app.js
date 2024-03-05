import { createSelector } from 'reselect';

export const selectAppLoading = createSelector(
    (state) => state.app.appLoading,
    (appLoading) => appLoading > 0,
);

export const selectActionLoading = (type) =>
    createSelector(
        (state) => state.app[type],
        (loading) => loading,
    );

export const selectAppTheme = createSelector(
    (state) => state.app.theme,
    (theme) => theme,
);

export const selectAppLocale = createSelector(
    (state) => state.app.locale,
    (locale) => locale,
);

export const selectHeaderType = createSelector(
    (state) => state.app.headerDefault,
    (headerDefault) => headerDefault,
);
export const selectedNotificationSelector = createSelector(
    (state) => state.app.notification,
    (notification) => notification,
);
export const selectSlideshow = createSelector(
    (state) => state.app.slideShow,
    (slideShow) => slideShow,
);
