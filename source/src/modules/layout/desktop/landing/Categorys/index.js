import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import CategoryItem from '@components/common/elements/Categorys';
import Container from '@components/common/elements/Container';
import SkeLeton from '@components/common/elements/Skeleton';
const CategoryDesktop = ({ categoryCourseList }) => {
    return (
        <Container className={styles.category} id="detail">
            {categoryCourseList ? (
                categoryCourseList?.map((category) => {
                    return (
                        category?.courses?.length > 0 && (
                            <CategoryItem
                                style={{ marginTop: '1.5rem' }}
                                data={category}
                                key={category?.id}
                                renderLink={category?.courses?.length > 4}
                                renderTitle={true}
                            />
                        )
                    );
                })
            ) : (
                <SkeLeton numRow={8} />
            )}
        </Container>
    );
};

export default CategoryDesktop;
