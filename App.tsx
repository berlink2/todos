import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useAuth} from './src/hooks/useAuth';
import {useTodos} from './src/hooks/useTodos';
import {LockScreen} from './src/screens/LockScreen';
import {TodoListScreen} from './src/screens/TodoListScreen';

/**
 * Root app component.
 * Shows the lock screen until the user authenticates, then the todo list.
 */
function App() {
  const {isUnlocked, authStatus, isAuthenticating, authenticate} =
    useAuth();
  const {todos, addTodo, editTodo, deleteTodo} = useTodos();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {isUnlocked ? (
          <TodoListScreen
            todos={todos}
            onAddTodo={addTodo}
            onEditTodo={editTodo}
            onDeleteTodo={deleteTodo}
          />
        ) : (
          <LockScreen
            authStatus={authStatus}
            isAuthenticating={isAuthenticating}
            onAuthenticate={authenticate}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
