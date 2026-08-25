import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/hooks/use-local-storage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  test('returns the stored value when the key exists', () => {
    window.localStorage.setItem('test-key', JSON.stringify({ a: 1 }));
    const { result } = renderHook(() => useLocalStorage('test-key', null));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  test('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('missing', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });

  test('returns the initial value when reading throws', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('boom');
    });

    const { result } = renderHook(() => useLocalStorage('bad', 'safe'));
    expect(result.current[0]).toBe('safe');
    expect(warn).toHaveBeenCalledWith(
      'Error reading localStorage key "bad":',
      expect.any(Error),
    );
  });

  test('persists plain values', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0));
    act(() => result.current[1](42));
    expect(result.current[0]).toBe(42);
    expect(window.localStorage.getItem('k')).toBe('42');
  });

  test('supports function updaters', () => {
    const { result } = renderHook(() => useLocalStorage('k2', 10));
    act(() => result.current[1]((prev) => prev + 5));
    expect(result.current[0]).toBe(15);
    expect(window.localStorage.getItem('k2')).toBe('15');
  });

  test('warns instead of throwing when writing fails', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    const { result } = renderHook(() => useLocalStorage('k3', 'a'));
    act(() => result.current[1]('b'));
    expect(warn).toHaveBeenCalledWith(
      'Error setting localStorage key "k3":',
      expect.any(Error),
    );
  });
});
