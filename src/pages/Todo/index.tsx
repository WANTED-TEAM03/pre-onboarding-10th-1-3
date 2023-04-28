import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import AddTodoInput from '@/components/AddTodoInput';
import { TodoItem } from '@/components/TodoItem';
import { ROUTE_PATHS } from '@/constants/config';
import { updateTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();
  const listRef = useRef<HTMLUListElement>(null);
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleUpdateTodo = useCallback(async (id: number, todo: string, isCompleted: boolean) => {
    if (todo === '') return alert('내용을 입력해주세요.');
    const updatedTodo = await updateTodoAPI(id, todo, isCompleted);
    setTodos(prevTodos => prevTodos.map(prevTodo => (prevTodo.id === id ? updatedTodo : prevTodo)));
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }

  return (
    <div className={styles.pageWrapper}>
      <AddTodoInput />
      <ul ref={listRef} className={styles.listWrapper}>
        {todos.map(todo => (
          <TodoItem key={todo.id} todoItem={todo} handleUpdateTodo={handleUpdateTodo} />
        ))}
      </ul>
    </div>
  );
}
