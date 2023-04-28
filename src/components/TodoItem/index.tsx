import React, { useState } from 'react';
import styles from './styles.module.scss';

type TodoItemProps = {
  todoItem: TodoType;
  onDelete: (id: number) => void;
};

export function TodoItem({ todoItem, onDelete }: TodoItemProps) {
  const { todo, isCompleted, id } = todoItem;

  const [isUpdating] = useState(false);

  const handleDeleteButtonClick = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    onDelete(id);
  };

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
