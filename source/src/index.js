import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from '@store';
import reportWebVitals from './reportWebVitals';
import { ensureArray } from '@utils';

import App from './App';
import LanguageProvider from '@locales/LanguageProvider';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'video.js/dist/font/VideoJS.ttf';
import 'videojs-font/css/videojs-icons.css';
import 'video.js/dist/video-js.css'; // Import CSS for Video.js
import '@videojs/themes/dist/sea/index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const theme = createTheme({
    // colorScheme: 'light',
    colors: {
        'ocean-blue': [
            '#7AD1DD',
            '#5FCCDB',
            '#44CADC',
            '#2AC9DE',
            '#1AC2D9',
            '#11B7CD',
            '#09ADC3',
            '#0E99AC',
            '#128797',
            '#147885',
        ],
    },
    breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1280px',
        xxl: '1532px',
    },

    fontFamily: 'SFCompact, sans-serif',
    primaryColor: 'ocean-blue',
    /** Put your mantine theme override here */
});
import '@assets/scss/index.scss';
import { setData } from '@utils/localStorage';
import { storageKeys } from '@constants';

const queryParameters = new URLSearchParams(window.location.search);
const refcode = queryParameters.get('refCode');
if (refcode) {
    setData(storageKeys.REF_CODE, refcode);
}
render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId="208203453170-958ocj82latc576uk8013m6qqar61p58.apps.googleusercontent.com">
                <LanguageProvider>
                    <MantineProvider theme={theme}>
                        <ModalsProvider>
                            <App />
                            <Notifications position="top-right" zIndex={10000} />
                        </ModalsProvider>
                    </MantineProvider>
                </LanguageProvider>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
