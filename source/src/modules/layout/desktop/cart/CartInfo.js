import React, { useEffect, useState } from 'react';
import ItemCart from './ItemCart';
import styles from './cartInfo.module.scss';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { Avatar, Group, Rating, Text, Box, Image, Button } from '@mantine/core';
import Typo from '@components/common/elements/Typo';

import { getData } from '@utils/localStorage';
import { storageKeys } from '@constants';
import { modals } from '@mantine/modals';
import { FormattedMessage } from 'react-intl';
const message = defineMessages({
    quantity: '4 khóa học trong giỏ hàng',
    deleteAll: 'Xóa tất cả',
});

const CartInfo = ({ cart, clearCart, removeItem }) => {
    const translate = useTranslate();

    const handleDeleteAll = () => {
        clearCart();
    };

    const DeleteCartConfirm = () => {
        modals.openConfirmModal({
            title: (
                <Typo size="small" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Xác nhận'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn có muốn xóa toàn bộ giỏ hàng?'} />
                </Typo>
            ),
            size: '27vw',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Xóa', cancel: 'Hủy' },
            onConfirm: () => clearCart(),
        });
    };

    return (
        <div className={styles.item}>
            <Group justify="space-between" style={{ paddingBottom: 20 }}>
                <Typo size="small" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                    {`${cart?.length} khóa học trong giỏ hàng`}
                </Typo>
                {cart?.length > 0 && (
                    <Button
                        className={styles.button}
                        size="lg"
                        onClick={DeleteCartConfirm}
                        disabled={cart?.length <= 0}
                    >
                        {translate.formatMessage(message.deleteAll)}
                    </Button>
                )}
            </Group>
            {cart?.map((item) => (
                <ItemCart key={item.id} data={item} removeItem={removeItem} />
            ))}
        </div>
    );
};

export default CartInfo;
