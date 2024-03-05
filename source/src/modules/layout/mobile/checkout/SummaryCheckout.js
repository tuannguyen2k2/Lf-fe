import React from 'react';
import styles from './summary.module.scss';
import { Divider, Group, TextInput, Button, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import { price, grandTotal } from '@utils';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    summaryCart: 'Tổng cộng',
    price: 'Học phí gốc',
    sale: 'Giá giảm',
    apply: 'Áp dụng',
    payment: 'Thanh toán',
    total: 'Tổng cộng',
    coupon: 'Mã khuyến mãi',
});

const SummaryCheckout = ({ cart, form }) => {
    const translate = useTranslate();
    return (
        <div style={{ marginTop: 20 }}>
            {/* <div>
                <Typo className={styles.coupon} size="small" type="bold">
                    {translate.formatMessage(message.coupon)}
                </Typo>
                <TextInput
                    // {...form.getInputProps('promotionCode')}
                    style={{ paddingBottom: 10, paddingTop: 10 }}
                    rightSectionPointerEvents="none"
                    rightSection={<Button className={styles.apply}>{translate.formatMessage(message.apply)}</Button>}
                    rightSectionWidth="91.5"
                    placeholder="Nhập mã khuyến mãi"
                />
            </div>
            <Divider my="sm" variant="dashed" size="sm" /> */}

            <div>
                {cart ? <>
                    <Group justify="space-between" className={styles.priceCheckout}>
                        <Typo size="primary">{translate.formatMessage(message.price)}</Typo>
                        <Typo size="primary">{price(grandTotal(cart))}</Typo>
                    </Group>
                    <Group justify="space-between" className={styles.priceCheckout}>
                        <Typo size="primary">{translate.formatMessage(message.total)}</Typo>
                        <Typo size="primary" style={{ color: 'var(--red-color)' }}>
                            {price(grandTotal(cart))}
                        </Typo>
                    </Group>
                </> : <SkeLeton numRow={2}/>}
            </div>
        </div>
    );
};

export default SummaryCheckout;
