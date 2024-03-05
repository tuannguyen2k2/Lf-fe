import React from 'react';
import styles from './index.module.scss';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import CartInfo from './CartInfo';
import { Divider, Group } from '@mantine/core';
import SummaryCart from './SummaryCart';
import Recommended from './Recommended';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition, rem, Box } from '@mantine/core';
import Container from '@components/common/elements/Container';
import useShoppingCart from '@hooks/useShoppingCart';
import { price, grandTotal } from '@utils';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { useNavigate } from 'react-router-dom';
import routes from '@routes';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { useForm } from '@mantine/form';
import useAuth from '@hooks/useAuth';
import { useSelector } from 'react-redux';
const CartComponentMobile = ({ data }) => {
    const { cart, clearCart, removeItemCart } = useShoppingCart({ immediate: true });
    const { execute: createBooking } = useFetch(apiConfig.booking.create);
    const navigation = useNavigate();
    const { profile } = useAuth();

    const handleCreateBooking = (values) => {
        createBooking({
            data: {
                ...values,
            },

            onCompleted: (res) => {
                showSucsessMessage('Thanh toán thành công');
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
    const form = useForm({});

    return (
        <Container>
            <form onSubmit={form.onSubmit((values) => handleCreateBooking(values))}>
                <Typo size="small" type="bold">
                    <FormattedMessage defaultMessage="Giỏ hàng của tôi" />
                </Typo>
                <CartInfo clearCart={clearCart} cart={cart} removeItem={removeItemCart} />
                <Divider my="sm" variant="dashed" size="sm" />
                <SummaryCart cart={cart} />
                {/* <Recommended /> */}
                <Affix
                    position={{ bottom: 0 }}
                    zIndex={100}
                    w={'100%'}
                    h="80px"
                    style={{ background: 'white', boxShadow: ' 0px -2px 15px 0px rgba(0, 172, 193, 0.25)' }}
                    p={10}
                    px={20}
                >
                    <Group justify="space-between">
                        <Box style={{ textAlign: 'start' }}>
                            <Text fz={'var(--h1-font-size)'} fw="var(--font-bold)" c="var(--primary-color)">
                                {price(grandTotal(cart))}
                            </Text>
                            {/* <Text td="line-through">{grandTotal(cart) > 0 && price(grandTotal(cart))}</Text> */}
                        </Box>
                        <Button
                            w="50%"
                            size="lg"
                            onClick={() => navigation(routes.checkoutPage.path)}
                            disabled={!profile || cart?.length == 0}
                        >
                            <FormattedMessage defaultMessage="Thanh toán" />
                        </Button>
                    </Group>
                </Affix>
            </form>
        </Container>
    );
};
export default CartComponentMobile;
