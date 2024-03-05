import { useSelector } from 'react-redux';

import accountSelectors from '@selectors/account';
import useFetchAction from './useFetchAction';
import { accountActions } from '@store/actions';
import useActionLoading from './useActionLoading';
import { getCacheAccessToken } from '@services/userService';
import { getData } from '@utils/localStorage';
import { GROUP_KIND_EXPERT, GROUP_KIND_SELLER, GROUP_KIND_STUDENT, storageKeys } from '@constants';

const useAuth = () => {
    const profile = useSelector(accountSelectors.selectProfile);
    const token = getCacheAccessToken();

    const immediate = !!token && !profile;
    let action = {
        [GROUP_KIND_EXPERT]: accountActions.getExpertProfile,
        [GROUP_KIND_SELLER]: accountActions.getSellerProfile,
        [GROUP_KIND_STUDENT]: accountActions.getProfile,
    };
    const userKind = getData(storageKeys.USER_KIND) || GROUP_KIND_STUDENT;
    useFetchAction(action[userKind], { immediate });

    const { loading } = useActionLoading(accountActions.getProfile.type);

    return { isAuthenticated: !!profile, profile, token, loading: immediate || loading };
};

export default useAuth;
