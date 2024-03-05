import React from 'react';
import { useState } from 'react';
import { Modal, em } from '@mantine/core';
import styles from './Modal.module.scss';
import { useMediaQuery } from '@mantine/hooks';
// import close from '@assets/icons/close.png';

const BasicModal = (props) => {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const {
        top,
        children,
        afterOpenModal,
        title,
        onCloseModal,
        style,
        isOpen,
        onOkModal,
        onCancelModal,
        size,
        footer,
        classNames,
        fullScreen,
    } = props;
    return (
        <Modal
            size={size}
            style={{ top: top || 'auto', zIndex: 200 }}
            opened={isOpen}
            onAfterOpen={afterOpenModal}
            onClose={onCloseModal}
            title={title}
            classNames={{ ...classNames }}
            centered
            closeOnClickOutside={false}
            fullScreen={isMobile}
        >
            <div className={styles.modalContent}>{children}</div>
            {footer && (
                <div className={styles.modalFooter}>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            onCancelModal();
                            onCloseModal();
                        }}
                    >
                        Cancel
                    </button>
                    <button className={styles.okButton} onClick={onOkModal}>
                        Ok
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default BasicModal;
