import React from 'react';
import { Select, rem, Box, Accordion, Image, Input, Grid } from '@mantine/core';
import { IconWorld } from '@tabler/icons-react';
import styles from './checkout.module.scss';
import card from '@assets/icons/credit-card.png';
import bank from '@assets/icons/bank.png';
import { defineMessages, useIntl } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Healing from '@components/common/elements/Healing';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
import momo from '@assets/icons/momo.png';
import credit from '@assets/icons/credit.png';
import { Text } from '@mantine/core';
const message = defineMessages({
    address: 'Địa chỉ thanh toán',
    payment: 'Chọn phương thức thanh toán',
    visa: 'Momo',
    creditCard: ' Thẻ ATM',
});

const Checkout = ({ form }) => {
    const translate = useTranslate();

    return (
        <div>
            <Healing size="primary" style={{ margin: '15px 0' }}>
                {translate.formatMessage(message.payment)}
            </Healing>
            <Accordion variant="contained" style={{ maxWidth: 1000 }} {...form.getInputProps('paymentMethod')}>
                <Accordion.Item value="0">
                    <Accordion.Control style={{ padding: '5px 10px' }} icon={<Image src={momo} w={30} h={30}></Image>}>
                        <Typo size="primary">{translate.formatMessage(message.visa)}</Typo>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Box>
                            <Typo size="primary" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Tên trên thẻ" />
                            </Typo>
                            <Input placeholder="Tên trên thẻ" />
                            <Typo size="primary" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Số thẻ" />
                            </Typo>
                            <Input placeholder="1234 5678 9483" />

                            <Grid>
                                <Grid.Col span={6}>
                                    <Typo size="primary" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="Ngày hết hạn" />
                                    </Typo>
                                    <Input placeholder="MM / YY" />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Typo size="primary" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="CVC / CVV" />
                                    </Typo>
                                    <Input placeholder="CVC" />
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="1">
                    <Accordion.Control
                        style={{ padding: '5px 10px' }}
                        icon={<Image src={credit} w={30} h={30}></Image>}
                    >
                        <Typo size="primary">{translate.formatMessage(message.creditCard)}</Typo>
                    </Accordion.Control>

                    <Accordion.Panel>
                        <Box>
                            <Typo size="primary" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Tên trên thẻ" />
                            </Typo>
                            <Input placeholder="Tên trên thẻ" />
                            <Typo size="primary" style={{ margin: '15px 0' }}>
                                <FormattedMessage defaultMessage="Số thẻ" />
                            </Typo>
                            <Input placeholder="1234 5678 9483" />

                            <Grid>
                                <Grid.Col span={6}>
                                    <Typo size="primary" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="Ngày hết hạn" />
                                    </Typo>
                                    <Input placeholder="MM / YY" />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Typo size="primary" style={{ margin: '15px 0' }}>
                                        <FormattedMessage defaultMessage="CVC / CVV" />
                                    </Typo>
                                    <Input placeholder="CVC" />
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            {form.isValid('paymentMethod') ? null : <Text c={'red'}>Vui lòng chọn phương thức thanh toán </Text>}
        </div>
    );
};

export default Checkout;
