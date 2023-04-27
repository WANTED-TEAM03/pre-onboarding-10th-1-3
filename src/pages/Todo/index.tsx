import { useRef } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import AddTodoInput from '@/components/AddTodoInput';
import { TodoItem } from '@/components/TodoItem';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();
  const listRef = useRef<HTMLUListElement>(null);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }

  return (
    <div className={styles.pageWrapper}>
      <AddTodoInput />
      <ul ref={listRef} className={styles.listWrapper}>
        <TodoItem />
      </ul>
    </div>
  );
}
