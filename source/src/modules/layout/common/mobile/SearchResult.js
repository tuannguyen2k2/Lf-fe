import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import styles from './SearchResult.module.scss';
import { Box, Flex } from '@mantine/core';
import Typo from '@components/common/elements/Typo';
import ItemSearch from '@modules/layout/mobile/search/ItemSearch';
import Container from '@components/common/elements/Container';
const SearchResult = ({ courseList, searchValue, closeSearch }) => {
    return (
        <div className={classNames(styles.landingPage)}>
            <div className={styles.headerSearch}>
                <Container>
                    <Typo size="primary" type="semi-bold">
                        {courseList?.length || 0} Kết quả cho &ldquo;{searchValue}&ldquo;
                    </Typo>
                </Container>
            </div>

            <div className={'container'}>
                <Flex direction={'column'} gap={10} pt={16} pb={10}>
                    {courseList?.map((item) => {
                        return <ItemSearch key={item.id} item={item} closeSearch={closeSearch} />;
                    })}
                </Flex>
            </div>
        </div>
    );
};

export default SearchResult;
