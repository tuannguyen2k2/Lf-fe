import React from 'react';
import styles from './button.module.scss';
const ImgButton = ({ className, style, onClick, img }) => {
    return (
        <div
            className={className}
            style={{
                ...style,
                background: 'white',
                width: '90px',
                height: '90px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                boxShadow: '0 0 3px #ccc',
            }}
            onClick={onClick}
        >
            <div>
                <img
                    className={styles.button__image}
                    // src={`${URL_IMG}${item?.img}`}
                    src={img}
                    alt="product"
                />
            </div>
        </div>
    );
};

export default ImgButton;
