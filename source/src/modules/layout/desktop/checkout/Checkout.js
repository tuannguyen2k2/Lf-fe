import React, { useEffect, useState } from 'react';

import { Select, rem, Box, Accordion, Image, Input, Grid } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';
import styles from './checkout.module.scss';
import momo from '@assets/icons/momo.png';
import credit from '@assets/icons/credit.png';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Healing from '@components/common/elements/Healing';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import { paymentMethods } from '@constants';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';
import { commonValidation } from '@constants/intl';
const message = defineMessages({
    address: 'Địa chỉ thanh toán',
    payment: 'Chọn phương thức thanh toán',
    visa: 'Thẻ Visa/Master Card',
    creditCard: ' Thẻ ATM',
    momo: 'MOMO',
    credit: 'CREDIT',
});

const Checkout = ({ form }) => {
    const translate = useTranslate();
    const [ value, setValue ] = useState(0);

    return (
        <div>
            <Healing size="small" type="semi" style={{ margin: '15px 0' }}>
                {translate.formatMessage(message.payment)}
            </Healing>
            {form.isValid('paymentMethod') ? null : (
                <Text c={'red'} mb={10}>
                    {translate.formatMessage(commonValidation.paymentMethodValidation)}
                </Text>
            )}
            <Accordion variant="contained" {...form.getInputProps('paymentMethod')} defaultValue="0">
                <Accordion.Item value="0">
                    <Accordion.Control style={{ padding: '10px 30px' }} icon={<Image src={momo} w={40} h={40}></Image>}>
                        <Typo size="primary" type="semi-bold">
                            {translate.formatMessage(message.momo)}
                        </Typo>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Box px={30}>
                            <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Tên trên thẻ" />
                            </Typo>
                            <Input placeholder="Tên trên thẻ" size="lg" />
                            <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Số thẻ" />
                            </Typo>
                            <Input placeholder="1234 5678 9483" size="lg" />
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="1">
                    <Accordion.Control
                        style={{ padding: '10px 30px' }}
                        icon={<Image src={credit} w={40} h={40}></Image>}
                    >
                        <Typo size="primary" type="semi-bold">
                            {translate.formatMessage(message.credit)}
                        </Typo>
                    </Accordion.Control>

                    <Accordion.Panel>
                        <Box px={30}>
                            <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Tên trên thẻ" />
                            </Typo>
                            <Input placeholder="Tên trên thẻ" size="lg" />
                            <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Số thẻ" />
                            </Typo>
                            <Input placeholder="1234 5678 9483" size="lg" />

                            <Grid>
                                <Grid.Col span={6}>
                                    <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="Ngày hết hạn" />
                                    </Typo>
                                    <Input placeholder="MM / YY" size="lg" />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Typo size="primary" type="semi-bold" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="CVC / CVV" />
                                    </Typo>
                                    <Input placeholder="CVC" size="lg" />
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default Checkout;
