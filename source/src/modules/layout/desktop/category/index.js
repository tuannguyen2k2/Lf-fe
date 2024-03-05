import React from 'react';

import classNames from 'classnames';
import styles from './index.module.scss';
import { Grid, GridCol } from '@mantine/core';
import CardCategory from '@components/common/elements/CardCategorys';
import Container from '@components/common/elements/Container';
import { categoryKinds } from '@constants';
const CategoryComponent = ({ courseList, category }) => {
    // const { loading, setLoading } = useAppLoading();

    // useEffect(() => {
    //     setLoading(expertLoading);
    // }, [ expertLoading ]);
    // const expert = props?.expert;
    return (
        <div className={classNames(styles.landingPage)}>
            <div className={styles.banner}>
                <Container className={styles.bannerContainer}>
                    {category?.kind == categoryKinds.CATEGORY_KIND_TOP_NEW
                        ? 'Những kinh nghiệm mới nhất'
                        : category?.name}
                </Container>
            </div>

            <div className={'container'}>
                <Grid gutter={20} my={20}>
                    {courseList?.map((item) => {
                        return (
                            <Grid.Col key={item?.id} span={{ base: 3 }}>
                                <CardCategory key={item?.id} data={item} />
                            </Grid.Col>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
};

export default CategoryComponent;
