import React from 'react';
import styles from './index.module.scss';
import Container from '@components/common/elements/Container';
import CategoryItem from '@components/common/elements/Categorys';
import CardCategory from '@components/common/elements/CardCategorys';
import { Box, Flex, ScrollArea } from '@mantine/core';
import SlickCarousel from '../../landing/common/SlickCarousell';
import { commonMessage } from '@constants/intl';
import useTranslate from '@hooks/useTranslate';
import SkeLeton from '@components/common/elements/Skeleton';

const Recommended = ({ dataDetail }) => {
    const translate = useTranslate();
    return (
        <Container className={styles.category}>
            {/* {dataDetail &&
        dataDetail?.dataDetail?.map((category) => {
        return <CategoryItem data={category} key={category?.id} renderLink={false} />;
            return <CardCategory data={category} key={category?.id} renderLink={false} />;
        })} */}
            <h1>{translate.formatMessage(commonMessage.courseSuggest)}</h1>
            {dataDetail ? <SlickCarousel gap={8} column={4} height="500px">
                {dataDetail?.map((category) => {
                    return <CardCategory data={category} key={category?.id} renderLink={false} />;
                })}
            </SlickCarousel> : <SkeLeton numRow={8} style={{ marginTop:10 }}/>}
        </Container>
    );
};

export default Recommended;
