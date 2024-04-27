import { useCallback } from 'react';

import { IoClose } from 'react-icons/io5';

import styles from './Modal.module.scss';

const Modal = ({ setIsModalOpen, imgSrc }) => {
  const closeModalHandler = () => setIsModalOpen(false);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={closeModalHandler}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <IoClose className={styles.closeBtn} onClick={closeModalHandler} />
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
};

export default Modal;
