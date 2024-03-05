import React from 'react';
import styles from './index.module.scss';
import PageLayout from '@modules/layout/common/PageLayout';
import { FormattedMessage } from 'react-intl';
import Checkout from './Checkout';
import SummaryCheckout from './SummaryCheckout';
import ItemCart from './ItemCart';
import CartInfo from './CartInfo';
import { useForm } from '@mantine/form';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { useNavigate } from 'react-router-dom';
import routes from '@routes';
import { useDispatch } from 'react-redux';
import { getCartItemList } from '@store/actions/cart';
import { paymentMethods } from '@constants';
import useShoppingCart from '@hooks/useShoppingCart';
const CheckoutComponentDesktop = ({ cartItem, loading }) => {
    const form = useForm({
        initialValues: {
            paymentMethod: `${paymentMethods.BOOKING_PAYMENT_METHOD_MOMO}`,
        },
        validate: {
            paymentMethod: (value) => (value ? null : 'Vui lòng phương thức thanh toán'),
        },
    });

    const { execute: createBooking } = useFetch(apiConfig.booking.create);
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const handleCreateBooking = (values) => {
        createBooking({
            data: {
                ...values,
            },

            onCompleted: (res) => {
                showSucsessMessage('Thanh toán thành công');
                navigation(routes.homePage.path);
                dispatch(getCartItemList([]));
            },
            onError: (error) => {
                // error?.response?.data?.code == ACCOUNT_ERROR_NOT_FOUND
                //     ? showErrorMessage(translate.formatMessage(errorMessage.ACCOUNT_ERROR_WRONG_PASSWORD))
                //     : '';
                // showErrorMessage('Thanh toán không thành công');
            },
        });
    };
    return (
        <div className={styles.page}>
            <form onSubmit={form.onSubmit((values) => handleCreateBooking(values))}>
                <PageLayout bannerName={<FormattedMessage defaultMessage="Thanh toán" />}>
                    <PageLayout.Body>
                        <Checkout form={form} />
                        <CartInfo cartItem={cartItem}/>
                    </PageLayout.Body>
                    <PageLayout.Side>
                        <SummaryCheckout cartItem={cartItem} form={form} loading={loading}/>
                    </PageLayout.Side>
                </PageLayout>
            </form>
        </div>
    );
};

export default CheckoutComponentDesktop;
