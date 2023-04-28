import React, { useState } from 'react';
import { updateTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

type TodoItemProps = {
  todoItem: TodoType;
  onDelete: (id: number) => void;
};

export function TodoItem({ todoItem: { todo, isCompleted, id }, onDelete }: TodoItemProps) {
  const [isUpdating] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleUpdateCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setIsChecked(checked);
    updateTodoAPI(id, todo, checked);
  };

  const handleDeleteButtonClick = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    onDelete(id);
  };

  return (
    <li className={styles.todoWrapper}>
      <input
        type="checkbox"
        className={styles.todoCheckbox}
        checked={isChecked}
        onChange={handleUpdateCheckbox}
      />
      {isUpdating ? (
        <div className={styles.inputWrapper}>
          <input className={styles.updateInput} data-testid="modify-input" />
          <div className={styles.buttonWrapper}>
            <button type="button" data-testid="submit-button">
              제출
            </button>
            <button type="button" data-testid="cancel-button">
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.inputWrapper}>
          <p className={`${styles.todo}${isChecked ? ` ${styles.isChecked}` : ''}`}>{todo}</p>
          <div className={styles.buttonWrapper}>
            <button type="button" data-testid="modify-button">
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
