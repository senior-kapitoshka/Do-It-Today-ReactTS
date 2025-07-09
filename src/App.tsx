import './App.css'
import Input from './components/Input/Input';
import Panel from './components/Panel/Panel';
import List from './components/List/List';
import { translations } from './types/translations';

import { useEffect, useState } from 'react';
import type { TodoItem } from './types/todos';
import LangSwitch from './components/LangSwitch/LangSwitch';

import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorageHelper';


function App() {
  const [todos, setTodos] = useState<TodoItem[]>(() => loadFromLocalStorage()||[]);

  const [state, setState] = useState<"all" | "active" | "completed">("active");
  const [lang, setLang] = useState<'ru' | 'en'>('en');

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);
  

  const t = translations[lang];

  const todoHandler = (todoText: string) => {
    const newTodoItem: TodoItem = {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
  };

  const incompleteCount = todos.filter(item => !item.completed).length;

  const todoList = todos.filter(item =>
    state === "active" ? !item.completed :
    state === "completed" ? item.completed :
    true
  );

  const handleCheck = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearTodoList = () => {
    setTodos(todos.filter(item => !item.completed));
  };

  const handleReorder = (startIndex: number, endIndex: number) => {
    setTodos(prevTodos => {
      const newTodos = [...prevTodos];
      const [removed] = newTodos.splice(startIndex, 1);
      newTodos.splice(endIndex, 0, removed);
      return newTodos;
    });
  };

  const [isListVisible, setIsListVisible] = useState(true);

  

  return (
    <>
      <div className="appContainer">
            <div className="langContainer">
        <h1>todos</h1>
        <div className="langSwitchWrapper">
          <LangSwitch currentLang={lang} onChange={setLang} />
        </div>
      </div>

      <div className="inputToggleRow">
        <button
          className="toggleBtn"
          onClick={() => setIsListVisible(prev => !prev)}
        >
          {isListVisible ? "▲" : "▼"}
        </button>
        <div className="inputWrapper">
          <Input inputToDo={todoHandler} placeholder={t.placeholder} />
        </div>
      </div>


      {isListVisible && (
          <List
            todoList={todoList}
            onCheck={handleCheck}
            onReorder={handleReorder}
          />
        )}

        <Panel
          incompleted={incompleteCount}
          currentState={state}
          onChangeState={setState}
          removeAll={clearTodoList}
          t={t}
        />
      </div>
    </>
  );
}

export default App;
