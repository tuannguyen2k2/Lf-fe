import React from 'react';
import styles from './teacher.module.scss';
import Container from '@components/common/elements/Container';
import TeacherList from './TeacherList';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Healing from '@components/common/elements/Healing';
import { Box } from '@mantine/core';
const message = defineMessages({
    title: 'Chuyên gia tiêu biểu ',
});
const Teacher = ({ data }) => {
    const translate = useTranslate();
    return (
        <Box>
            <Container id="expert">
                <Healing size="small" type="bold" style={{ color: 'var(--primary-color)' }}>
                    {translate.formatMessage(message.title)}
                </Healing>

                <TeacherList data={data} />
            </Container>
        </Box>
    );
};

export default Teacher;
