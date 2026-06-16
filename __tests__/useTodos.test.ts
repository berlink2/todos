import {act, renderHook} from '@testing-library/react-native';

import {useTodos} from '../src/hooks/useTodos';

describe('useTodos', () => {
  it('adds todos with trimmed titles and ignores blank input', () => {
    const {result} = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('  Buy milk  ');
    });

    expect(result.current.todos).toEqual([
      expect.objectContaining({title: 'Buy milk'}),
    ]);

    act(() => {
      result.current.addTodo('   ');
    });

    expect(result.current.todos).toHaveLength(1);
  });

  it('edits todos with trimmed titles and ignores blank input', () => {
    const {result} = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('Walk dog');
    });

    const {id} = result.current.todos[0];

    act(() => {
      result.current.editTodo(id, '  Walk cat  ');
    });

    expect(result.current.todos[0].title).toBe('Walk cat');

    act(() => {
      result.current.editTodo(id, '   ');
    });

    expect(result.current.todos[0].title).toBe('Walk cat');
  });

  it('deletes a todo by id', () => {
    const {result} = renderHook(() => useTodos());

    act(() => {
      result.current.addTodo('First');
      result.current.addTodo('Second');
    });

    const [firstId] = result.current.todos.map(todo => todo.id);

    act(() => {
      result.current.deleteTodo(firstId);
    });

    expect(result.current.todos).toEqual([
      expect.objectContaining({title: 'Second'}),
    ]);
  });
});
