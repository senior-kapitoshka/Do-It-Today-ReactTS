import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import './styles.css'

interface InputProps {
  inputToDo: (text: string) => void;
  placeholder: string;
}

const Input = ({ inputToDo, placeholder }: InputProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      inputToDo(text.trim());
      setText('');
    }
  };

  const handleClick = () => {
    if (text.trim()) {
      inputToDo(text.trim());
      setText('');
    }
  };

  return (
    <div className='inputContainer' >
      <input
        className="inputToDo"
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick} disabled={!text.trim()}>
       +
      </button>
    </div>
  );
};

export default Input;
