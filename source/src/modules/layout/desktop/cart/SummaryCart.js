import React from 'react';
import styles from './summaryCart.module.scss';
import { Divider, Group, TextInput, Button, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconX } from '@tabler/icons-react';
import Summary from '@components/common/elements/Summary';
const message = defineMessages({
    summaryCart: 'Tổng tiền (4 khóa học)',
    price: 'Giá gốc',
    sale: 'Giá giảm',
    apply: 'Áp dụng',
    payment: 'Thanh toán',
    total: 'Thành tiền',
    coupon: 'Mã khuyến mãi',
});

const SummaryCart = ({ cart }) => {
    const translate = useTranslate();
    return <Summary varitant={true} cart={cart} />;
};

export default SummaryCart;
