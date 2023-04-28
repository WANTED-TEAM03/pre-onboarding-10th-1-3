import { FaSpinner } from 'react-icons/fa';
import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <FaSpinner color="#ec6130" className={styles.spinner} />
      <h1>잠시만 기다려주세요</h1>
    </div>
  );
}
