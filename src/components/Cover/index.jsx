import styles from './Cover.module.scss';

const Cover = ({ children }) => {
  return (
    <main className={styles.cover}>
      <h1 className={styles.heading}>SAVE NATURE WITH US</h1>
      {children}
    </main>
  );
};

export default Cover;
