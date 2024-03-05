import { Title } from '@mantine/core';
import React from 'react';

const TitleComponents = ({ size, children }) => {
    const sizeType = {
        small: 'var(--h3-font-size}',
        normal: 'var(--h1-font-size}',
        big: 'var(--h1-font-size}',
    };
    return <Title size={sizeType[size]}>{children}</Title>;
};

export default TitleComponents;
