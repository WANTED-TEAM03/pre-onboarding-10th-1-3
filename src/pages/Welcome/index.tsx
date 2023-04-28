import { Link } from 'react-router-dom';
import background from '@/assets/todo_background.png';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function WelcomePage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.intro}>
          <h1>
            Manage your <b>TODO</b>
          </h1>
          <p>당신의 할 일을 효율적으로 관리해보세요.</p>
          <p>Todo에서 체계적인 목표를 설정해 생산적인 하루를 보내보세요.</p>
          <p>당신도 J가 될 수 있습니다.</p>
          <Link to={ROUTE_PATHS.todo}>시작하기</Link>
        </div>
        <div className={styles.todoBackground} style={{ backgroundImage: `url(${background})` }} />
      </div>
    </div>
  );
}
