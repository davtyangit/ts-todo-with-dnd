import { TodoType } from '../../../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useState, useRef, useEffect } from 'react';
import './SingleTodo.css';
import { Draggable } from 'react-beautiful-dnd';

type SingleTodoProps = {
  index: number;
  todo: TodoType;
  todosArray: TodoType[];
  setTodosArray: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const SingleTodo: React.FC<SingleTodoProps> = ({
  index,
  setTodosArray,
  todosArray,
  todo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: string | number) => {
    setTodosArray(
      todosArray.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)),
    );
  };

  const handleRemove = (id: string | number) => {
    setTodosArray(todosArray.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number | string) => {
    e.preventDefault();
    setTodosArray(todosArray.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single-todo__form ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {edit ? (
            <input
              ref={inputRef}
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos-single__text"
            />
          ) : todo.isDone ? (
            <span className="single-todo-form__text completed">{todo.todo}</span>
          ) : (
            <span className="single-todo-form__text active">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>
              <AiFillEdit />
            </span>
            <span
              className="icon"
              onClick={() => {
                handleRemove(todo.id);
              }}>
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() => {
                handleDone(todo.id);
              }}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
