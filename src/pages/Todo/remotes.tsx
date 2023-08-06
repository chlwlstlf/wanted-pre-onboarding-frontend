import axios from "axios";

//api 호출 정보
const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

//createTodo
export function createTodo(todo: string) {
  if (localStorage.getItem("jwt")) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  }
  return instance.post(`/todos`, { todo });
}

//getTodos
export function getTodos() {
  if (localStorage.getItem("jwt")) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  }
  return instance.get(`/todos`);
}

//updateTodo
export function updateTodo(id: number, todo: string, isCompleted: boolean) {
  if (localStorage.getItem("jwt")) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  }
  return instance.put(`/todos/${id}`, { todo, isCompleted });
}

//deleteTodo
export function deleteTodo(id: number) {
  if (localStorage.getItem("jwt")) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;
  }
  return instance.delete(`/todos/${id}`);
}
