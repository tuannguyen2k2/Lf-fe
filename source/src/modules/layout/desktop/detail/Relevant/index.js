import React from 'react';
import RelevantList from './RelevantList';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';

const RelevantComponent = ({ courseListRef }) => {
    return (
        <div style={{ marginTop: 30, marginBottom: 40, width: 1100 }}>
            {courseListRef?.length > 0 && (
                <Typo size="small" type="semi-bold">
                    <FormattedMessage defaultMessage="Khóa học liên quan" />
                </Typo>
            )}

            <RelevantList courseListRef={courseListRef} />
        </div>
    );
};

export default RelevantComponent;
