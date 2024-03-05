import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import arrow from '@assets/icons/arrow.svg';
const ContentLanding = ({ title, linkTo, children, className }) => {
    return (
        <div className={classNames(styles.categoryTitle, className)}>
            <h1>{title}</h1>
            {linkTo && (
                <Link to={linkTo} className={classNames(styles.seeMore)}>
                    <span style={{ marginRight: '25px' }}>Xem thêm</span>
                    <img src={arrow} className={styles.icon} alt="" />
                    <img src={arrow} className={styles.icon} alt="" />
                </Link>
            )}
            {children}
        </div>
    );
};

export default ContentLanding;
