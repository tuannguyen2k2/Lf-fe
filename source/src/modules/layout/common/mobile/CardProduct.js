import React from 'react';
import { Card, Box, Image, Flex, Rating, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import Typo from '@components/common/elements/Typo';
import useFetch from '@hooks/useFetch';
import { formatMoney } from '@utils';
import { FormattedMessage } from 'react-intl';
import routes from '@routes';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppConstants } from '@constants';
import { price } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
const CardProduct = ({ item }) => {
    const navigate = useNavigate();
    const translate = useTranslate();
    const navigateDetail = () => {
        navigate(generatePath(routes.detailPage.path, { id: item?.id }), {
            state: {
                action: 'home',
                prevPath: location.pathname,
            },
        });
    };

    return (
        <div>
            <Card
                shadow="sm"
                padding={'10px'}
                radius="lg"
                withBorder
                w={'10rem'}
                h={'11,5rem'}
                style={{ cursor: 'pointer' }}
                bg="var(--product-container-bg)"
                onClick={navigateDetail}
            >
                <Card.Section>
                    <Image
                        src={item?.banner && AppConstants.contentRootUrl + item?.banner}
                        alt="Product Image"
                        fallbackSrc="https://placehold.co/600x400"
                        h={90}
                    />
                </Card.Section>

                <Box>
                    <Text
                        size={'var(--primary-font-size)'}
                        fw="var(--font-semi-bold)"
                        c={'var(--text-color)'}
                        mt={5}
                        mb={3}
                        lineClamp={2}
                        h={32}
                    >
                        {item?.name}
                    </Text>
                    {/* <Typo size="sub" style={{ color: 'var(--text-color)' }}>
                        {item?.expert?.account?.fullName}
                    </Typo> */}
                    <Rating
                        fractions={4}
                        value={item?.averageStar}
                        color="var(--star-color)"
                        readOnly
                        size="xs"
                        mt={5}
                    />
                    <Flex justify="space-between" align="center" mt={10}>
                        <Flex align="center">
                            <Text
                                size={'var(--primary-font-size)'}
                                fw={'var(--font-semi-bold)'}
                                c={'var(--primary-color)'}
                            >
                                {item?.price == 0
                                    ? translate.formatMessage(commonMessage.free)
                                    : item?.saleOff
                                        ? price(item?.price - ((item?.price * 1) / 100) * item?.saleOff)
                                        : price(item?.price)}
                            </Text>
                            {/* <Text size={'var(--sub-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'}>
                                {price(item?.price)}
                            </Text> */}
                        </Flex>
                        {/* <Typo size="tiny" style={{ color: 'var(--text-color)' }}>
                            <FormattedMessage defaultMessage="1.2k đã học" />
                        </Typo> */}
                    </Flex>
                </Box>
            </Card>
        </div>
    );
};

export default CardProduct;
