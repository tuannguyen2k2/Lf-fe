import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import PageLayout from '@modules/layout/common/PageLayout';
import { FormattedMessage } from 'react-intl';
import CartInfo from './CartInfo';
import Recommended from './Recommended/index';
import SummaryCart from './SummaryCart';
import Container from '@components/common/elements/Container';
import { Grid, Space } from '@mantine/core';
import useShoppingCart from '@hooks/useShoppingCart';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
const CartComponentDesktop = ({ data, executeGetList, dataGetList }) => {
    const { cart, clearCart, removeItemCart } = useShoppingCart({ immediate: true });

    // eslint-disable-next-line no-unused-vars
    const [ coureList, setCoureList ] = useState([]);

    useEffect(() => {
        const data = cart?.map((item) => {
            return item?.field?.id;
        });
        const uniqueArray = Array.from(new Set(data));
        setCoureList(data);
    }, [ cart ]);

    useEffect(() => {
        executeGetList({
            params: { categoryIds: coureList.toString() },
        });
    }, [ coureList ]);

    return (
        <div className={styles.page}>
            <PageLayout bannerName={<FormattedMessage defaultMessage="Giỏ hàng" />}>
                <PageLayout.Body>
                    <CartInfo cart={cart} clearCart={clearCart} removeItem={removeItemCart} />
                </PageLayout.Body>
                <PageLayout.Side>
                    <SummaryCart cart={cart} />
                </PageLayout.Side>
            </PageLayout>
            <Space h="40px" />

            <Container>
                <Recommended dataDetail={dataGetList} />
            </Container>
        </div>
    );
};

export default CartComponentDesktop;
