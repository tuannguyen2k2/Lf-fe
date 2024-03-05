import qs from 'query-string';
import {
    CurrentcyPositions,
    DATE_FORMAT_DISPLAY,
    DATE_SHORT_MONTH_FORMAT,
    DEFAULT_LANGUAGE_ID,
    THEMES,
    KEYS,
    DEFAULT_FORMAT,
    LESSON_KIND_SECTION,
} from '@constants';
import dayjs from 'dayjs';
import { getObjectData } from './localStorage';
import { showSucsessMessage } from '@services/notifyService';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
import moment from 'moment/moment';
require('moment/locale/vi');

export const convertGlobImportToObject = (modules) =>
    modules
        .filter((module) => !!module.default)
        .reduce(
            (rs, cur) => ({
                ...rs,
                [cur.default.name]: cur.default,
            }),
            {},
        );

export const convertGlobImportToArray = (modules) =>
    modules.filter((module) => !!module.default).map((module) => module.default);

export const destructCamelCaseString = (string) => {
    const arrString = [ ...string ];
    const newArrString = [];
    arrString.forEach((char, index) => {
        if (char.charCodeAt(0) > 90) {
            newArrString.push(char);
        } else {
            index && newArrString.push('-');
            newArrString.push(char.toLowerCase());
        }
    });
    return newArrString.join('');
};

export const getBrowserTheme = () => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return isDark ? THEMES.DARK : THEMES.LIGHT;
};

export const makeURL = (baseURL, params, pathParams) => {
    for (let key of Object.keys(pathParams || {})) {
        const keyCompare = `:${key}`;
        if (baseURL.indexOf(keyCompare) !== -1) {
            baseURL = baseURL.replace(keyCompare, pathParams[key]);
        }
    }

    if (params) {
        baseURL = baseURL + '?' + qs.stringify(params);
    }

    return baseURL;
};

export const parseURL = (url) => {
    try {
        return new URL(url);
    } catch (error) {
        return '';
    }
};

export const getYTEmbedLinkFromYTWatchLink = (watchLink) => {
    if (!watchLink) {
        return '';
    }

    const { v } = qs.parse(parseURL(watchLink).search);
    return v ? `https://www.youtube.com/embed/${v}?autoplay=1&mute=1` : watchLink;
};

export const getYoutubeVideoID = (url) => {
    let pattern = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return pattern.exec(url)?.[3];
};

