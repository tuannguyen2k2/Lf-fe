import React, { useCallback, useState } from 'react';
import styles from './LessonList.module.scss';
import arrow from '@assets/icons/arrow.svg';
import { Collapse, Flex, Grid, Text, Title, Box, TypographyStylesProvider } from '@mantine/core';
import play from '@assets/icons/playButton.svg';
import { FormattedMessage } from 'react-intl';
import { useDisclosure } from '@mantine/hooks';
import Typo from '@components/common/elements/Typo';
import { IconFileText } from '@tabler/icons-react';
import { ReactComponent as Play } from '@assets/icons/playButton.svg';
import { LESSON_KIND_VIDEO } from '@constants';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@constants/intl';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const LessonList = ({ data, handlePreview }) => {
    const [ selected, setSelected ] = useState([]);
    const setOpen = useCallback(
        (id) => {
            if (selected.includes(id)) {
                const array = selected.filter((item) => item !== id);
                setSelected((pre) => [ ...array ]);
            } else setSelected((pre) => [ ...pre, id ]);
        },
        [ selected ],
    );

    const isOpen = useCallback(
        (id) => {
            return selected.includes(id);
        },
        [ selected ],
    );
    const params = useParams();
    const translate = useTranslate();
    useEffect(() => {
        data && setOpen(data[0]?.id);
    }, [ data[0]?.id, params?.id ]);
    return (
        <div>
            {data && (
                <Typo size="small" type="bold" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <FormattedMessage defaultMessage="Nội dung khóa học" />
                </Typo>
            )}
            {data?.map((item, index) => {
                return (
                    <>
                        <Flex
                            onClick={() => setOpen(item?.id)}
                            px={20}
                            py={20}
                            className={styles.item}
                            key={index}
                            justify={'space-between'}
                        >
                            <Flex gap={20} align={'center'}>
                                <img
                                    src={arrow}
                                    // className={styles.arrow}
                                    style={isOpen(item?.id) ? { transform: 'rotate(270deg)' } : {}}
                                />

                                <Text
                                    size="var(--primary-font-size)"
                                    weight={'var(--font-normal)'}
                                    m={0}
                                    p={0}
                                    lineClamp={1}
                                    className={styles.section}
                                >
                                    {item?.name}
                                </Text>
                            </Flex>
                        </Flex>
                        {item?.lessons?.length > 0 && (
                            <Collapse in={isOpen(item?.id)} className={styles.lessonWrapper}>
                                {item?.lessons?.map((lesson, index) => {
                                    return (
                                        <Flex py={10} align="center" justify="space-between" key={index}>
                                            <Flex align={'center'} gap={10} width={20} height={20}>
                                                <Flex align={'center'}>
                                                    {lesson?.kind == LESSON_KIND_VIDEO ? (
                                                        <Play width={20} height={20} />
                                                    ) : (
                                                        <IconFileText width={20} height={20} />
                                                    )}
                                                </Flex>
                                                <Text
                                                    size="var(--sub-font-size) "
                                                    fw="var(--font-normal)"
                                                    lineClamp={2}
                                                >
                                                    {lesson?.name}
                                                </Text>
                                            </Flex>

                                            <Flex gap={15}>
                                                {lesson?.isPreview && (
                                                    <Text
                                                        onClick={() => handlePreview(lesson?.id)}
                                                        style={{
                                                            textDecoration: 'underline',
                                                            color: 'var(--primary-color)',
                                                            fontSize: 'var(--sub-font-size)',
                                                        }}
                                                        w={70}
                                                    >
                                                        {lesson?.isPreview &&
                                                            translate.formatMessage(commonMessage.preview)}
                                                    </Text>
                                                )}

                                                <Typo size="sub">{lesson?.time} </Typo>
                                            </Flex>
                                        </Flex>
                                    );
                                })}
                            </Collapse>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default LessonList;
