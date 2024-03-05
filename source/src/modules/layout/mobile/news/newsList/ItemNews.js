import { Avatar, Group, Rating, Text, Box, Image, Center } from '@mantine/core';
import React from 'react';
import styles from './ItemNews.module.scss';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
import { timeConvert, price, convertUtcToLocalTime } from '@utils';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { AppConstants, DATE_FORMAT_DISPLAY, DEFAULT_FORMAT } from '@constants';
import { Link, useNavigate } from 'react-router-dom';
const ItemNews = ({ item, index }) => {
    const translate = useTranslate();
    const navigation = useNavigate();
    console.log(item);
    return (
        <Group mt={20} w={'90%'} className={styles.item} onClick={() => navigation(`/news/${item.id}`)}>
            <div style={{ width: '100%', padding:'0 10px 0px 10px' }}>
                <Typo size="primary" className={styles.title} style={{ fontWeight:900 }}>
                    {index+1}{". "} {item.title}
                </Typo>
                <Group className={styles.timegroup} gap="sm">
                    <Typo size="sub" type='bold'>
                        Chủ đề:
                    </Typo>
                    <Typo size="sub" style={{ marginLeft:'-8px' }}>
                        {item?.category?.name}
                    </Typo>
                </Group>
                <Group className={styles.timegroup} gap="sm">
                    <Typo size="sub" type='bold'>
                       Ngày tạo:
                    </Typo>
                    <Typo size="sub" style={{ marginLeft:'-8px' }}>
                        {convertUtcToLocalTime(item?.createdDate, DEFAULT_FORMAT, DATE_FORMAT_DISPLAY)}
                    </Typo>
                </Group>
                <Group className={styles.timegroup} gap="sm">
                    <Typo size="sub" type='bold'>
                        Được viết bởi:
                    </Typo>
                    <Typo size="sub" style={{ marginLeft:'-8px' }}>
                        {'Hoàng Thùy'}
                    </Typo>
                </Group>
                <Group gap="sm">
                    {/* <Image src={IconCourse} w="12" h="12" /> */}

                </Group>
            </div>
            <Image
                src={item?.banner ? AppConstants.contentRootUrl + item?.banner : category}
                alt="Relevant Image"
                radius='sm'
                h={'100%'}
                w={'100%'}
            />
            <div style={{ width: '100%', padding:'0 10px 0px 10px' }}>
                <Group justify="space-between">
                    <Group>
                        <Typo size="sub" className={styles.description} >
                            { item?.description }
                        </Typo>
                    </Group>
                </Group>
            </div>
        </Group>
    );
};

export default ItemNews;
