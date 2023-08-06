import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createTodo, getTodos, updateTodo, deleteTodo } from "./remotes.tsx";
import "./Todo.css";

const List = (props: any) => {
  const { list, onDelete } = props;
  const [todo, setTodo] = useState<string>(list.todo);
  const [isCheck, setIsCheck] = useState<boolean>(list.isCompleted);
  const [update, setUpdate] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  //checkbox 버튼
  function handleChange() {
    const newIsCheck = !isCheck;
    setIsCheck(newIsCheck);
    updateTodo(list.id, todo, newIsCheck)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 수정 버튼
  function onUpdateTodo() {
    setUpdate(true);
  }

  // 삭제 버튼
  function onDeleteTodo() {
    deleteTodo(list.id)
      .then((response) => {
        onDelete(list.id);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 제출 버튼
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  function onSubmitTodo() {
    if (text) {
      setTodo(text);
      updateTodo(list.id, text, isCheck)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setUpdate(false);
  }

  // 취소 버튼
  function onCancleTodo() {
    setUpdate(false);
  }

  return (
    <div className="list">
      <li>
        <label>
          <input
            type="checkbox"
            checked={isCheck}
            onChange={handleChange}
          />
        </label>
        {!update ? (
          <div className="todo-btn">
            <div>{todo}</div>
            <div>
              <button
                data-testid="modify-button"
                onClick={onUpdateTodo}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={onDeleteTodo}
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-btn">
            <div className="todo-add-input">
              <input
                data-testid="modify-input"
                type="text"
                onChange={onChangeText}
                defaultValue={todo}
                className="textinput"
              />
            </div>
            <div>
              <button
                data-testid="submit-button"
                onClick={onSubmitTodo}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={onCancleTodo}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </li>
    </div>
  );
};

export default List;
