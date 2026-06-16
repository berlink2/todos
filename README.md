# Secured Todos

Bare React Native app with Expo modules. A simple todo list is gated behind device authentication via `expo-local-authentication`.

## How it works

1. **Launch** — the app opens on a lock screen. It checks whether the device has a screen lock or biometrics enrolled.
2. **No security set up** — if nothing is enrolled, the lock screen explains what to do and links to system settings. When you return to the app, it re-checks automatically.
3. **Unlock** — tap **Unlock** to open the OS auth prompt (Face ID, Touch ID, fingerprint, or device PIN/pattern/passcode).
4. **Todo list** — after a successful auth, you can add, edit, and delete todos. Empty titles are ignored.
5. **Re-lock** — sending the app to the background or switching away re-locks it. Todos stay in memory and are still there after you unlock again.
6. **Data** — todos are in-memory only. They survive background/foreground within the same app session, but are cleared when the app process is killed.

State lives in two hooks in `App.tsx`: `useAuth` (lock/unlock) and `useTodos` (todo list). The UI switches between `LockScreen` and `TodoListScreen` based on auth state.

## Setup

Requires Node `>= 22.11.0` (see `.nvmrc`), JDK 17, Android Studio, and Xcode + CocoaPods for iOS. See the [React Native environment guide](https://reactnative.dev/docs/set-up-your-environment) if needed.

```bash
git clone <repository-url>
cd todos
nvm use
npm install
cd ios && pod install && cd ..
```

Before running, set up device security on your emulator or phone (see below).

## Run
First open ios/android emulator or connect physical device

on Terminal 1
```bash
## for running metro dev server
npm run start
```

on Terminal 2
```bash
## for running android
npm run android
## for running ios
npm run ios
```

Tests:

```bash
npm test
```

## Device authentication

The app unlocks only after the OS auth prompt succeeds. If nothing is enrolled, the lock screen links to system settings.

**Android (recommended for testing)** — set a real screen lock in **Settings → Security** (PIN, pattern, or password). The emulator validates it.

**iOS Simulator**

- **Face ID / Touch ID** — use **Features → Face ID → Enrolled**, then **Matching Face** when prompted. This works as expected.
- **Passcode fallback** — the simulator shows a passcode UI, but it does **not** validate a real passcode; any input may succeed. This is an **iOS Simulator limitation**, not an app bug.

**Physical iPhone** — use Face ID, Touch ID, or a real passcode for full auth behavior.

