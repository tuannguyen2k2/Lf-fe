import React, { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import styles from './index.module.scss';
import { Box, Checkbox, Collapse, Divider, Flex, Button, GridCol, Select, Group, Radio } from '@mantine/core';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import { Link, useLocation } from 'react-router-dom';
import arrow from '@assets/icons/arrow.svg';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconMenuDeep } from '@tabler/icons-react';
import ItemSearch from './ItemSearch';
import useQueryParams from '@hooks/useQueryParams';
import FilterBox from './FilterBox';
import qs from 'query-string';
import { useForm } from '@mantine/form';
import FilterForm from './FilterForm';

const message = defineMessages({
    filterBox: 'Bộ lọc',
    sortBy: 'Sắp xếp theo',
    result: 'Kết quả',
    filter: 'Lọc',
    resetFilter: 'Xoá bộ lọc',
});

const SearchComponent = ({ courseList, categoryOptions, isFreeOptions }) => {
    const params = useLocation();
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const query = queryParameters.get('query');
    const { setQueryParams } = useQueryParams();
    const currentParams = qs.parse(location.search);
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

    const [ filterWidth, setFilterWidth ] = useState(25);
    const [ isExpanded, setIsExpanded ] = useState(false);

    const handleButtonClick = () => {
        setFilterWidth(isExpanded ? 25 : 0);
        setIsExpanded(!isExpanded);
    };

    const form = useForm({
        initialValues: {
            isFree: null,
            fieldId: null,
        },

        validate: {},
    });

    const handleSubmit = (values) => {
        const filteredValues = Object.fromEntries(Object.entries(values).filter(([ key, value ]) => value !== null)); // lọc các giá trị null từ đối tượng values
        setQueryParams({ ...currentParams, ...filteredValues });
    };
    const handleReset = () => {
        setQueryParams({ query: currentParams.query });
    };

    return (
        <div className={classNames(styles.landingPage)}>
            <div className={styles.headerSearch}>
                <Container>
                    <Typo size="primary" type="bold">
                        {courseList?.length} Kết quả cho &ldquo;{query}&ldquo;
                    </Typo>
                </Container>
            </div>
            <div className={styles.fiterBox}>
                <Container>
                    <Group justify="space-between">
                        <Group>
                            <Button
                                onClick={handleButtonClick}
                                variant="outline"
                                size="md"
                                leftSection={<IconMenuDeep />}
                            >
                                {translate.formatMessage(message.filterBox)}
                            </Button>
                            <div className={styles.selectItem}>
                                <Select
                                    size="md"
                                    defaultValue="Liên quan nhất"
                                    classNames={{ input: styles.input }}
                                    data={[ 'Liên quan nhất', 'Có nhiều đánh giá nhất', 'Xếp hạng cao nhất', 'Mới nhất' ]}
                                />
                            </div>
                        </Group>
                        <Typo size="sub" type="semi-bold">
                            {courseList?.length} {translate.formatMessage(message.result)}
                        </Typo>
                    </Group>
                </Container>
            </div>
            <div className={'container'}>
                <div className={`${styles.body} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.filter} style={{ width: `${filterWidth}%` }}>
                        {/* <FilterBox options={isFreeOptions} queryKey="isFree" queryName="Giá" />
                        <FilterBox options={categoryOptions} queryKey="fieldId" queryName="Danh mục" /> */}
                        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                            <FilterForm options={isFreeOptions} queryKey="isFree" queryName="Giá" form={form} />
                            <FilterForm options={categoryOptions} queryKey="fieldId" queryName="Danh mục" form={form} />
                            <Flex gap={10} mt={32}>
                                <Button w={'50%'} type="submit">
                                    {translate.formatMessage(message.filter)}
                                </Button>
                                <Button
                                    w={'50%'}
                                    variant="outline"
                                    color="gray"
                                    onClick={() => {
                                        form.reset();
                                        handleReset();
                                    }}
                                >
                                    {translate.formatMessage(message.resetFilter)}
                                </Button>
                            </Flex>
                        </form>
                    </div>
                    <div className={styles.content} style={{ width: `${100 - filterWidth}%` }}>
                        <Box px={10} pb={10}>
                            {courseList?.map((item) => {
                                return <ItemSearch key={item.id} item={item} />;
                            })}
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
