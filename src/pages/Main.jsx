import { useRef } from 'react';
import { motion } from 'framer-motion';

import Map from '../components/Map';
import Header from '../components/Header';
import Description from '../components/Description';
import ScrollAnimationSegment from '../components/ScrollAnimationSegment';

const Main = () => {
  const mainContent = [
    {
      id: 1,
      ref: useRef(null),
      component: <Description />,
    },
    {
      id: 2,
      ref: useRef(null),
      component: <Map />,
    },
  ];

  return (
    <motion.div className="scroll-container">
      <Header />
      {mainContent.map(({ component, ref, id }) => (
        <ScrollAnimationSegment key={id} ref={ref}>
          {component}
        </ScrollAnimationSegment>
      ))}
    </motion.div>
  );
};

export default Main;
