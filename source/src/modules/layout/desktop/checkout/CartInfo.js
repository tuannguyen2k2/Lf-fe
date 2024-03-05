import React from 'react';
import ItemCart from './ItemCart';
import styles from './cartInfo.module.scss';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { Divider } from '@mantine/core';
import Healing from '@components/common/elements/Healing';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    cartInfo: 'Thông tin đơn hàng',
});

const CartInfo = ({ cartItem }) => {
    const translate = useTranslate();

    return (
        <div style={{ marginBottom: 30 }}>
            <Healing size="small" type="semi" style={{ margin: '30px 0' }}>
                {translate.formatMessage(message.cartInfo)}
            </Healing>
            {cartItem ? cartItem?.map((item, index) => (
                <ItemCart key={index} data={item} />
            )) : <SkeLeton numRow={8}/>}
            {/* <ItemCart />
            <ItemCart />
            <ItemCart /> */}
        </div>
    );
};

export default CartInfo;
