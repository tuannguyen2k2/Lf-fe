import React from 'react';
import { Text, Tabs, Box } from '@mantine/core';
import CourseCarouselList from '@modules/layout/mobile/common/CourseCarouselList';
import styles from './index.module.scss';
import useTranslate from '@hooks/useTranslate';
import { FormattedMessage, defineMessages } from 'react-intl';
import Container from '@components/common/elements/Container';
const message = defineMessages({
    title: 'Những kinh nghiệm được học nhiều nhất? ',
    tab1: 'Khóa học miễn phí',
    tab2: 'Khóa học Cao cấp',
});
const TabMobile = ({ courseList, categoryCourseTop, categoryCourseFree, courseTopLoading, courseFreeLoading }) => {
    const translate = useTranslate();
    return (
        <Container>
            <Box>
                {/* <Text size={'var(--h3-font-size)'} fw={'var(--font-bold)'} c={'var(--primary-color)'} maw={400} mb={20}>
                    {translate.formatMessage(message.title)}
                </Text> */}

                <Tabs
                    keepMounted={false}
                    defaultValue="freeCourse"
                    classNames={{
                        root: styles.tabsCategory,
                        list: styles.listCategory,
                        tabLabel: styles.tabLabelCategory,
                    }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="freeCourse"> {translate.formatMessage(message.tab1)}</Tabs.Tab>
                        <Tabs.Tab value="feeCourse">{translate.formatMessage(message.tab2)}</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="freeCourse">
                        <CourseCarouselList courseList={categoryCourseFree?.courses} loading={courseFreeLoading} />
                    </Tabs.Panel>

                    <Tabs.Panel value="feeCourse">
                        <CourseCarouselList courseList={categoryCourseTop?.courses} loading={courseTopLoading} />
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </Container>
    );
};

export default TabMobile;
