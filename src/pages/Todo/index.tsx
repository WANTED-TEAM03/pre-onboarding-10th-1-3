import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import AddTodoInput from '@/components/AddTodoInput';
import { TodoItem } from '@/components/TodoItem';
import { ROUTE_PATHS } from '@/constants/config';
import useInput from '@/hooks/useInput';
import { createTodoAPI, getTodosAPI, deleteTodoAPI, updateTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

export default function TodoPage() {
  const isLoggedIn = useOutletContext();
  const listRef = useRef<HTMLUListElement>(null);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoInput] = useInput({
    initValue: '',
  });

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATHS.signIn} />;
  }

  const handleUpdateTodo = useCallback(async (id: number, todo: string, isCompleted: boolean) => {
    if (todo === '') return alert('내용을 입력해주세요.');
    const updatedTodo = await updateTodoAPI(id, todo, isCompleted);
    setTodos(prevTodos => prevTodos.map(prevTodo => (prevTodo.id === id ? updatedTodo : prevTodo)));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoInput.value === '') return;
    const response = await createTodoAPI(todoInput.value);
    if (response) {
      setTodos(list => [...list, response]);
    }

    const scrollToBottom = () => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth',
      });
    };

    scrollToBottom();
    todoInput.setValue('');
  };

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

  const handleDeleteTodo = async (id: number) => {
    const response = await deleteTodoAPI(id);

    if (response?.status === 204) {
      setTodos(preTodos => preTodos.filter(todo => todo.id !== id));
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <AddTodoInput value={todoInput.value} onChange={todoInput.onChange} onSubmit={handleSubmit} />
      {isLoading && <div className={styles.loading}>할일 목록을 불러오고 있습니다</div>}
      {!isLoading && todos.length === 0 && (
        <div className={styles.emptyTodos}>
          <span>나만의 TodoList를 만들어 보세요</span>
        </div>
      )}
      {!isLoading && todos.length !== 0 && (
        <ul ref={listRef} className={styles.listWrapper}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todoItem={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
