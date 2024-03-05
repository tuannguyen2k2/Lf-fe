import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselDesktop from './Carousel';
import Feature from './Features';
import FeedbackDesktop from './Feedback';
import Services from './Services';
import Statistics from './Statistics';
import styles from './index.module.scss';
import Banner from './Banner/Banner';
import TabsCategoryDesktop from './TabsCategory';
import Teacher from './Teacher/Teacher';
import CategoryDesktop from './Categorys';

function LandingPageDesktop({
    slideShowData,
    expertList,
    slideShowDataLoading,
    categoryCourseList,
    categoryCourseFree,
    categoryCourseTop,
    categoryCourseNew,
    reviewData,
    courseFreeLoading,
    courseTopLoading,
    courseListLoading,
    categoryCourseNewLoading,
    reviewDataLoading,
    newsData,
}) {
    const navigate = useNavigate();
    return (
        <div className={classNames(styles.landingPage)}>
            <CarouselDesktop slideshowData={slideShowData} />
            <TabsCategoryDesktop
                categoryCourseFree={categoryCourseFree}
                categoryCourseTop={categoryCourseTop}
                courseFreeLoading={courseFreeLoading}
                courseTopLoading={courseTopLoading}
            />
            <CategoryDesktop categoryCourseList={categoryCourseNew} loading={categoryCourseNewLoading} />
            <CategoryDesktop categoryCourseList={categoryCourseList} loading={courseListLoading} />
            <FeedbackDesktop reviewData={reviewData} loading={reviewDataLoading} />
            <Feature />
            <Banner />
            {expertList?.length > 0 && <Teacher data={expertList} />}
            <Services data={newsData}/>
            <Statistics />
        </div>
    );
}

export default LandingPageDesktop;
