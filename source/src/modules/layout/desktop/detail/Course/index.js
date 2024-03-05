import arrow from '@assets/icons/arrow.svg';
import { Collapse, Flex, Text, TypographyStylesProvider } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';

import Typo from '@components/common/elements/Typo';
import { LESSON_KIND_VIDEO } from '@constants';
import { commonMessage } from '@constants/intl';
import useTranslate from '@hooks/useTranslate';

import { timeConvert } from '@utils';
import { useEffect } from 'react';
import { IconFileText } from '@tabler/icons-react';
import { ReactComponent as Play } from '@assets/icons/playButton.svg';
import { useParams } from 'react-router-dom';
const CourseComponent = ({ data, openPreview }) => {
    // const [ opened, { toggle } ] = useDisclosure(false);
    const [ selected, setSelected ] = useState([]);
    const setOpen = useCallback(
        (id) => {
            if (selected.includes(id)) {
                const array = selected.filter((item) => item !== id);
                setSelected((pre) => [ ...array ]);
            } else setSelected((pre) => [ ...pre, id ]);
        },
        [ selected, data ],
    );
    const params = useParams();
    const isOpen = useCallback(
        (id) => {
            return selected.includes(id);
        },
        [ selected ],
    );

    const translate = useTranslate();
    useEffect(() => {
        data?.length > 0 ? setOpen(data[0]?.id) : null;
    }, [ data?.length > 0, params?.id ]);

    return (
        <div className={styles.container}>
            {data?.map((data, index) => {
                return (
                    <>
                        <Flex
                            onClick={() => data?.lessons?.length > 0 && setOpen(data?.id)}
                            px={20}
                            py={20}
                            className={styles.item}
                            // key={index}
                            justify={'space-between'}
                        >
                            <Flex gap={20} align={'center'} maw={700}>
                                <img
                                    src={arrow}
                                    // className={styles.arrow}
                                    style={isOpen(data?.id) ? { transform: 'rotate(270deg)' } : {}}
                                />

                                <TypographyStylesProvider m={0} p={0}>
                                    <Text
                                        size="var(--primary-font-size)"
                                        weight={'var(--font-normal)'}
                                        m={0}
                                        p={5}
                                        lineClamp={1}
                                    >
                                        {data?.name}
                                    </Text>
                                </TypographyStylesProvider>
                            </Flex>
                            <Flex gap={5} justify={'start'} w={'160px'}>
                                <Typo size="sub">
                                    {data?.totalLesson && `${data?.totalLesson} `}{' '}
                                    {translate.formatMessage(commonMessage.lesson)}
                                </Typo>
                                {data?.totalStudyTime ? (
                                    <>
                                        <Typo size="sub">&#x2022;</Typo>
                                        <Typo size="sub" style={{ width: '70px' }}>
                                            {data?.totalStudyTime ? timeConvert(data?.totalStudyTime) : '00:00'}
                                        </Typo>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Flex>
                        </Flex>
                        {data?.lessons?.length > 0 && (
                            <Collapse in={isOpen(data?.id)} className={styles.lessonWrapper}>
                                {data?.lessons?.map((lesson, index) => {
                                    return (
                                        <Flex py={15} align="center" justify="space-between" key={index}>
                                            <Flex gap={10} align="center">
                                                {lesson?.kind == LESSON_KIND_VIDEO ? (
                                                    <Play width={20} />
                                                ) : (
                                                    <IconFileText width={20} />
                                                )}

                                                <Text size="var(--sub-font-size) " fw="var(--font-normal)">
                                                    {lesson?.name}
                                                </Text>
                                            </Flex>
                                            <Flex gap={15} w={'145px'}>
                                                <Text
                                                    w={'80px'}
                                                    onClick={() => openPreview(lesson?.id)}
                                                    style={{
                                                        textDecoration: 'underline',
                                                        color: 'var(--primary-color)',
                                                        cursor: 'pointer',
                                                        fontSize: 'var(--sub-font-size',
                                                    }}
                                                >
                                                    {lesson?.isPreview
                                                        ? translate.formatMessage(commonMessage.preview)
                                                        : null}
                                                </Text>
                                                <Typo size="sub">
                                                    {lesson.videoDuration ? timeConvert(lesson.videoDuration) : null}
                                                </Typo>
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

export default CourseComponent;
