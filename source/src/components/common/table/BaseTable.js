import React from 'react';

import styles from './BaseTable.module.scss';

const BaseTable = ({ dataSource, columns, loading, pagination, rowKey = (record) => record.id, ...props }) => (
    <div></div>
);

export default BaseTable;
