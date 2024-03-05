import React from 'react';
import ItemCart from '../common/ItemCart';
import styles from './cartInfo.module.scss';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { Divider } from '@mantine/core';
import Healing from '@components/common/elements/Healing';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    cartInfo: 'Thông tin đơn hàng',
});

const CartInfo = ({ cart, removeItem }) => {
    const translate = useTranslate();

    return (
        <div style={{ marginBottom: 30, paddingTop: 15 }}>
            <Healing size="small" type="bold">
                {translate.formatMessage(message.cartInfo)}
            </Healing>
            {cart ? cart.map((item, index) => (
                <ItemCart key={index} data={item} removeItem={removeItem && removeItem} />
            )) : <SkeLeton numRow={4}/>}
        </div>
    );
};

export default CartInfo;
