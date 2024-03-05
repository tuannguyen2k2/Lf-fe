import React from 'react';
import styles from './index.module.scss';
import star from '@assets/icons/star.svg';
import { formatMoney } from '@utils/index';
import { generatePath, useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, Box, Rating, Flex, Paper, HoverCard } from '@mantine/core';
import Typo from '../Typo';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import routes from '@routes';
import { AppConstants } from '@constants';
import { price } from '@utils/index';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import useShoppingCart from '@hooks/useShoppingCart';

const CardCategory = ({ data }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const navigateDetail = () => {
        navigate(generatePath(routes.detailPage.path, { id: data?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };
    const sellCode = null;
    const { addItem } = useShoppingCart();
    return (
    // <HoverCard width={360} shadow="md" position="right">
    //     <HoverCard.Target>
    //         <Card
    //             shadow="sm"
    //             padding={0}
    //             radius="lg"
    //             withBorder
    //             style={{
    //                 cursor: 'pointer',
    //             }}
    //             bg="var(--product-container-bg)"
    //             onClick={navigateDetail}
    //             className={styles.card}
    //         >
    //             <Card.Section>
    //                 <Image
    //                     src={data?.banner && AppConstants.contentRootUrl + data?.banner}
    //                     alt="Product Image"
    //                     h={263}
    //                     w={'100%'}
    //                     style={{ objectFit: 'fill' }}
    //                     fallbackSrc="https://placehold.co/600x400"
    //                 />
    //             </Card.Section>

    //             <Box px={'md'} pb={'md'}>
    //                 <Typo
    //                     size="primary"
    //                     type="bold"
    //                     className={classNames(styles.productTitle, 'limit-line')}
    //                     style={{ height: '60px', marginTop: '3px' }}
    //                 >
    //                     {data?.name}
    //                 </Typo>
    //                 <Typo size="tiny" style={{ color: 'var(--text-color)', minHeight: '10px' }}>
    //                     {data?.expert?.account?.fullName}
    //                 </Typo>
    //                 <Flex align="center" gap={10} mt={5}>
    //                     <Rating
    //                         fractions={4}
    //                         value={data?.averageStar}
    //                         readOnly
    //                         size="md"
    //                         color="var(--star-color)"
    //                     />
    //                 </Flex>
    //                 {/* <Typo size="tiny" style={{ color: 'var(--text-color)' }}>
    //                     {data?.shortDescription}
    //                 </Typo> */}
    //                 <Flex justify="space-between" mt={5} align="center">
    //                     <Flex gap={5} align="center">
    //                         <Typo size="primary" type="bold" className={styles.productPriceSale}>
    //                             {data?.price == 0
    //                                 ? translate.formatMessage(commonMessage.free)
    //                                 : data?.saleOff
    //                                     ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
    //                                     : price(data?.price)}
    //                         </Typo>
    //                         <Typo size="tiny" className={styles.productCost}>
    //                             {data?.saleOff && data?.price > 0 ? price(data?.price) : null}
    //                         </Typo>
    //                     </Flex>
    //                 </Flex>
    //             </Box>
    //         </Card>
    //     </HoverCard.Target>

        // </HoverCard>
        <HoverCard width={360} shadow="md" position="right">
            <HoverCard.Target>
                <Card
                    shadow="sm"
                    padding={0}
                    radius="lg"
                    withBorder
                    style={{
                        cursor: 'pointer',
                    }}
                    bg="var(--product-container-bg)"
                    onClick={navigateDetail}
                    className={styles.card}
                >
                    <Card.Section>
                        <Image
                            src={data?.banner && AppConstants.contentRootUrl + data?.banner}
                            alt="Product Image"
                            h={180}
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
                            style={{ height: '50px', marginTop: '3px', lineHeight: 'normal' }}
                        >
                            {data?.name}
                        </Typo>
                        <Typo size="tiny" style={{ color: 'var(--text-color)', minHeight: '10px' }}>
                            {data?.expert?.account?.fullName}
                        </Typo>
                        <Flex align="center" gap={10} mt={5}>
                            <Rating
                                fractions={4}
                                value={data?.averageStar}
                                readOnly
                                size="md"
                                color="var(--star-color)"
                            />
                        </Flex>
                        {/* <Typo size="tiny" style={{ color: 'var(--text-color)' }}>
                            {data?.shortDescription}
                        </Typo> */}
                        <Flex justify="space-between" mt={5} align="center">
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
                    </Box>
                </Card>
            </HoverCard.Target>
        </HoverCard>
    );
};

export default CardCategory;
