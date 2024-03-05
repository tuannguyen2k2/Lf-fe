import React, { useEffect, useState } from 'react';
import styles from './FilterBox.module.scss';
import { Collapse, Divider, Flex, Radio } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import arrow from '@assets/icons/arrow.svg';
import { useDisclosure } from '@mantine/hooks';
const FilterForm = ({ options, queryName, queryKey, form }) => {
    const [ opened, { toggle } ] = useDisclosure(true);

    return (
        <div className={styles.filter}>
            <div className={styles.itemFilter} onClick={toggle}>
                <Flex justify="space-between" align="center" className={styles.section}>
                    <Typo size="sub" type="semi-bold" className={styles.name}>
                        {queryName}
                    </Typo>
                    <img src={arrow} className={styles.arrow} style={opened ? { transform: 'rotate(270deg)' } : {}} />
                </Flex>
            </div>
            <Collapse in={opened} className={styles.lessonWrapper} mb={12}>
                <Radio.Group {...form.getInputProps(queryKey)}>
                    <Flex direction={'column'} gap={10} mt="xs">
                        {options?.map((data, index) => {
                            return (
                                <Radio
                                    key={index}
                                    value={data?.value}
                                    label={data?.name}
                                    classNames={{ label: styles.label }}
                                />
                            );
                        })}
                    </Flex>
                </Radio.Group>
            </Collapse>
            <Divider></Divider>
        </div>
    );
};
export default FilterForm;
