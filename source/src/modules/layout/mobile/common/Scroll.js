import React, { useEffect, useRef, useState } from 'react';
import styles from './Scroll.module.scss';
import CardProduct from '@modules/layout/common/mobile/CardProduct';
import Button from '@components/common/elements/Button';
import { Image } from '@mantine/core';
import { ActionIcon } from '@mantine/core';
import arrowRight from '@assets/icons/arowrightbtn.svg';
import { randomId } from '@mantine/hooks';
import { useCallback } from 'react';

const Scroll = ({ children, shadow }) => {
    const scrollBar = useRef(null);
    const buttonPre = useRef(null);
    const buttonNext = useRef(null);
    const handleLeftButton = () => {
        scrollBar.current.scrollLeft += -150;
        setWidth(scrollBar.current.scrollLeft);
    };
    const [ width, setWidth ] = useState(0);

    const handleRightButton = () => {
        scrollBar.current.scrollLeft += 150;
        setWidth(scrollBar.current.scrollLeft);
    };
    const handleScroll = useCallback(() => {
        setWidth(scrollBar.current.scrollLeft);

        if (scrollBar.current.scrollLeft > 0) {
            buttonPre.current.style.display = 'flex';
        } else {
            buttonPre.current.style.display = 'none';
        }

        if (
            scrollBar.current.scrollLeft < Math.floor(scrollBar.current.scrollWidth - 1 - scrollBar.current.clientWidth)
        ) {
            buttonNext.current.style.display = 'flex';
        } else {
            buttonNext.current.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        const div = scrollBar.current;
        if (scrollBar.current) {
            if (scrollBar.current.scrollLeft > 0) {
                buttonPre.current.style.display = 'flex';
            } else {
                buttonPre.current.style.display = 'none';
            }

            if (scrollBar.current.scrollWidth - scrollBar.current.clientWidth == 0) {
                buttonNext.current.style.display = 'none';
            } else {
                buttonNext.current.style.display = 'flex';
            }
        }

        div.addEventListener('scroll', handleScroll);
    }, [ handleScroll, scrollBar.current?.scrollWidth ]);

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleLeftButton} className={`${styles.button} ${styles.pre}`} refControl={buttonPre}>
                <Image src={arrowRight} w={'10px'} style={{ transform: 'rotate(180deg)' }} />
            </Button>

            <Button onClick={handleRightButton} className={`${styles.button} ${styles.next}`} refControl={buttonNext}>
                <Image src={arrowRight} w={'10px'} />
            </Button>
            <div
                className={styles.scrollMobile}
                style={shadow ? { padding: '10px 5px' } : { padding: '10px 0px' }}
                ref={scrollBar}
            >
                {children}
            </div>
        </div>
    );
};

export default Scroll;
