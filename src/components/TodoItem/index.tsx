import React, { useState } from 'react';
import { updateTodoAPI } from '@/services/todo';
import styles from './styles.module.scss';

export function TodoItem() {
  const [isUpdating] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [id, todo] = [1, 'hello'];

  const handleUpdateCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
    const isCompleted = event.currentTarget.checked;
    setIsChecked(isCompleted);
    updateTodoAPI(id, todo, isCompleted);
  };

  return (
    <li className={styles.todoWrapper}>
      <input type="checkbox" className={styles.todoCheckbox} onInput={handleUpdateCheckbox} />
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
            <button type="button" data-testid="delete-button">
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default React.memo(TodoItem);
