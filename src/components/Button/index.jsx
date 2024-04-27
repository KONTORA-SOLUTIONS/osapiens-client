import clsx from 'clsx';
import { motion } from 'framer-motion';

import styles from './Button.module.scss';

const Button = ({ children, type = 'button', onClick, className }) => {
  const buttonClassName = clsx(styles.button, className && className);
  return (
    <motion.button type={type} onClick={onClick} className={buttonClassName}>
      {children}
    </motion.button>
  );
};

export default Button;
