import React, { useState } from 'react';
import styles from './styles.module.scss';

type TodoItemProps = {
  todoItem: TodoType;
};

export function TodoItem({ todoItem }: TodoItemProps) {
  const { todo, isCompleted } = todoItem;
  const [isUpdating] = useState(false);
  return (
    <li className={styles.todoWrapper}>
      <input type="checkbox" className={styles.todoCheckbox} checked={isCompleted} />
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
          <p className={styles.todo}>{todo}</p>
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
