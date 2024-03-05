import React from 'react';
import TabMobile from '../../landing/TabMobile';
import CourseCarouselList from '@modules/layout/mobile/common/CourseCarouselList';
import Typo from '@components/common/elements/Typo';
import { FormattedMessage } from 'react-intl';
const Recommended = () => {
    return (
        <div style={{ marginBottom: 20 }}>
            <Typo size="small" type="bold" style={{ marginTop: 20, marginBottom: 10 }}>
                <FormattedMessage defaultMessage="Có thể bạn sẽ thích" />
            </Typo>
            <CourseCarouselList />
        </div>
    );
};

export default Recommended;
