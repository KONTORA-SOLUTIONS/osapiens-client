import styles from './BlurBox.module.scss';

const BlurBox = ({ children, className }) => {
  return <div className={`${styles.blurBox} ${className}`}>{children}</div>;
};

export default BlurBox;
