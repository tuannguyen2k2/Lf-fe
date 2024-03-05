import { Avatar, Group, Rating, Text, Box, Image } from '@mantine/core';
import React from 'react';
import styles from './ItemCourseSelling.module.scss';
import classNames from 'classnames';
import Iconquestion from '@assets/icons/question.svg';
import IconCourse from '@assets/icons/courseicon.png';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import category from '@assets/images/category.png';
const ItemCourseSelling = ({ data }) => {
    return (
        <Group
            style={{
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 10,
                paddingTop: 10,
                marginTop: 30,
                borderRadius: 15,
            }}
            className={styles.item}
        >
            <Image src={category} alt="Relevant Image" w="200" radius="md" />
            <Box w="620px">
                <Typo size="primary" type="semi-bold" className={styles.title}>
                    <FormattedMessage defaultMessage="Khóa học Figma thiết kế chuyên nghiệp" />
                </Typo>
                <Group style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <Group className={styles.coursegroup} gap="sm">
                        <Image src={IconCourse} w="20" h="20" />
                        <Typo size="sub">
                            <FormattedMessage defaultMessage="15 bài học" />
                        </Typo>
                    </Group>
                    <Group gap="sm">
                        <Image src={Iconquestion} w="20" h="20" />
                        <Typo size="sub">
                            <FormattedMessage defaultMessage="55 câu hỏi" />
                        </Typo>
                    </Group>
                </Group>
                <Group justify="space-between">
                    <Group>
                        <Typo size="sub" className={styles.numberstart}>
                            <FormattedMessage defaultMessage="4,6" />
                        </Typo>

                        <Rating value={4} readOnly size="20px" color="var(--star-color)"></Rating>
                    </Group>
                    <Group>
                        <Typo size="sub" className={styles.money}>
                            <FormattedMessage defaultMessage="1,2k đã bán" />
                        </Typo>
                    </Group>
                </Group>
            </Box>
        </Group>
    );
};

export default ItemCourseSelling;
