import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { generatePath, useNavigate } from 'react-router-dom';
import { AppConstants } from '@constants';
import newImage from '@assets/images/new-image.png';
import Button from '@components/common/elements/Button';
import downIcon from '@assets/icons/down.svg';
import routes from '@routes';
import { Box } from '@mantine/core';
import Hero from './Hero/Hero';
import TabMobile from './TabMobile';
import Category from './Category';
import FeedBack from './FeedBack';
import Feature from './Features';
import Teacher from './Teacher/Teacher';
import Banner from './Banner';
import Statistics from './Statistics';
import Services from './Services';
import useAuth from '@hooks/useAuth';
import CategoryList from './Category/CategoryList';
function LandingPageMobile({
    expertList,
    slideShowData,
    courseList,
    categoryCourseList,
    categoryCourseTop,
    categoryCourseFree,
    categoryCourseNew,
    reviewData,
    courseFreeLoading,
    courseTopLoading,
    courseListLoading,
    categoryCourseNewLoading,
    reviewDataLoading,
    newsData,
    newsDataLoading,
}) {
    const navigate = useNavigate();
    const { profile } = useAuth();
    return (
        <div>
            <Hero slideshowData={slideShowData} />
            <TabMobile
                courseList={courseList}
                categoryCourseTop={categoryCourseTop}
                categoryCourseFree={categoryCourseFree}
                courseFreeLoading={courseFreeLoading}
                courseTopLoading={courseTopLoading}
            />
            <Category categoryCourseList={categoryCourseNew} loading={categoryCourseNewLoading}/>
            <Category categoryCourseList={categoryCourseList} loading={courseListLoading}/>
            <FeedBack reviewData={reviewData} loading={reviewDataLoading}/>
            <Feature />
            <Banner />
            <Teacher data={expertList} />
            <Services data={newsData} loading={newsDataLoading}/>
            <Statistics />
        </div>
    );
}

export default LandingPageMobile;
