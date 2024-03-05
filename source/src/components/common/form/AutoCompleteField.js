// import useFormField from '@hooks/useFormField';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader, Select } from '@mantine/core';
import useFetch from '@/hooks/useFetch';
function AutoCompleteField({
    label,
    name,
    placeholder,
    rules,
    required,
    options,
    allowClear = true,
    fieldProps,
    apiConfig,
    mappingOptions,
    searchParams,
    optionsParams = {},
    maxOptions = 100,
    debounceTime = 1000,
    onChange,
    onSelect,
    form,
    ...props
}) {
    // const { placeholder: _placeholder, rules: _rules } = useFormField({
    //     placeholder,
    //     rules,
    //     required,
    // });

    const [ fetching, setFetching ] = useState(false);
    const [ _options, setOptions ] = useState([]);
    const { execute } = useFetch(apiConfig);
    const [ initialOpts, setInitialOpts ] = useState();
    const handleFetchOptions = useCallback(
        ({ searchText, onCompleted, onError }) => {
            execute({
                params: {
                    pageSize: maxOptions,
                    pageNumber: 0,
                    ...optionsParams,
                    ...(searchParams ? searchParams(searchText) : {}),
                },
                onCompleted: (res) => {
                    onCompleted(res.data?.content?.map(mappingOptions));
                },
                onError,
            });
        },
        [ maxOptions, searchParams, mappingOptions, optionsParams ],
    );

    // const handleOnSearch = useMemo(() => {
    //     const onCompleted = (options) => {
    //         setFetching(false);
    //         if (options) {
    //             setOptions(options);
    //         }
    //     };

    //     const onError = () => {
    //         setFetching(false);
    //     };

    //     const loadOptions = (searchText) => {
    //         if (!searchText || !mappingOptions) return;
    //         // setOptions([]);
    //         // setFetching(true);
    //         // handleFetchOptions({ searchText, onCompleted, onError });
    //     };
    //     return debounce(loadOptions, debounceTime);
    // }, [ currentValue ]);

    // const handleFocus = useCallback(() => {
    //     // fallback to initial options if options is empty
    //     if (_options?.length === 0) {
    //         setOptions(initialOpts);
    //     }
    // }, [ _options ]);

    // useEffect(() => {
    //     setOptions(options);
    // }, [ options ]);

    // useEffect(() => {
    //     execute({
    //         params: {
    //             pageSize: 0,
    //             pageNumber: maxOptions,
    //             ...searchParams(''),
    //         },
    //         onCompleted: (res) => {
    //             setInitialOpts(res.data?.content?.map(mappingOptions));
    //         },
    //     });
    // }, []);
    return (
        <Select
            size="md"
            label={label}
            name={name}
            // rules={_rules}
            searchable={true}
            clearable={allowClear}
            data={options?.slice(0, maxOptions) || []}
            nothingFound={fetching ? <Loader size="xs" /> : undefined}
            // onSearchChange={handleOnSearch}
            // placeholder={_placeholder}
            // value={value}
            // onFocus={handleFocus}
            placeholder={placeholder}
            required={required}
            // onClear={() => handleOnSearch('')}
            {...props}
            {...form.getInputProps(name)}
            onChange={onChange}
        />
    );
}

export default AutoCompleteField;
