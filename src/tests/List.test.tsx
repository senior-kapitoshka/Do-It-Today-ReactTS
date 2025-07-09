import { test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import List from "../components/List/List";

const todos = [
  { id: "111", text: "Todo 1", completed: false },
  { id: "112", text: "Todo 2", completed: true },
  { id: "113", text: "Todo 3", completed: false },
];

test("Render todo list", () => {
  render(<List todoList={todos} onCheck={() => { }} onReorder={() => { }} />);

  expect(screen.getByText("Todo 1")).toBeInTheDocument();

  expect(screen.getByText("Todo 2")).toBeInTheDocument();

  expect(screen.getByText("Todo 3")).toBeInTheDocument();

});

test("User can mark task as completed", () => {
  const onCheck = vi.fn();

  render(<List todoList={todos} onCheck={onCheck} onReorder={() => { }} />);

  const checkboxes = screen.getAllByRole("checkbox");

  fireEvent.click(checkboxes[0]);
  expect(onCheck).toHaveBeenCalledWith("111");

  fireEvent.click(checkboxes[1]);
  expect(onCheck).toHaveBeenCalledWith("112");

  fireEvent.click(checkboxes[2]);
  expect(onCheck).toHaveBeenCalledWith("113");

  expect(onCheck).toHaveBeenCalledTimes(3);
});
