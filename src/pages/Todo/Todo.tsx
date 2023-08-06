import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTodo, getTodos, updateTodo, deleteTodo } from "./remotes.tsx";
import List from "./List.tsx";
import "./Todo.css";

const Todo = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<any>(null);
  const [text, setText] = useState<string>("");

  //todoList 가져오기
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      fetchTodoList();
    }
  }, []);

  function fetchTodoList() {
    getTodos()
      .then((response) => {
        setTodoList(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //todo 추가
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  function onCreateTodo() {
    createTodo(text)
      .then((response) => {
        console.log(response);
        fetchTodoList();
        setText("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //todo 제거
  const handleDeleteComplete = (id: number) => {
    setTodoList(todoList.filter((todo: any) => todo.id !== id)); // 해당 id를 가진 할일을 배열에서 제거
  };

  return (
    <div className="todo">
      <h2>나의 TODO 리스트✏️</h2>
      <div className="todo-add">
        <input
          data-testid="new-todo-input"
          type="text"
          onChange={onChangeText}
          value={text}
          className="textinput"
        />
      </div>
      <button
        data-testid="new-todo-add-button"
        onClick={onCreateTodo}
        className="todo-add-btn"
      >
        추가
      </button>
      <div>
        {todoList && (
          <div className="todo-list">
            {todoList.map((list: any) => (
              <List
                list={list}
                key={list.id}
                onDelete={() => handleDeleteComplete(list.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
