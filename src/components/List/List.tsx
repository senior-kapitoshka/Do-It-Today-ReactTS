import type { TodoItem } from "../../types/todos";
import {  useRef } from "react";
import './styles.css';

interface ListProps {
  todoList: TodoItem[];
  onCheck: (id: string) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const List = ({ todoList, onCheck, onReorder }: ListProps) => {
  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItemIndex.current = index;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  const handleDrop = (index: number) => {
    if (dragItemIndex.current === null || dragItemIndex.current === index) return;

    onReorder(dragItemIndex.current, index);
    dragItemIndex.current = null;
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
        className="todoItem"
        key={item.id}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}

      >
        <label 
          className="todoItemLabel">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onCheck(item.id)}
          />
          <span>{item.text}</span>
        </label>
      </div>
      
      ))}
    </div>
  );
};

export default List;
