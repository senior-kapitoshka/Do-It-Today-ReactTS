import { test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from "../App";
import '@testing-library/jest-dom';

beforeEach(() => {
  localStorage.clear();
});

test("User can add a new todo", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/What needs to be done/i);

  fireEvent.change(input, { target: { value: "Complete test todo" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  expect(await screen.findByText("Complete test todo")).toBeInTheDocument();
});

test("Filter shows only active todos", async () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/What needs to be done/i);

  fireEvent.change(input, { target: { value: "Done" } });
  fireEvent.keyDown(input, { key: "Enter" });

  fireEvent.change(input, { target: { value: "Todo" } });
  fireEvent.keyDown(input, { key: "Enter" });

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0]); 

  fireEvent.click(screen.getByText(/active/i));

  expect(screen.queryByText("Done")).not.toBeInTheDocument();
  expect(screen.getByText("Todo")).toBeInTheDocument();
});
