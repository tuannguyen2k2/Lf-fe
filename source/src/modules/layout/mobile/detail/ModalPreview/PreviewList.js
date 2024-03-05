import React from 'react';
import { Button } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import { ScrollArea, Box } from '@mantine/core';
import ItemPreview from './ItemPreview';
const PreviewList = ({ handlePreview, coursePreviewData, lessonActive }) => {
    return (
        <div>
            {coursePreviewData?.map((data, index) => {
                return (
                    <Box key={index}>
                        {data?.lessons?.length > 0 && (
                            <>
                                {data?.lessons
                                    ?.filter((item) => item.isPreview === true)
                                    .map((item) => (
                                        <ItemPreview
                                            key={item.id}
                                            item={item}
                                            handlePreview={handlePreview}
                                            lessonActive={lessonActive}
                                        />
                                    ))}
                            </>
                        )}
                    </Box>
                );
            })}
        </div>
    );
};

export default PreviewList;
