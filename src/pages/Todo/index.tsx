import { useRef, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import AddTodoInput from '@/components/AddTodoInput';
import { TodoItem } from '@/components/TodoItem';
import { ROUTE_PATHS } from '@/constants/config';
import useInput from '@/hooks/useInput';
import { createTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();
  const listRef = useRef<HTMLUListElement>(null);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoInput] = useInput({
    initValue: '',
  });

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }

  const scrollToBottom = () => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput.value === '') return;
    const response = await createTodoAPI(todoInput.value);
    if (response) {
      setTodos(list => [...list, response]);
    }
    scrollToBottom();
    todoInput.setValue('');
  };

  return (
    <div className={styles.pageWrapper}>
      <AddTodoInput value={todoInput.value} onChange={todoInput.onChange} onSubmit={handleSubmit} />
      <ul ref={listRef} className={styles.listWrapper}>
        {todos.map(todo => (
          <TodoItem key={todo.id} />
        ))}
      </ul>
    </div>
  );
}
