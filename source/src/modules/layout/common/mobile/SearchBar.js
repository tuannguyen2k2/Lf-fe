import useTranslate from '@hooks/useTranslate';
import { ActionIcon, Input, Modal, ScrollArea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { defineMessages } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import classNames from 'classnames';
import { useDisclosure } from '@mantine/hooks';
import SearchComponentMobile from '@modules/layout/mobile/search';
import useDebounce from '@hooks/useDebounce';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import SearchResult from './SearchResult';
const message = defineMessages({
    inputSearch: 'Nhập từ khoá...',
});
const SearchBar = ({ openedSearch, openSearch, closeSearch, className, id }) => {
    const inputRef = useRef();

    const [ searchValue, setSearchValue ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);

    const debouncedValue = useDebounce(searchValue, 500);

    const translate = useTranslate();
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            searchValue: '',
        },
        validate: {},
    });
    const handleSubmit = () => {
        try {
            navigate(`/search?query=${searchValue}`);
        } catch (error) {
            console.error('Search error:', error);
        }
    };
    const handleOnchange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };
    const { data: courseList, execute: executeCourse } = useFetch(apiConfig.course.getClientList);
    const handeGetListCourse = (debouncedValue) => {
        executeCourse({
            params: { query: debouncedValue },
            onCompleted: (res) => {
                setSearchResult(res?.data?.content);
                openSearch();
            },
        });
    };
    useEffect(() => {
        if (debouncedValue.length == 0) {
            closeSearch();
        } else {
            handeGetListCourse(debouncedValue);
        }
    }, [ debouncedValue ]);

    return (
        <div id={id} className={classNames(styles.wrapper, className)}>
            <form onSubmit={form.onSubmit(() => handleSubmit())} className={styles.searchForm}>
                <Input
                    ref={inputRef}
                    leftSectionPointerEvents="all"
                    leftSection={
                        <ActionIcon variant="transparent" type="submit">
                            <IconSearch />
                        </ActionIcon>
                    }
                    radius="lg"
                    value={searchValue}
                    onChange={handleOnchange}
                    placeholder={translate.formatMessage(message.inputSearch)}
                />
            </form>

            <Modal
                opened={openedSearch}
                onClose={() => {
                    closeSearch();
                    // setQueryParams({});
                }}
                withCloseButton={false}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                zIndex={300}
                withOverlay={false}
                styles={{
                    inner: {
                        top: 112,
                    },
                    title: {
                        fontSize: 'var(--h1-font-size)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--title-color)',
                        marginLeft: '130px',
                    },
                    header: {
                        paddingTop: '20px',
                        paddingBottom: 0,
                        paddingRight: '15px',
                    },
                    body: {
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
            >
                <SearchResult courseList={searchResult} searchValue={debouncedValue} closeSearch={closeSearch} />
            </Modal>
        </div>
    );
};
export default SearchBar;
