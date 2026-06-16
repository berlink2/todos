import {useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {TodoItem} from '../components/TodoItem';
import {TodoEditModal} from '../components/TodoEditModal';
import {Todo} from '../types';

type TodoListScreenProps = {
  todos: Todo[];
  onAddTodo: (title: string) => void;
  onEditTodo: (id: string, title: string) => void;
  onDeleteTodo: (id: string) => void;
};

/** Todo list shown after the user passes device authentication. */
export function TodoListScreen({
  todos,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
}: TodoListScreenProps) {
  const [newTitle, setNewTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleAdd = () => {
    onAddTodo(newTitle);
    setNewTitle('');
  };

  const handleSaveEdit = (title: string) => {
    if (editingTodo) {
      onEditTodo(editingTodo.id, title);
      setEditingTodo(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.addRow}>
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="New todo"
          style={styles.input}
          onSubmitEditing={handleAdd}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TodoItem
            key={item.id}
            todo={item}
            onEdit={setEditingTodo}
            onDelete={onDeleteTodo}
          />
        )}
      />

      <TodoEditModal
        visible={editingTodo !== null}
        initialTitle={editingTodo?.title ?? ''}
        onSave={handleSaveEdit}
        onCancel={() => setEditingTodo(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
