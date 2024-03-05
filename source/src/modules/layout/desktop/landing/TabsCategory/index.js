import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Container from '@components/common/elements/Container';
import TabCategory from '@components/common/elements/TabCategory';
const TabsCategoryDesktop = ({ categoryCourseFree, categoryCourseTop, courseTopLoading, courseFreeLoading }) => {
    return (
        <Container className={styles.category} id="course">
            <TabCategory
                categoryCourseFree={categoryCourseFree}
                categoryCourseTop={categoryCourseTop}
                courseFreeLoading={courseFreeLoading}
                courseTopLoading={courseTopLoading}
            />
        </Container>
    );
};

export default TabsCategoryDesktop;
