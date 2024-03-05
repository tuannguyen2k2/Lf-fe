import React from 'react';
import styles from './index.module.scss';
import { Divider, Group, TextInput, Button, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconX } from '@tabler/icons-react';
import Typo from '../Typo';
import { actions } from '@store/actions/app';
import { useDispatch, useSelector } from 'react-redux';

import { price, grandTotal } from '@utils';
import { useNavigate, useNavigation } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
const message = defineMessages({
    summaryCart: 'Tổng tiền (4 khóa học) :',
    price: 'Giá gốc',
    sale: 'Giá giảm',
    apply: 'Áp dụng',
    payment: 'Thanh toán',
    total: 'Thành tiền',
    coupon: 'Mã khuyến mãi',
    summaryCheckout: 'Tóm tắt đơn hàng',
});

const Summary = ({ varitant, cart }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const { profile } = useAuth();
    const numberCart = useSelector((state) => state.cart.cart);
    const summaryCart = (
        <>
            <Typo size="primary" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                {`Tổng tiền (${cart?.length} khóa học)`}
            </Typo>
            <Group justify="space-between" className={styles.priceCart} my={10}>
                <Typo size="small" type="semi-bold" style={{ color: 'var(--text-color)' }}>
                    {price(grandTotal(cart))}
                </Typo>
            </Group>
            <Group>
                {/* <Typo className={styles.totalPriceCart} size="primary" style={{ color: 'var(--black-cate-name)' }}>
                    {price(grandTotal(cart))}
                </Typo> */}
                {/* <div className={styles.discount}>
                    <Typo size="tiny" style={{ color: 'var(--text-color-light)' }}>
                        <FormattedMessage defaultMessage="Giảm giá 20% " />
                    </Typo>
                </div> */}
            </Group>
        </>
    );

    const navigation = useNavigate();
    return (
        <div className={styles.Summary}>
            {summaryCart}
            <Divider />
            {/* <Text></Text>
            <Typo className={styles.coupon} size="primary" type="semi-bold">
                {translate.formatMessage(message.coupon)}
            </Typo> */}
            {/* <TextInput
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
            /> */}
            <Divider />
            <Button
                className={styles.payment}
                fullWidth
                size="lg"
                onClick={() => navigation('/checkout')}
                disabled={!profile || numberCart?.length == 0}
            >
                <Typo size="primary">
                    <FormattedMessage defaultMessage="Thanh toán" />
                </Typo>
            </Button>
        </div>
    );
};

export default Summary;
