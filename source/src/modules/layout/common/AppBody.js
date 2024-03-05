import React, { useEffect, useState } from 'react';
import styles from './AppBody.module.scss';
import useDevices from '@hooks/useDevices';
const AppBody = ({ children, width }) => {
    return (
        <main style={{ minWidth: width }} className={styles.main}>
            {children}
        </main>
    );
};

export default AppBody;
