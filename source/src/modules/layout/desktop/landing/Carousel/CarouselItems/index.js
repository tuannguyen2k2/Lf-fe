import React from 'react';
import styles from './index.module.scss';
import image from '@assets/images/carousel.png';
import Button from '@components/common/elements/Button';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectHeaderType } from '@selectors/app';
import { actions } from '@store/actions/app';
import Healing from '@components/common/elements/Healing';
import { BackgroundImage, Center, Text } from '@mantine/core';
const message = defineMessages({
    title: 'Learn from expert with Life Uni ',
});
import { AppConstants } from '@constants';
import { Image } from '@mantine/core';
const CarouselItem = ({ item }) => {
    const translate = useTranslate();
    const dispatch = useDispatch();
    const isDefaultHeader = useSelector(selectHeaderType);

    return (
        <Image
            src={item?.image ? AppConstants.contentRootUrl + item?.image : image}
            radius="md"
            // h={'720px'}
            // h={'calc(100% + 30px)'}
            // width={'100% + 30px'}
            fit="cover"
            onClick={() => item?.action == 1 && item?.url && window.open(`${item?.url}`)}
            className={item?.action == 1 && styles.cursorPointer}
        ></Image>
    );
};

export default CarouselItem;
