import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import AddTodoInput from '@/components/AddTodoInput';
import { TodoItem } from '@/components/TodoItem';
import { ROUTE_PATHS } from '@/constants/config';
import { getTodosAPI } from '@/services/todo';
import styles from './styles.module.scss';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();
  const listRef = useRef<HTMLUListElement>(null);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTodosData = useCallback(async () => {
    try {
      setIsLoading(true);
      const todosRes = await getTodosAPI();
      setTodos(todosRes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTodosData();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <AddTodoInput />
      {isLoading && <div className={styles.loading}>할일 목록을 불러오고 있습니다</div>}
      {!isLoading && todos.length === 0 && (
        <div className={styles.emptyTodos}>
          <span>나만의 TodoList를 만들어 보세요</span>
        </div>
      )}
      {!isLoading && todos.length !== 0 && (
        <ul ref={listRef} className={styles.listWrapper}>
          {todos.map(todo => (
            <TodoItem key={todo.id} item={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
