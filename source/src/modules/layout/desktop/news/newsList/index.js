import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { Box, Checkbox, Collapse, Divider, Flex, Button, GridCol, Select, Group, Pagination, Text, LoadingOverlay } from '@mantine/core';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { Link, useLocation } from 'react-router-dom';
import arrow from '@assets/icons/arrow.svg';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import ItemNews from './ItemNews';
import BannerListNews from './banner';
import SkeLeton from '@components/common/elements/Skeleton';
const message = defineMessages({
    filterBox: 'Bộ lọc',
    sortBy: 'Sắp xếp theo',
    result: 'Kết quả',
});
const NewsListComponent = ({ newsDataList }) => {
    const params = useLocation();
    const translate = useTranslate();

    const queryParameters = new URLSearchParams(window.location.search);

    const [ activePage, setPage ] = useState(1);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        setData(newsDataList?.slice(0, 4));
    }, [ newsDataList ]);

    useEffect(() => {
        const start = (activePage - 1) * 4;
        const end = start + 4;

        setData(newsDataList?.slice(start, end));
    }, [ activePage ]);


    return (
        <div>
            { newsDataList ?
                <Flex px={0} mb={50} direction={'column'} align={'center'}>
                    <Box style={{ width: '100%', height: 520 }} mb={20}>
                        <BannerListNews data={newsDataList} />
                    </Box>
                    {data?.map((item) => {
                        return <ItemNews key={item.id} item={item} />;
                    })}
                    <div style={{ marginTop: 20 }}>
                        <Pagination total={newsDataList?.length / 4 + 1} style={{ width: '100%' }} value={activePage} onChange={setPage} />
                    </div>
                </Flex> : <LoadingOverlay
                    visible={true}
                    // zIndex={0}
                    overlayProps={{ radius: 'sm' }}
                    loaderProps={{ type: 'bars' }}
                /> }
        </div>
    );
};

export default NewsListComponent;
