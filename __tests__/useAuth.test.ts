import * as LocalAuthentication from 'expo-local-authentication';
import {act, renderHook, waitFor} from '@testing-library/react-native';

import {useAuth} from '../src/hooks/useAuth';

const mockGetEnrolledLevelAsync =
  LocalAuthentication.getEnrolledLevelAsync as jest.MockedFunction<
    typeof LocalAuthentication.getEnrolledLevelAsync
  >;
const mockAuthenticateAsync =
  LocalAuthentication.authenticateAsync as jest.MockedFunction<
    typeof LocalAuthentication.authenticateAsync
  >;

const {SecurityLevel} = LocalAuthentication;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetEnrolledLevelAsync.mockResolvedValue(SecurityLevel.SECRET);
    mockAuthenticateAsync.mockResolvedValue({
      success: false,
      error: 'authentication_failed',
    });
  });

  it('detects whether device auth is enrolled', async () => {
    mockGetEnrolledLevelAsync.mockResolvedValue(SecurityLevel.NONE);

    const {result} = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.authStatus).toBe('no_enrollment');
    });

    mockGetEnrolledLevelAsync.mockResolvedValue(SecurityLevel.SECRET);

    await act(async () => {
      await result.current.refreshAuthAvailability();
    });

    expect(result.current.authStatus).toBe('ready');
  });

  it('unlocks after successful authentication', async () => {
    mockAuthenticateAsync.mockResolvedValue({success: true});

    const {result} = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.authStatus).toBe('ready');
    });

    await act(async () => {
      await result.current.authenticate();
    });

    expect(result.current.isUnlocked).toBe(true);
  });

  it('stays locked after failed authentication', async () => {
    const {result} = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.authStatus).toBe('ready');
    });

    await act(async () => {
      await result.current.authenticate();
    });

    expect(result.current.isUnlocked).toBe(false);
  });
});
