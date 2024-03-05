import PageNotAllowed from '@components/common/page/PageNotAllowed';
import PageNotFound from '@components/common/page/PageNotFound';
import CartPageContainer from '@modules/containers/cart';
import CheckoutPageContainer from '@modules/containers/checkout';
import CoursePageContainer from '@modules/containers/course';
import DetailPageContainer from '@modules/containers/detail';
import LandingPageContainer from '@modules/containers/landing';
import LoginPageContainer from '@modules/containers/login';
import RegisterPageContainer from '@modules/containers/register';
import ProfilePageContainer from '@modules/containers/profile';
import PublicLayout from '@modules/layout/common/PublicLayout';
import ForgetPasswordPageContainer from '@modules/containers/forgetPassword';
import UserContainer from '@modules/containers/user';
import RegisterExpertPageContainer from '@modules/containers/registerExpert';
import RegisterFBPageContainer from '@modules/containers/registerFb';
import RegisterGGPageContainer from '@modules/containers/registerGG';
import ChangeForgetPasswordPageContainer from '@modules/containers/ChangeforgetPassword';
import CategoryPageContainer from '@modules/containers/category';
import SearchPageContainer from '@modules/containers/search';
import NewsContainer from '@modules/containers/news';
import NewsListContainer from '@modules/containers/news/newList';

/*
	auth
		+ null: access login and not login
    + true: access login only
		+ false: access not login only
*/
const routes = {
    pageNotAllowed: {
        path: '/not-allowed',
        component: PageNotAllowed,
        auth: null,
        title: 'Page not allowed',
    },
    homePage: {
        path: '/',
        component: LandingPageContainer,
        auth: null,
        title: 'Home',
    },
    CategoryPage: {
        path: '/category/:id',
        component: CategoryPageContainer,
        auth: null,
        title: 'Category',
    },
    detailPage: {
        path: '/detail/:id',
        component: DetailPageContainer,
        auth: null,
        title: 'Detail',
    },
    coursePage: {
        path: '/course/:id',
        component: CoursePageContainer,
        auth: true,
        title: 'Course',
    },
    cartPage: {
        path: '/cart',
        component: CartPageContainer,
        auth: null,
        title: 'Cart',
    },
    checkoutPage: {
        path: '/checkout',
        component: CheckoutPageContainer,
        auth: true,
        title: 'Checkout',
    },
    loginPage: {
        path: '/login',
        component: LoginPageContainer,
        auth: false,
        title: 'Home',
    },
    registerPage: {
        path: '/register',
        component: RegisterPageContainer,
        auth: false,
        title: 'Home',
    },
    forgetPasswordPage: {
        path: '/forget-password',
        component: ForgetPasswordPageContainer,
        auth: false,
        title: 'Home',
    },
    ChangePasswordPage: {
        path: '/change-password',
        component: ChangeForgetPasswordPageContainer,
        auth: false,
        title: 'Home',
    },
    profilePage: {
        path: '/profile',
        component: ProfilePageContainer,
        auth: true,
        title: 'Profile',
    },
    userPage: {
        path: '/expert/:id',
        component: UserContainer,
        auth: null,
        title: 'Profile',
    },
    regExpertPage: {
        path: '/register-expert',
        component: RegisterExpertPageContainer,
        auth: null,
        title: 'Profile',
    },

    regfbPage: {
        path: '/register-fb',
        component: RegisterFBPageContainer,
        auth: null,
        title: 'Profile',
    },
    regGgPage: {
        path: '/register-gg',
        component: RegisterGGPageContainer,
        auth: null,
        title: 'Profile',
    },
    newsListPage: {
        path: '/news',
        component: NewsListContainer,
        auth: null,
        title: 'News List',
    },
    newsPage: {
        path: '/news/:id',
        component: NewsContainer,
        auth: null,
        title: 'News',
    },
    notFound: {
        component: PageNotFound,
        auth: null,
        title: 'Page not found',
        path: '*',
        layout: PublicLayout,
    },
    SearchPage: {
        path: '/search',
        component: SearchPageContainer,
        auth: null,
        title: 'Search',
    },
};

export default routes;
