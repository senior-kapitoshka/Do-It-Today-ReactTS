import type { TodoItem } from "../types/todos";

const STORAGE_KEY = "todoList";

export const saveToLocalStorage = (todos: TodoItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage", error);
  }
};

export const loadFromLocalStorage = (): TodoItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Ошибка загрузки из localStorage", error);
    return [];
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Ошибка очистки localStorage", error);
  }
};
