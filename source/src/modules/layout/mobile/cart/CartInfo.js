import React from 'react';
import styles from './cartInfo.module.scss';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { Avatar, Group, Rating, Text, Box, Image, Button } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import ItemCart from '../common/ItemCart';
import useShoppingCart from '@hooks/useShoppingCart';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { modals } from '@mantine/modals';
import { FormattedMessage } from 'react-intl';
const message = defineMessages({
    quantity: '2 khóa học đã chọn',
    delete: 'Xóa tất cả',
});

const CartInfo = ({ clearCart, cart, removeItem }) => {
    const translate = useTranslate();

    // const handleDeleteAll = () => {
    //     clearCart();
    // };

    const DeleteCartConfirm = () => {
        modals.openConfirmModal({
            title: (
                <Typo size="small" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Xác nhân'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn có muốn toàn bộ giỏ hàng?'} />
                </Typo>
            ),
            size: '80vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Xóa', cancel: 'Hủy' },
            onConfirm: () => clearCart(),
        });
    };

    return (
        <div className={styles.item}>
            <Group justify="space-between" style={{ paddingTop: 15, paddingBottom: 15 }}>
                <Typo size="primary" style={{ color: 'var(--text-color)' }}>
                    {`${cart.length} khóa học trong giỏ hàng`}
                </Typo>
                <Button className={styles.button} onClick={DeleteCartConfirm} disabled={cart?.length == 0}>
                    {translate.formatMessage(message.delete)}
                </Button>
            </Group>
            {cart.map((item, index) => (
                <ItemCart key={index} data={item} removeItem={removeItem} />
            ))}
        </div>
    );
};

export default CartInfo;
