import { InputField } from './components/InputField/InputField';
import { useState } from 'react';
import { TodoType } from './components/model';
import { TodoList } from './components/TodoList/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todosArray, setTodosArray] = useState<TodoType[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo) {
      setTodosArray([
        ...todosArray,
        {
          id: Math.random(),
          todo: todo,
          isDone: false,
        },
      ]);
      setTodo('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add;
    let active = todosArray;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodosArray(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="wrapper">
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todosArray={todosArray}
          setTodosArray={setTodosArray}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
