import React from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import { Skeleton } from '@mantine/core';
const SkeLeton = ({ children, place, content, trigger, overlayClassName, numRow, style, ...rest }) => {
    const skeletons = [];

    for (let i = 0; i <= numRow; i++) {
        skeletons.push(<Skeleton key={i} mb={6} height={8} radius="large"  />);
    }


    return <div style={style}>{skeletons}</div>;
};

export default SkeLeton;
