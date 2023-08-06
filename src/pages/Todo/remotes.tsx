import axios from "axios";

//api 호출 정보
const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

//createTodo
export function createTodo(todo: string) {
  return instance.post(`/todos`, { todo });
}

//getTodos
export function getTodos() {
  return instance.get(`/todos`);
}

//updateTodo
export function updateTodo(id: number, todo: string, isCompleted: boolean) {
  return instance.put(`/todos/${id}`, { todo, isCompleted });
}

//deleteTodo
export function deleteTodo(id: number) {
  return instance.delete(`/todos/${id}`);
}
