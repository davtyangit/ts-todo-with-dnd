import { Droppable } from 'react-beautiful-dnd';
import { TodoType } from '../model';
import { SingleTodo } from './components/single-todo/SingleTodo';
import './TodoList.css';

type TodosProps = {
  todosArray: TodoType[];
  setTodosArray: React.Dispatch<React.SetStateAction<TodoType[]>>;
  completedTodos: TodoType[] | undefined;
  setCompletedTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const TodoList: React.FC<TodosProps> = ({
  todosArray,
  setTodosArray,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos_heading">active tasks</span>
            {todosArray.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                setTodosArray={setTodosArray}
                todosArray={todosArray}
                key={todo.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="todoRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver ? 'dragcomlete' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos_heading">completed tasks</span>
            {completedTodos &&
              completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  setTodosArray={setCompletedTodos}
                  todosArray={completedTodos}
                  key={todo.id}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
