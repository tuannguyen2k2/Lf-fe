import React from 'react';
import styles from './index.module.scss';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import Checkout from './Checkout';
import SummaryCheckout from './SummaryCheckout';
import CartInfo from './CartInfo';
import { Divider } from '@mantine/core';
import Container from '@components/common/elements/Container';
import useShoppingCart from '@hooks/useShoppingCart';
import { Affix, Group, Box, Text, Button } from '@mantine/core';
import { price } from '@utils';
import { grandTotal } from '@utils';
import { useForm } from '@mantine/form';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import routes from '@routes';
import { useNavigate } from 'react-router-dom';
import { showSucsessMessage } from '@services/notifyService';
import { getCartItemList } from '@store/actions/cart';
import { useDispatch } from 'react-redux';
import { paymentMethods } from '@constants';
const CheckoutComponentMobile = () => {
    const { cart, clearCart, removeItemCart } = useShoppingCart();
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
                dispatch(getCartItemList([]));
                navigation(routes.homePage.path);
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
        <Container>
            <form onSubmit={form.onSubmit((values) => handleCreateBooking(values))}>
                <Typo size="small" type="bold">
                    <FormattedMessage defaultMessage="Thanh toán" />
                </Typo>
                <Checkout form={form} />
                <SummaryCheckout cart={cart} form={form} />
                <Divider my="sm" variant="dashed" size="sm" />
                <CartInfo cart={cart} />
                <Group justify="end" my={30}>
                    <Button size="lg" type="submit">
                        <Typo size="primary">
                            <FormattedMessage defaultMessage="Thanh toán" />
                        </Typo>
                    </Button>
                </Group>
                {/* <Affix
                    position={{ bottom: 0 }}
                    zIndex={100}
                    w={'100%'}
                    h="80px"
                    style={{ background: 'white', boxShadow: ' 0px -2px 15px 0px rgba(0, 172, 193, 0.25)' }}
                    p={10}
                    px={20}
                >
                    <Group justify="space-between">
                        <Box style={{ textAlign: 'end' }}>
                            <Text fz={'var(--h1-font-size)'} fw="var(--font-bold)" c="var(--primary-color)">
                                {price(grandTotal(cart))}
                            </Text>
                            <Text td="line-through">{price(grandTotal(cart))}</Text>
                        </Box>
                        {/* <Button w="50%" size="lg" type="submit">
                            <FormattedMessage defaultMessage="Thanh toán" />
                        </Button> */}
                {/* <Button size="lg" type="submit">
                            <Typo size="primary">
                                <FormattedMessage defaultMessage="Thanh toán" />
                            </Typo>
                        </Button>
                    </Group> */}
                {/* </Affix> */}
            </form>
        </Container>
    );
};

export default CheckoutComponentMobile;
