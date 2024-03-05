import { Avatar, Group, Rating, Text, Box, Image, Button } from '@mantine/core';
import React from 'react';
import styles from './itemCart.module.scss';
import classNames from 'classnames';
import IconClock from '@assets/icons/clockicon.png';
import IconCourse from '@assets/icons/courseicon.png';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
import { AppConstants } from '@constants';
import { IconTrash } from '@tabler/icons-react';
import { price } from '@utils';
import { modals } from '@mantine/modals';
import { commonMessage } from '@constants/intl';
const ItemCart = ({ data, removeItem }) => {
    const translate = useTranslate();

    const DeleteItemConfirm = (data) => {
        modals.openConfirmModal({
            title: (
                <Typo size="small" type="semi-bold" style={{ color: 'var(--primary-color)' }}>
                    <FormattedMessage defaultMessage={'Xác nhân'} />
                </Typo>
            ),
            children: (
                <Typo size="sub">
                    <FormattedMessage defaultMessage={'Bạn có muốn Khóa học này ra khỏi giỏ hàng?'} />
                </Typo>
            ),
            size: '300px',
            centered: true,
            zIndex: 9999,
            withCloseButton: false,
            labels: { confirm: 'Xóa', cancel: 'Hủy' },
            onConfirm: () => removeItem(data),
        });
    };
    return (
        <div className={styles.item}>
            <Group className={styles.itemcart} gap="xs" pl={5}>
                <Box>
                    <Image
                        src={data?.avatar ? AppConstants.contentRootUrl + data?.avatar : category}
                        alt="Relevant Image"
                        w="100px"
                        height={'100%'}
                        radius="md" //
                    />
                </Box>
                <Box>
                    <Typo size="primary">{data?.name}</Typo>
                    <Group>
                        <Typo size="primary" style={{ color: 'var(--primary-color)' }}>
                            {data?.price == 0
                                ? translate.formatMessage(commonMessage.free)
                                : data?.saleOff
                                    ? price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)
                                    : price(data?.price)}
                            {/* {price(data?.price - ((data?.price * 1) / 100) * data?.saleOff)} */}
                        </Typo>
                    </Group>
                </Box>
                {removeItem && <IconTrash className={styles.trash} onClick={() => DeleteItemConfirm(data)} />}
            </Group>
        </div>
    );
};

export default ItemCart;
