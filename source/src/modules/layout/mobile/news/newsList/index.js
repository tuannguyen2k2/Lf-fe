import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { Box, Checkbox, Collapse, Divider, Flex, Button, GridCol, Select, Group, Pagination, Center, LoadingOverlay } from '@mantine/core';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { Link, useLocation } from 'react-router-dom';
import arrow from '@assets/icons/arrow.svg';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import ItemNews from './ItemNews';
import BannerListNews from './banner';
const message = defineMessages({
    filterBox: 'Bộ lọc',
    sortBy: 'Sắp xếp theo',
    result: 'Kết quả',
});
const NewsListMobile = ({ newsDataList }) => {
    const params = useLocation();
    const translate = useTranslate();

    const queryParameters = new URLSearchParams(window.location.search);

    const [ activePage, setPage ] = useState(1);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        setData(newsDataList?.slice(0, 4));
    }, [ newsDataList ]);

    useEffect(() => {
        const start = (activePage-1) * 4;
        const end = start + 4;

        setData(newsDataList?.slice(start, end));
    }, [ activePage ]);

    console.log(data);

    return (
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
            { newsDataList ? <Flex px={0} mb={50} direction={'column'} align={'center'}>
                {/* <Box style={{ width:'100%', height:300, border:'1px solid #282a36' }} mb={10}>
                    <BannerListNews data={newsDataList}/>
                </Box> */}
                {data?.map((item, index) => {
                    return <ItemNews key={item.id} item={item} index={index}/>;
                })}

            </Flex> : <Box h={250}>
                <LoadingOverlay
                    visible={true}
                    // zIndex={0}
                    overlayProps={{ radius: 'sm' }}
                    loaderProps={{ type: 'bars' }}
                    style={{ minHeight:'250px' }}/>
            </Box>}
            <div style={{ width:'100%', display:'flex', justifyContent:'center', marginBottom:10 }}>
                <Pagination total={newsDataList?.length / 4 + 1} value={activePage} onChange={setPage} />
            </div>
        </div>
    );
};

export default NewsListMobile;
