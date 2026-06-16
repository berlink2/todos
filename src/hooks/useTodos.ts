import {useState} from 'react';

import {Todo} from '../types';

/** Returns true when a title has no usable text after trimming. */
function isBlankTitle(title: string): boolean {
  return title.trim().length === 0;
}

/** Creates a unique id for a new todo item. */
function createTodoId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Empty or whitespace-only titles are ignored to keep state valid.
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    if (isBlankTitle(title)) {
      return;
    }

    const newTodo: Todo = {
      id: createTodoId(),
      title: title.trim(),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const editTodo = (id: string, title: string) => {
    if (isBlankTitle(title)) {
      return;
    }

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? {...todo, title: title.trim()} : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
  };
}
