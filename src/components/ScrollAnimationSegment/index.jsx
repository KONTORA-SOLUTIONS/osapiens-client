import { motion } from 'framer-motion';
import styles from './ScrollAnimationSegment.module.scss';

const ScrollAnimationSegment = ({ id, children }, ref) => {
  function scrollTo(section) {
    section.current.srollIntoView({ behavior: 'smooth' });
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={styles.wrapper}
      onScroll={() => {
        console.log('before scroll');
        scrollTo(ref);
        console.log('after scroll');
      }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollAnimationSegment;
