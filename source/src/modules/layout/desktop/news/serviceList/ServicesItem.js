import React from 'react';
import styles from './servicesItem.module.scss';
import star from '@assets/icons/star.svg';
import { formatMoney } from '@utils/index';
import { generatePath, useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Box, Rating, Flex, Paper, HoverCard, Title } from '@mantine/core';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import routes from '@routes';
import { AppConstants } from '@constants';
import { price } from '@utils/index';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import useShoppingCart from '@hooks/useShoppingCart';
import Typo from '@components/common/elements/Typo';

const ServicesItem = ({ data }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const navigateDetail = () => {
        navigate(generatePath(routes.newsPage.path, { id: data?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    const sellCode = null;
    const { addItem } = useShoppingCart();
    return (
        <HoverCard width={360} shadow="md" position="right">
            <HoverCard.Target>
                <Card
                    shadow="sm"
                    padding={0}
                    radius="lg"
                    withBorder
                    w={"100%"}
                    style={{
                        cursor: 'pointer',
                    }}
                    bg="var(--product-container-bg)"
                    onClick={navigateDetail}
                >
                    <Card.Section>
                        <Image
                            src={data?.banner && AppConstants.contentRootUrl + data?.banner}
                            alt="Product Image"
                            h={200}
                            w={'100%'}
                            style={{ objectFit: 'fill' }}
                            fallbackSrc="https://placehold.co/600x400"
                        />
                    </Card.Section>

                    <Box px={'md'} pb={'md'}>
                        <Typo
                            size="primary"
                            type="bold"
                            className={classNames(styles.productTitle, 'limit-line')}
                            style={{ height: '70px', marginTop: '3px' }}
                        >
                            {data?.title}
                        </Typo>
                        <Flex align="center" gap={10} mt={8}>
                            <Typo size="tiny" style={{ color: 'var(--text-color)', marginTop: 5 }}>
                                {' Chủ đề '} {data?.category?.name}
                            </Typo>
                        </Flex>


                    </Box>
                </Card>
            </HoverCard.Target>
            {/* <HoverCard.Dropdown>
                <Typo size="primary" type="bold" className={classNames(styles.productTitle)}>
                    {data?.name}
                </Typo>
                <Typo size="tiny" style={{ color: 'var(--text-color)' }}>
                    {data?.shortDescription}
                </Typo>
                <Flex justify="space-between" mt={10} align="center">
                    <Flex gap={5} align="center">
                        <Typo size="primary" type="bold" className={styles.productPriceSale}>
                            {data?.price == 0
                                ? translate.formatMessage(commonMessage.free)
                                : data?.saleOff
                                    ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
                                    : price(data?.price)}
                        </Typo>
                        <Typo size="tiny" className={styles.productCost}>
                            {data?.saleOff && data?.price > 0 ? price(data?.price) : null}
                        </Typo>
                    </Flex>
                </Flex>
                <Button
                    fz={20}
                    h={55}
                    variant="filled"
                    // onClick={() =>
                    //     cart.find((o) => o?.id === course?.id) ? navigate('/cart') : addItem(course, sellCode)
                    // }
                    onClick={() => addItem(data, sellCode)}
                    // disabled={course?.isBuy}
                >
                    {/* {course?.isBuy == true ? (
                        <FormattedMessage defaultMessage="Đã mua" />
                    ) : cart.find((o) => o?.id === course?.id) ? (
                        <FormattedMessage defaultMessage=" Đi đến giỏ hàng" />
                    ) : (

                    )} */}
            {/* <FormattedMessage defaultMessage="Thêm vào giỏ hàng" />
                </Button>
            </HoverCard.Dropdown> */}{' '}
        </HoverCard>
    );
};

export default ServicesItem;
