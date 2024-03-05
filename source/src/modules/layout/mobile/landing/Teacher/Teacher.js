import React from 'react';
import styles from './teacher.module.scss';
import Container from '@components/common/elements/Container';
import TeacherList from './TeacherList';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Healing from '@components/common/elements/Healing';
import { Text, Box } from '@mantine/core';

const message = defineMessages({
    title: 'Giảng viên tiêu biểu ',
});
const Teacher = ({ data }) => {
    const translate = useTranslate();
    return (
        <Container>
            <Box>
                <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} mb={20} mt={30}>
                    {translate.formatMessage(message.title)}
                </Text>
                <TeacherList data={data} />
            </Box>
        </Container>
    );
};

export default Teacher;
