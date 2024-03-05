import React, { Fragment } from 'react';
import styles from './index.module.scss';
import SkeLeton from '@components/common/elements/Skeleton';
import ServicesItem from './ServicesItem';
const ServiceList = ({ data }) => {
    return (
        <div className={styles.servicesList}>
            {/* <>
                <ServicesItem />
                <ServicesItem />
                <ServicesItem />
                <ServicesItem />
            </> */}
            {data ? (
                data?.map((category) => {
                    return (
                        <ServicesItem
                            style={{ marginTop: '1.5rem' }}
                            data={category}
                            key={category?.id}
                            renderLink={category?.length > 3}
                            renderTitle={true}
                        />
                    );
                })
            ) : (
                <SkeLeton numRow={8} />
            )}
        </div>
    );
};

export default ServiceList;
