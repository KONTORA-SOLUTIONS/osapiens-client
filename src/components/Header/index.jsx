import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <p>Username</p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <img src="assets/images/dead-tree.png" alt="" />
            <p>5X</p>
          </div>
          <div className={styles.statItem}>
            <img src="assets/images/alive-tree.png" alt="" />
            <p>5X</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
