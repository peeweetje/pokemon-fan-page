import { describe, test, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../src/hooks/use-pagination';

describe('usePagination', () => {
  test('returns all pages when they fit within the visible window', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 40, itemsPerPage: 10, currentPage: 2 }),
    );
    expect(result.current.totalPages).toBe(4);
    expect(result.current.getPageNumbers()).toEqual([1, 2, 3, 4]);
  });

  test('shows leading pages when near the start', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 100, itemsPerPage: 10, currentPage: 1 }),
    );
    expect(result.current.getPageNumbers()).toEqual([1, 2, 3, 4, '...', 10]);
  });

  test('shows trailing pages when near the end', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 100, itemsPerPage: 10, currentPage: 10 }),
    );
    expect(result.current.getPageNumbers()).toEqual([1, '...', 7, 8, 9, 10]);
  });

  test('shows ellipses on both sides when in the middle', () => {
    const { result } = renderHook(() =>
      usePagination({ totalItems: 200, itemsPerPage: 10, currentPage: 11 }),
    );
    expect(result.current.getPageNumbers()).toEqual([
      1,
      '...',
      10,
      11,
      12,
      '...',
      20,
    ]);
  });
});
