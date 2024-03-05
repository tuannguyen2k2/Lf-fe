import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { Box, Flex, Group, Select, Button, Divider } from '@mantine/core';
import Container from '@components/common/elements/Container';
import Typo from '@components/common/elements/Typo';
import ItemSearch from './ItemSearch';
import { IconMenuDeep } from '@tabler/icons-react';
import { defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import NavDrawer from '@modules/layout/common/mobile/NavDrawer';
import FilterBox from './FilterBox';
import { useForm } from '@mantine/form';
import useQueryParams from '@hooks/useQueryParams';
import qs from 'query-string';

const message = defineMessages({
    filterBox: 'Bộ lọc',
    sortBy: 'Sắp xếp theo',
    result: 'Kết quả',
    filter: 'Lọc',
    resetFilter: 'Xoá bộ lọc',
});

const SearchComponentMobile = ({ courseList, closeSearch, isFreeOptions, categoryOptions }) => {
    const queryParameters = new URLSearchParams(window.location.search);
    const query = queryParameters.get('query');
    const translate = useTranslate();
    const { params, setQueryParams } = useQueryParams();
    const currentParams = qs.parse(location.search);
    const [ openNavDraw, setOpenNavDraw ] = useState(false);
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
        setOpenNavDraw(false);
    };
    const handleReset = () => {
        setQueryParams({ query: currentParams.query });
        setOpenNavDraw(false);
    };

    return (
        <div className={classNames(styles.landingPage)}>
            <div className={styles.headerSearch}>
                <Container>
                    <Typo size="primary" type="semi-bold">
                        {courseList?.length || 0} Kết quả cho &ldquo;{query}&ldquo;
                    </Typo>
                </Container>
            </div>
            <div className={styles.fiterBox}>
                <Container>
                    <Group justify="space-between">
                        <Group>
                            <Button
                                onClick={() => setOpenNavDraw(true)}
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
                    </Group>
                </Container>
            </div>
            <div className={'container'}>
                <Flex direction={'column'} gap={10} pt={16} pb={10}>
                    {courseList?.map((item) => {
                        return <ItemSearch key={item.id} item={item} closeSearch={closeSearch} />;
                    })}
                </Flex>
            </div>
            <NavDrawer
                direction={'right'}
                open={openNavDraw}
                onClose={() => setOpenNavDraw(false)}
                headerTitle={translate.formatMessage(message.filterBox)}
            >
                <Divider></Divider>

                <ul className={styles.nav}>
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <FilterBox options={isFreeOptions} queryKey="isFree" queryName="Giá" form={form} />
                        <FilterBox options={categoryOptions} queryKey="fieldId" queryName="Danh mục" form={form} />
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
                </ul>
            </NavDrawer>
        </div>
    );
};

export default SearchComponentMobile;
