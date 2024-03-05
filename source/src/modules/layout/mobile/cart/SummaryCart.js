import React from 'react';
import styles from './summaryCart.module.scss';
import { Divider, Group, TextInput, Button, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconX } from '@tabler/icons-react';
import Summary from '@components/common/elements/Summary';
import Typo from '@components/common/elements/Typo';
import { price, grandTotal } from '@utils';
const message = defineMessages({
    summaryCart: 'Tổng cộng',
    price: 'Học phí gốc',
    sale: 'Giá giảm',
    apply: 'Áp dụng',
    payment: 'Thanh toán',
    total: 'Tổng cộng',
    coupon: 'Mã khuyến mãi',
});

const SummaryCart = ({ cart }) => {
    // var grandTotal = function (arr) {
    //     return arr.reduce((sum, i) => {
    //         return sum + i.price;
    //     }, 0);
    // };
    const translate = useTranslate();
    return (
        <div>
            <div>
                {/* <Typo className={styles.coupon} size="small" type="bold">
                    {translate.formatMessage(message.coupon)}
                </Typo> */}
                {/* <TextInput
                    style={{ paddingBottom: 10, paddingTop: 10 }}
                    rightSectionPointerEvents="none"
                    rightSection={<Button className={styles.apply}>{translate.formatMessage(message.apply)}</Button>}
                    rightSectionWidth="91.5"
                    placeholder="Nhập mã khuyến mãi"
                /> */}
            </div>
            {/* <Divider my="sm" variant="dashed" size="sm" /> */}

            <div>
                <Group justify="space-between" className={styles.priceCheckout}>
                    <Typo size="primary">{translate.formatMessage(message.price)}</Typo>
                    <Typo size="primary">{price(grandTotal(cart))}</Typo>
                </Group>
                {/* <Group justify="space-between" className={styles.priceCheckout}>
                    <Typo size="primary">{translate.formatMessage(message.sale)}</Typo>
                    <Typo size="primary">
                        <FormattedMessage defaultMessage="200.000 đ" />
                    </Typo>
                </Group> */}
                <Group justify="space-between" className={styles.priceCheckout}>
                    <Typo size="primary">{translate.formatMessage(message.total)}</Typo>
                    <Typo size="primary" style={{ color: 'var(--red-color)' }}>
                        {price(grandTotal(cart))}
                    </Typo>
                </Group>
            </div>
        </div>
    );
};

export default SummaryCart;
