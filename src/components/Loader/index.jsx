import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners';
import styles from './Loader.module.scss';

const loaderOverlayTransition = {
  duration: 0.5,
  ease: 'easeInOut',
};

const loaderOverlayVariants = {
  closed: {
    opacity: 0,
    transition: loaderOverlayTransition,
  },
  opened: {
    opacity: 1,
    transition: loaderOverlayTransition,
  },
};

const Loader = ({ isLoading, infoMessage }) => {
  return (
    <>
      {isLoading && (
        <motion.div
          className={styles.loaderOverlay}
          variants={loaderOverlayVariants}
          initial={loaderOverlayVariants.closed}
          animate={loaderOverlayVariants.opened}
        >
          <div className={styles.infoMessage}>{infoMessage}</div>
          <SyncLoader color="#1f2c04" />
        </motion.div>
      )}
    </>
  );
};

export default Loader;
