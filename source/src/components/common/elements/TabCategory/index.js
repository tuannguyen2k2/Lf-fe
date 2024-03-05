import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import { Tabs } from '@mantine/core';
import CategoryCarousel from '../Categorys/CategoryCarousel';
import Healing from '../Healing';
import { FormattedMessage } from 'react-intl';
const TabCategory = ({ categoryCourseFree, categoryCourseTop, courseTopLoading, courseFreeLoading }) => {
    return (
        <div className={(classNames(styles.categoryDesktop), 'category-desktop')}>
            {/* <Healing size="small" type="bold" className={styles.categoryTitle}>
                {data?.title}
            </Healing> */}
            <Tabs
                mt={40}
                defaultValue="gallery"
                classNames={{
                    root: styles.tabsCategory,
                    list: styles.listCategory,
                    tabLabel: styles.tabLabelCategory,
                    // tab: classNames(styles.categoryTab),
                }}
            >
                <Tabs.List>
                    <Tabs.Tab value="gallery">
                        <FormattedMessage defaultMessage="Khóa học miễn phí" />
                    </Tabs.Tab>
                    <Tabs.Tab value="messages">
                        <FormattedMessage defaultMessage="Khoá học cao cấp" />
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="gallery">
                    <CategoryCarousel data={categoryCourseFree?.courses} loading={courseFreeLoading}/>
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <CategoryCarousel data={categoryCourseTop?.courses} loading={courseTopLoading}/>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
export default TabCategory;
