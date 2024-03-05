import { Group, Image } from '@mantine/core';
import React from 'react';
import styles from './ItemPreview.module.scss';
import classNames from 'classnames';
import IconClock from '@assets/icons/clockicon.png';
import Typo from '@components/common/elements/Typo';
import { timeConvert } from '@utils';
import { AppConstants, LESSON_KIND_VIDEO } from '@constants';
import { IconFileText } from '@tabler/icons-react';
import { ReactComponent as Play } from '@assets/icons/playButton.svg';
const ItemPreview = ({ item, handlePreview, lessonActive }) => {
    return (
        <Group
            className={classNames(styles.item, lessonActive == item.id && styles.activeItem)}
            onClick={() => handlePreview(item.id)}
            wrap="no-wrap"
        >
            {item?.kind == LESSON_KIND_VIDEO ? <Play width={20} /> : <IconFileText width={20} />}
            <Group justify="space-between" w={'100%'} wrap="no-wrap">
                <Typo size="primary" className={styles.title}>
                    {item.name}
                </Typo>

                <Group>
                    <Group className={styles.timegroup} gap="sm" wrap="no-wrap">
                        <Image src={IconClock} w="20" h="20" />
                        <Typo size="sub">{item?.videoDuration && timeConvert(item?.videoDuration)}</Typo>
                    </Group>
                </Group>
            </Group>
        </Group>
    );
};

export default ItemPreview;
