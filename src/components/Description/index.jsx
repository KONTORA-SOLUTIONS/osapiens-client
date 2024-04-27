import BlurBox from '../BlurBox';
import styles from './Description.module.scss';

const descriptionListContent = [
  {
    id: 0,
    text: 'Scroll Down',
  },
  {
    id: 1,
    text: 'Zoom in',
  },
  {
    id: 2,
    text: 'Capture zone',
  },
  {
    id: 3,
    text: 'Defect the deforestation',
  },
  {
    id: 4,
    text: 'Save the planet!',
  },
];

const Description = () => {
  return (
    <div className={styles.wrapper}>
      <BlurBox className={styles.blurBox}>
        <h1 className={styles.title}>How to help us?</h1>
        <ul className={styles.list}>
          {descriptionListContent.map(({ id, text }) => (
            <li key={id}>
              <img src="/assets/images/leaf.png" alt="" />
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </BlurBox>
    </div>
  );
};

export default Description;
