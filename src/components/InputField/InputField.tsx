import { useRef } from 'react';
import './InputFIeld.css';

// maybe interface also
type TodoProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
};

export const InputField: React.FC<TodoProps> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        placeholder="Enter a task"
        className="form__input"
      />
      <button className="form__btn" type="submit">
        GO
      </button>
    </form>
  );
};
