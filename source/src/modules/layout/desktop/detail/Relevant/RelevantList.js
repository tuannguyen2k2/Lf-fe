import React from 'react';
import ItemRelevant from './ItemRelevant';
import { Button } from '@mantine/core';
import { FormattedMessage } from 'react-intl';
import { ScrollArea, Box } from '@mantine/core';
const RelevantList = ({ courseListRef }) => {
    return (
        <div>
            <ScrollArea.Autosize mah={470}>
                <Box px={10} pb={10}>
                    {courseListRef?.map((item) => {
                        return <ItemRelevant key={item.id} item={item} />;
                    })}
                </Box>
            </ScrollArea.Autosize>
        </div>
    );
};

export default RelevantList;
