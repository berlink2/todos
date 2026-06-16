import {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type TodoEditModalProps = {
  visible: boolean;
  initialTitle: string;
  onSave: (title: string) => void;
  onCancel: () => void;
};

export function TodoEditModal({
  visible,
  initialTitle,
  onSave,
  onCancel,
}: TodoEditModalProps) {
  // Keeps input state local so canceling does not mutate list data.
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
    }
  }, [visible, initialTitle]);

  const handleSave = () => {
    onSave(title);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <Text style={styles.heading}>Edit todo</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Todo title"
            style={styles.input}
            autoFocus
          />
          <View style={styles.actions}>
            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
