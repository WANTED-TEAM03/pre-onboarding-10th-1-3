import styles from './styles.module.scss';

export default function AddTodoInput() {
  return (
    <div className={styles.todoInputWrapper}>
      <input data-testid="new-todo-input" type="text" placeholder="할 일을 입력하세요." />
      <button type="button" data-testid="new-todo-add-button">
        추가
      </button>
    </div>
  );
}
