import { AppConstants, apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const oauth2 = 'https://oauth2.googleapis.com/token';
const apiConfig = {
    file: {
        upload: {
            baseURL: `${AppConstants.mediaRootUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    account: {
        loginBasic: {
            baseURL: `${apiUrl}api/token`,
            method: 'POST',
            headers: baseHeader,
        },
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/student/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        getSellerProfile: {
            baseURL: `${apiUrl}v1/seller/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        getExpertProfile: {
            baseURL: `${apiUrl}v1/expert/get-profile`,
            method: 'GET',
            headers: baseHeader,
        },
        register: {
            baseURL: `${apiUrl}v1/customer/register`,
            method: 'POST',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        resquestForgetPassword: {
            baseURL: `${apiUrl}v1/account/request_forget_password`,
            method: 'POST',
            headers: baseHeader,
        },
        forgetPassword: {
            baseURL: `${apiUrl}v1/account/forget_password`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    news: {
        getList: {
            baseURL: `${apiUrl}v1/news/list_news`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/news/get_news/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        clientNews: {
            baseURL: `${apiUrl}v1/news/client-list`,
            method: 'GET',
            headers: baseHeader,
        },
        clientNewsGet: {
            baseURL: `${apiUrl}v1/news/client-get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    category: {
        autocomplete: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    expert: {
        getList: {
            baseURL: `${apiUrl}v1/expert/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getClientList: {
            baseURL: `${apiUrl}v1/expert/client-list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/expert/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        getClientById: {
            baseURL: `${apiUrl}v1/expert/client-get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        signUp: {
            baseURL: `${apiUrl}v1/expert/signup`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/expert/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/expert/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/expert/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/expert/get-profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/expert/update-profile`,
            method: 'PUT',
            headers: baseHeader,
        },
    },
    student: {
        getList: {
            baseURL: `${apiUrl}v1/student/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/student/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        signUp: {
            baseURL: `${apiUrl}v1/student/signup`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/student/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/student/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/student/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/student/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/student/update-profile`,
            method: 'PUT',
            headers: baseHeader,
        },
        upgradeProfile: {
            baseURL: `${apiUrl}v1/student/upgrade-seller`,
            method: 'PUT',
            headers: baseHeader,
        },
        LoginFaceBook: {
            baseURL: `${apiUrl}v1/student/facebook/verify-token`,
            method: 'POST',
            headers: baseHeader,
        },
        ProfleFaceBook: {
            baseURL: `${apiUrl}v1/student/facebook/register-profile`,
            method: 'POST',
            headers: baseHeader,
        },
        loginGoogle: {
            baseURL: `${apiUrl}v1/student/google/verify-token`,
            method: 'POST',
            headers: baseHeader,
        },
        profleGoogle: {
            baseURL: `${apiUrl}v1/student/google/register-profile`,
            method: 'POST',
            headers: baseHeader,
        },
        oauth2Google: {
            baseURL: oauth2,
            method: 'POST',
            headers: baseHeader,
        },
        myCourse: {
            baseURL: `${apiUrl}v1/student/my-course`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    seller: {
        getList: {
            baseURL: `${apiUrl}v1/seller/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/seller/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/seller/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/seller/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/seller/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/seller/update-profile`,
            method: 'PUT',
            headers: baseHeader,
        },
    },
    nation: {
        getList: {
            baseURL: `${apiUrl}v1/nation/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/nation/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/nation/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/nation/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/nation/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/nation/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    notification: {
        getList: {
            baseURL: `${apiUrl}v1/notification/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiUrl}v1/notification/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/notification/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/notification/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/notification/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/notification/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        myNotification: {
            baseURL: `${apiUrl}v1/notification/my-notification`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        changeState: {
            baseURL: `${apiUrl}v1/notification/change-state`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        readAll: {
            baseURL: `${apiUrl}v1/notification/read-all`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        deleteAll: {
            baseURL: `${apiUrl}v1/notification/delete-all`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },

    expertRegistration: {
        create: {
            baseURL: `${apiUrl}v1/expert-registration/registration`,
            method: 'POST',
            headers: baseHeader,
        },
    },

    slideShow: {
        getList: {
            baseURL: `${apiUrl}v1/slideshow/list`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    course: {
        getList: {
            baseURL: `${apiUrl}v1/course/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getClientList: {
            baseURL: `${apiUrl}v1/course/client-list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/course/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        getDetail: {
            baseURL: `${apiUrl}v1/course/course-detail/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/course/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/course/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/course/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/course/create`,
            method: 'POST',
            headers: baseHeader,
        },
    },

    categoryHome: {
        getListClient: {
            baseURL: `${apiUrl}v1/category-home/client-list`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    booking: {
        getList: {
            baseURL: `${apiUrl}v1/booking/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/booking/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/booking/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/booking/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/booking/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/booking/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        buyFreeCourse: {
            baseURL: `${apiUrl}v1/booking/buy-free-course`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    promotion: {
        getList: {
            baseURL: `${apiUrl}v1/promotion/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/promotion/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/promotion/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/promotion/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/promotion/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/promotion/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    cartItem: {
        create: {
            baseURL: `${apiUrl}v1/cart-item/create`,
            method: 'POST',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/cart-item/list`,
            method: 'GET',
            headers: baseHeader,
        },
        createList: {
            baseURL: `${apiUrl}v1/cart-item/create-list`,
            method: 'POST',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/cart-item/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        deleteAll: {
            baseURL: `${apiUrl}v1/cart-item/delete-all`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    courseRetail: {
        registerRetail: {
            baseURL: `${apiUrl}v1/course-retail/register-retail`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    review: {
        create: {
            baseURL: `${apiUrl}v1/review/create`,
            method: 'POST',
            headers: baseHeader,
        },
        getListCourse: {
            baseURL: `${apiUrl}v1/review/list-reviews/:id`,
            method: 'GET',
            headers: baseHeader,
        },

        reviewCourseStar: {
            baseURL: `${apiUrl}v1/review/star/:courseId`,
            method: 'GET',
            headers: baseHeader,
        },
        myReview: {
            baseURL: `${apiUrl}v1/review/my-review`,
            method: 'GET',
            headers: baseHeader,
        },
        clientReview: {
            baseURL: `${apiUrl}v1/review/client-list`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    lesson: {
        getList: {
            baseURL: `${apiUrl}v1/lesson/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/lesson/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        getDetail: {
            baseURL: `${apiUrl}v1/lesson/lesson-detail/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/lesson/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/lesson/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/lesson/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/lesson/create`,
            method: 'POST',
            headers: baseHeader,
        },
    },
    completion: {
        getList: {
            baseURL: `${apiUrl}v1/completion/list`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/completion/create`,
            method: 'POST',
            headers: baseHeader,
        },
        completionLesson: {
            baseURL: `${apiUrl}v1/completion/complete-lesson`,
            method: 'POST',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/completion/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/completion/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
};

export default apiConfig;
