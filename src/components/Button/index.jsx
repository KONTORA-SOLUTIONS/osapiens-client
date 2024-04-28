import clsx from "clsx";
import { motion } from "framer-motion";

import styles from "./Button.module.scss";

import styled from "styled-components";

// const Button = ({ children, type = 'button', onClick, className }) => {
//   const buttonClassName = clsx(styles.button, className && className);
//   return (
//     <motion.button type={type} onClick={onClick} className={buttonClassName}>
//       {children}
//     </motion.button>
//   );
// };

// export default Button;

const Button = ({ onClick, active, text = "Scan" }) => {
  return (
    <Wrapper active={active} onClick={active ? onClick : () => {}}>
      <Text>{text}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  border: ${({ active }) =>
    active ? "2px solid #00ff00" : "2px solid grey"}; // Corrected border style
  border-radius: 10px;
  cursor: ${({ active }) => (active ? "pointer" : "auto")};

  & > p {
    color: ${({ active }) => (active ? "#00ff00" : "grey")};
  }
`;

const Text = styled.p`
  font-size: 14px;
  text-align: center;
`;

export default Button;
