import React from 'react';
import Typo from '@components/common/elements/Typo';
import CourseCarouselList from '../common/CourseCarouselList';
import { FormattedMessage } from 'react-intl';
import { Box } from '@mantine/core';
import Scroll from '../common/Scroll';
import CardProduct from '@modules/layout/common/mobile/CardProduct';
const RecommendCourse = ({ courseListRef }) => {
    // console.log(courseListRef);
    return (
        <div>
            {courseListRef?.length > 0 && (
                <Box mb={30}>
                    <Typo size="small" type="bold" style={{ marginBottom: '10px' }}>
                        <FormattedMessage defaultMessage="Có thể bạn sẽ thích" />
                    </Typo>
                    <Scroll>
                        {courseListRef?.map((item) => {
                            return <CardProduct key={item.id} item={item} />;
                        })}
                    </Scroll>
                </Box>
            )}
        </div>
    );
};

export default RecommendCourse;
