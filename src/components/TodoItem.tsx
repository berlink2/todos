import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Todo} from '../types';

type TodoItemProps = {
  /** Todo row data. */
  todo: Todo;
  /** Opens the edit modal for this todo. */
  onEdit: (todo: Todo) => void;
  /** Deletes this todo from the list. */
  onDelete: (id: string) => void;
};

/** Renders one todo row with edit and delete actions. */
export function TodoItem({todo, onEdit, onDelete}: TodoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo.title}</Text>
      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => onEdit(todo)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => onDelete(todo.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 14,
  },
});
