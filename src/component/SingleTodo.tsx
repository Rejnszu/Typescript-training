import React, { useState, useRef, useEffect } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import TodoList from "./TodoList";
import { Draggable } from "react-beautiful-dnd";
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      })
    );
    setEdit(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => {
            handleEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single__text"
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
            />
          ) : todo.isDone ? (
            <s className="todos__single__text">{todo.todo}</s>
          ) : (
            <span className="todos__single__text">{todo.todo}</span>
          )}

          <div className="">
            <span
              className="icon"
              onClick={(e) => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                } else {
                  handleEdit(e, todo.id);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={() => {
                handleDone(todo.id);
              }}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
