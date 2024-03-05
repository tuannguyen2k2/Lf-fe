export const apiUrl = process.env.REACT_APP_API;
export const enableExposure = process.env.REACT_APP_ENABLE_EXPOSURE === 'true';

export const fixedPath = {
    privacy: `${apiUrl}${process.env.REACT_APP_PRIVACY_PATH}`,
    help: `${apiUrl}${process.env.REACT_APP_HELP_PATH}`,
    aboutUs: `${apiUrl}${process.env.REACT_APP_ABOUT_US_PATH}`,
};

//LTS SHOP

export const brandName = 'life-Uni';

export const appName = `life-Uni-${process.env.REACT_APP_ENV}`;

export const storageKeys = {
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
    USER_KIND: `${appName}-user-kind`,
    REF_CODE: `${appName}-ref-code`,
    ITEM_CART: `${appName}-item-cart`,
    HAS_NOTIFICATION: `${appName}-hasNotification`,
};

export const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    clientUrl: process.env.REACT_APP_CLIENT_URL,
    contentRootUrl: `${process.env.REACT_APP_API_MEDIA}v1/file/download`,
    mediaRootUrl: `${process.env.REACT_APP_API_MEDIA}`,
    gameApiRootUrl: process.env.REACT_APP_GAME_API,
    langKey: 'vi',
    AppFbId: process.env.REACT_APP_FACEBOOK_ID,
    GGClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    GGClienSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    GGRedirectURI: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
};

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

export const defaultLocale = 'en';
export const locales = [ 'en', 'vi' ];

export const DATE_DISPLAY_FORMAT = 'hh:mm A DD/MM/YYYY';
export const DATE_SHORT_MONTH_FORMAT = 'DD MMM YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};

export const articleTypeEnum = {
    URL: 'url',
    PLAIN: 'plain',
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: false,
    REQUIRE_LOGIN: true,
    BOTH: null,
};

export const accessProfileTypeEnum = {
    NOT_SELLER: false,
    REQUIRE_SELLER: true,
    BOTH: null,
};

export const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
};

export const LIMIT_IMAGE_SIZE = 512000;

export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;

export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_TABLE_ITEM_SIZE = 20;
export const DEFAULT_LANGUAGE_ID = '1';

export const NOTIFICATION_REG_EXPERT = 3;
export const NOTIFICATION_APPROVE_EXPERT = 4;
export const NOTIFICATION_SING_UP_STUDENT = 6;

export const commonStatus = {
    PENDING: 0,
    ACTIVE: 1,
    LOCK: -1,
    DELETE: -2,
};

export const commonStatusColor = {
    [commonStatus.PENDING]: 'warning',
    [commonStatus.ACTIVE]: 'green',
    [commonStatus.LOCK]: 'red',
};

export const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
};

export const USER_DATA = 'user-data';
export const LANGUAGE = 'language';

export const KEYS = {
    USER_DATA,
    LANGUAGE,
};

export const shopVariantKey = {
    color: 0,
    size: 1,
};

export const FieldTypes = {
    STRING: 'STRING_TYPE',
    NUMBER: 'NUMBER_TYPE',
    SELECT: 'SELECT',
    AUTOCOMPLETE: 'AUTOCOMPLETE',
    DATE: 'DATE',
    DATE_RANGE: 'DATE_RANGE',
};

export const appAccount = {
    APP_USERNAME: process.env.REACT_APP_USERNAME,
    APP_PASSWORD: process.env.REACT_APP_PASSWORD,
};

export const GROUP_KIND_STUDENT = 4;
export const GROUP_KIND_EXPERT = 5;
export const GROUP_KIND_SELLER = 6;
export const UserTypes = {
    STUDENT: 4,
    EXPERT: 5,
    SELLER: 6,
};
export const PROVINCE_KIND = 1;
export const DISTRICT_KIND = 2;
export const VILLAGE_KIND = 3;
export const nationKinds = {
    PROVINCE_KIND,
    DISTRICT_KIND,
    VILLAGE_KIND,
};

export const MAX_LENGTH_TEXT_EDITOR = 2000;

export const BOOKING_PAYMENT_METHOD_MOMO = 0;
export const BOOKING_PAYMENT_METHOD_CREDIT = 1;
export const paymentMethods = {
    BOOKING_PAYMENT_METHOD_CREDIT,
    BOOKING_PAYMENT_METHOD_MOMO,
};
export const REVIEW_KIND_EXPERT = 1;
export const REVIEW_KIND_COURSE = 2;
export const REVIEW_KIND_SYSTEM = 3;
export const reviewKind = {
    REVIEW_KIND_EXPERT,
    REVIEW_KIND_COURSE,
    REVIEW_KIND_SYSTEM,
};
export const LESSON_KIND_TEXT = 1;
export const LESSON_KIND_VIDEO = 2;
export const LESSON_KIND_SECTION = 3;
export const lessonKinds = {
    LESSON_KIND_TEXT,
    LESSON_KIND_VIDEO,
    LESSON_KIND_SECTION,
};
export const CATEGORY_KIND_NEWS = 1;
export const CATEGORY_KIND_TOP_FREE = 2;
export const CATEGORY_KIND_TOP_CHARGE = 3;
export const CATEGORY_KIND_TOP_NEW = 4;

export const categoryKinds = {
    CATEGORY_KIND_NEWS,
    CATEGORY_KIND_TOP_FREE,
    CATEGORY_KIND_TOP_CHARGE,
    CATEGORY_KIND_TOP_NEW,
};
