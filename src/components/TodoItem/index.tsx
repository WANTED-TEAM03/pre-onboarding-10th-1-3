import React, { useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import { updateTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

type TodoItemProps = {
  todoItem: TodoType;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleUpdateTodo: (id: number, todoItem: string, isCompleted: boolean) => Promise<void>;
};

export function TodoItem({
  todoItem: { todo, isCompleted, id },
  handleDeleteTodo,
  handleUpdateTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [editInput] = useInput({ initValue: todo });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editInput.value === todo) {
      return setIsEditing(false);
    }

    await handleUpdateTodo(id, editInput.value, isCompleted);
    setIsEditing(false);
  };

  const handleEditTodo = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (window.confirm('수정한 내용이 사라집니다. 계속하시겠습니까?')) {
      editInput.setValue(todo);
      setIsEditing(false);
    }
  };

  const handleUpdateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setIsChecked(checked);
    updateTodoAPI(id, todo, checked);
  };

  const handleDeleteButtonClick = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    handleDeleteTodo(id);
  };

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <li className={styles.todoWrapper}>
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        checked={isChecked}
        onChange={handleUpdateCheckbox}
      />
      {isEditing ? (
        <form className={styles.inputWrapper} onSubmit={handleSubmit}>
          <input
            data-testid="modify-input"
            className={styles.updateInput}
            value={editInput.value}
            onChange={editInput.onChange}
            ref={inputRef}
          />
          <div className={styles.buttonWrapper}>
            <button data-testid="submit-button" type="submit">
              제출
            </button>
            <button data-testid="cancel-button" type="button" onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.inputWrapper}>
          <p className={`${styles.todo}${isChecked ? ` ${styles.isChecked}` : ''}`}>{todo}</p>
          <div className={styles.buttonWrapper}>
            <button data-testid="modify-button" type="button" onClick={handleEditTodo}>
              수정
            </button>
            <button type="button" data-testid="delete-button" onClick={handleDeleteButtonClick}>
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default React.memo(TodoItem);
