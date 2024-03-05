import { sendRequest } from '@services/api';
import { useCallback, useEffect, useState } from 'react';

const useFetch = (apiConfig, { immediate = false, mappingData, params = {}, pathParams = {} } = {}) => {
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    const execute = useCallback(
        async ({ onCompleted, onError, ...payload } = {}, cancelType) => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await sendRequest(apiConfig, { params, pathParams, ...payload }, cancelType);
                if (!data.result && data.statusCode !== 200) {
                    throw data;
                }
                !cancelType && setData(mappingData ? mappingData(data) : data);
                onCompleted && onCompleted(data);
                return data;
            } catch (error) {
                !cancelType && setError(error);
                onError && onError(error);
                return error;
            } finally {
                !cancelType && setLoading(false);
            }
        },
        [ apiConfig ],
    );

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [ execute, immediate ]);

    return { loading, execute, data, error, setData };
};

export default useFetch;
