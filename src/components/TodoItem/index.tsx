import React, { useEffect, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import styles from './styles.module.scss';

type TodoItemProps = {
  todoItem: TodoType;
  handleUpdateTodo: (id: number, todoItem: string, isCompleted: boolean) => Promise<void>;
};

export function TodoItem({ todoItem, handleUpdateTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput] = useInput({ initValue: todoItem.todo });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <li className={styles.todoWrapper}>
      <input type="checkbox" className={styles.todoCheckbox} />
      {isEditing ? (
        <form className={styles.inputWrapper}>
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
            <button data-testid="cancel-button" type="button">
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.inputWrapper}>
          <p className={styles.todo}>{todoItem.todo}</p>
          <div className={styles.buttonWrapper}>
            <button data-testid="modify-button" type="button" onClick={handleEditTodo}>
              수정
            </button>
            <button data-testid="delete-button" type="button">
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default React.memo(TodoItem);