export const formatNumber = (value, setting) => {
    if (value) {
        const decimalPosition = value.toString().indexOf('.');
        if (decimalPosition > 0) {
            const intVal = value.toString().substring(0, decimalPosition);
            const decimalVal = value.toString().substring(decimalPosition + 1);
            return `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalVal}`;
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (value === 0) return 0;
    return '';
};

export const formatDateString = (dateString, formatDate = DATE_SHORT_MONTH_FORMAT) => {
    return dayjs(dateString).format(formatDate);
};

export const removeAccents = (str) => {
    if (str)
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    return str;
};

export const validateUsernameForm = (rule, username) => {
    return /^[a-z0-9_]+$/.exec(username)
        ? Promise.resolve()
        : Promise.reject('Username chỉ bao gồm các ký tự a-z, 0-9, _');
};

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const delay = (ms) => new Promise((reslove) => setTimeout(reslove, ms));

export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const filterLanguage = (data, languageId = DEFAULT_LANGUAGE_ID, size = 1) => {
    let mappedArray = [];
    for (var i = 0; i < size; i++) {
        let returnItem = {};
        if (data[i]) {
            if (data[i].info)
                data[i].info.map((lang) => {
                    if (lang.languageId === languageId) returnItem = lang;
                });
            mappedArray.push(returnItem);
        } else break;
    }
    return mappedArray;
};

export const relativePosition = (element, target) => {
    if (!element || !target) return;

    const elementRect = element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = elementRect.top - targetRect.top;
    const left = elementRect.left - targetRect.left;
    return { top, left };
};

// export const convertUtcToLocalTime = (utcTime, format = DATE_FORMAT_DISPLAY) => {
//     try {
//         if (utcTime) return dayjs.utc(utcTime).format(format);
//     } catch (error) {
//         return '';
//     }
// };

export const convertUtcToLocalTime = (utcTime, inputFormat = DATE_FORMAT_DISPLAY, format = DATE_FORMAT_DISPLAY) => {
    try {
        if (utcTime) return moment(moment.utc(utcTime, inputFormat).toDate()).format(format);
        return '';
    } catch (err) {
        return '';
    }
};

export const formatTimeDifference = (utcTime, format = DEFAULT_FORMAT) => {
    const date = convertUtcToLocalTime(utcTime, format, format);
    const givenDate = moment(date, DEFAULT_FORMAT);
    const formattedDifference = givenDate.fromNow();
    return formattedDifference;
};
export const formatCurrency = (local, style, currencyType) => {
    let currency = new Intl.NumberFormat(local, {
        style: style,
        currency: currencyType,
    });
    return currency;
};

export const formatMoney = (value, setting = {}) => {
    if (Object.keys(setting) <= 0) setting = getObjectData(KEYS.USER_DATA)?.settings?.['Money and Number'] || {};
    if ((value || value === 0) && !isNaN(value)) {
        const groupSeparator = setting.groupSeparator || ',';
        const decimalSeparator = setting.decimalSeparator || '.';
        const currentcy = setting.currencySymbol || '₫';
        const currencySymbolPosition = setting.currencySymbolPosition;
        const moneyRatio = setting.moneyRatio || 1;
        const decimal = Number(setting.decimal) || 0;
        if (value.toString().indexOf(decimalSeparator) === -1) {
            value = value / moneyRatio;
            value = value.toFixed(decimal);
            const decimalIndex = value.toString().lastIndexOf('.');
            if (decimalIndex > -1) {
                value =
                    value.toString().substring(0, decimalIndex) +
                    decimalSeparator +
                    value.toString().substring(decimalIndex + 1);
            }
        } else {
            value = value.toFixed(Number(setting.decimal) || 0);
        }
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
        if (currencySymbolPosition === CurrentcyPositions.FRONT) {
            return `${currentcy} ${value}`;
        } else {
            return `${value} ${currentcy}`;
        }
    }
    return '';
};

export function copyToClipboard(text) {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    showSucsessMessage('Sao chép mã giới thiệu thành công');
}

export const convertStringToLowerCase = (str) => {
    if (str) {
        return str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map((x) => x.toLowerCase())
            .join(' ');
    }
    return '';
};

export function scrollToID(id, offset = 0) {
    const element = document.getElementById(id);
    const body = document.querySelector('body');
    if (element) {
        const yOffset = -offset; // Đảo dấu để thực hiện scroll theo hướng ngược lại
        const y = element.offsetTop + yOffset;
        body.scrollTo({ top: y, behavior: 'smooth' });
    }
}

export const price = (value) => {
    return formatMoney(value, {
        groupSeparator: ',',
        currencySymbol: 'đ',
        currentcyPosition: 'BACK',
        currentDecimal: '0',
    });
};

export const grandTotal = function (arr) {
    return arr.reduce((sum, i) => {
        return sum + (i?.saleOff ? i?.price - ((i?.price * 1) / 100) * i?.saleOff : i?.price);
    }, 0);
};

export const getQueryParams = (url) => {
    const queryParams = {};
    // Tạo một đối tượng URL từ chuỗi URL
    const urlObject = new URL(url);

    // Lấy tham số truy vấn từ URL
    urlObject.searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    return queryParams;
};

/**
 * Valid input is an Array
 * @param {Any} arr
 * @return {Array}
 */
export const ensureArray = (arr, defaultValue) =>
    Array.isArray(arr) ? arr : Array.isArray(defaultValue) ? defaultValue : [];

export const convertToHoursMinutes = (seconds) => {
    const minutes = Math.ceil(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
};

export function timeConvert(n) {
    var seconds = Math.floor(n % 60);
    var minutes = Math.floor((n / 60) % 60);
    var hours = Math.floor((n / (60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
}

export function formatLesson(data) {
    const sections = [];
    let currentParent = null;

    data?.forEach((item) => {
        if (item.kind === LESSON_KIND_SECTION) {
            sections.push({
                ...item,
                lessons: [],
                totalStudyTime: 0,
                totalLesson: 0,
            });
            currentParent = sections[sections.length - 1];
        } else if (currentParent) {
            currentParent.lessons.push(item);
            currentParent.totalStudyTime += item.videoDuration || 0;
            currentParent.totalLesson++;
        }
    });
    return sections;
}
