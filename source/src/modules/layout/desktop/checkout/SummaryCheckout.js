import React from 'react';
import styles from './summary.module.scss';
import { Divider, Group, TextInput, Button, Text, LoadingOverlay } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Summary from '@components/common/elements/Summary';
import Typo from '@components/common/elements/Typo';
import { grandTotal } from '@utils';
import { FormattedMessage } from 'react-intl';
import { price } from '@utils';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    summaryCheckout: 'Tóm tắt đơn hàng',
    price: 'Giá gốc',
    sale: 'Giá giảm',
    apply: 'Áp dụng',
    payment: 'Thanh toán',
    total: 'Thành tiền',
    coupon: 'Mã giảm giá',
});

const SummaryCheckout = ({ cartItem, form }) => {
    const translate = useTranslate();

    return (
        <div className={styles.Summary}>
            <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                {translate.formatMessage(message.summaryCheckout)}
            </Typo>
            {cartItem ? <>
                <Group justify="space-between" className={styles.priceCheckout}>
                    <Typo size="tiny" style={{ color: 'var(--input-color)' }}>
                        {translate.formatMessage(message.price)}
                    </Typo>
                    <Typo size="tiny" style={{ color: 'var(--input-color)' }}>
                        {cartItem && price(grandTotal(cartItem))}
                    </Typo>
                </Group>

                <Group justify="space-between" className={styles.totalPriceCheckout}>
                    <Typo size="sub" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                        {translate.formatMessage(message.total)}
                    </Typo>
                    <Typo size="sub" type="semi-bold" style={{ color: 'var(--red-color)' }}>
                        {cartItem && price(grandTotal(cartItem))}
                    </Typo>
                </Group> </> : <SkeLeton numRow={3}/>}
            <Divider />

            {/* <Typo className={styles.coupon} size="primary" type="semi-bold">
                {translate.formatMessage(message.coupon)}
            </Typo>
            <TextInput
                {...form.getInputProps('promotionCode')}
                style={{ paddingBottom: 10 }}
                mt="md"
                mb="md"
                size="lg"
                rightSectionPointerEvents="none"
                rightSection={
                    <Button className={styles.apply} size="lg">
                        <Typo size="sub">
                            <FormattedMessage defaultMessage="Áp dụng" />
                        </Typo>
                    </Button>
                }
                rightSectionWidth="118"
                label={
                    <Group>
                        <IconX />
                        <Typo size="tiny">
                            Đã áp dụng <strong>GD17325</strong>
                        </Typo>
                    </Group>
                }
                placeholder="Nhập mã khuyến mãi"
            />
            <Divider /> */}
            <Button className={styles.payment} fullWidth size="lg" type="submit">
                <Typo size="primary">
                    <FormattedMessage defaultMessage="Thanh toán" />
                </Typo>
            </Button>
        </div>
    );
};

export default SummaryCheckout;
