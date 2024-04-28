import { useCallback } from "react";

import { IoClose } from "react-icons/io5";

import styles from "./Modal.module.scss";

import styled from "styled-components";
import { CloseIcon } from "../Icons/Icons";
import Button from "../Button";

const Modal = ({ setIsModalOpen, imgSrc, setIsCaptureAvailable }) => {
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setIsCaptureAvailable(true);
  };

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Wrapper className={styles.modalOverlay} imgSrc={imgSrc}>
      <CloseIconBox onClick={closeModalHandler}>
        <CloseIcon />
      </CloseIconBox>
      {/* <div className={styles.modalContent} onClick={handleContentClick}>
        <IoClose className={styles.closeBtn} onClick={closeModalHandler} />
        <img src={imgSrc} alt="" />
      </div> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 512px;
  height: 512px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
`;

const CloseIconBox = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 15px;
  right: 15px;
  cursor: pointer;

  & > svg {
    width: 30px;
    height: 30px;
  }
`;

export default Modal;
