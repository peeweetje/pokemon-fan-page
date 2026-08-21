import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonPagination } from '../src/components/pokemon-grid/pokemon-pagination';

describe('PokemonPagination', () => {
  test('renders nothing when there is a single page', () => {
    const { container } = render(
      <PokemonPagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  test('disables the previous button on the first page', () => {
    render(
      <PokemonPagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />
    );
    const previous = screen.getByLabelText('Go to previous page');
    expect(previous.className).toContain('pointer-events-none');
    expect(previous.className).toContain('opacity-50');
  });

  test('disables the next button on the last page', () => {
    render(
      <PokemonPagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />
    );
    const next = screen.getByLabelText('Go to next page');
    expect(next.className).toContain('pointer-events-none');
    expect(next.className).toContain('opacity-50');
  });

  test('calls onPageChange with the previous page when previous is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <PokemonPagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with the next page when next is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <PokemonPagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn();
    render(
      <PokemonPagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('renders ellipsis separators when there are many pages', () => {
    const { container } = render(
      <PokemonPagination
        currentPage={4}
        totalPages={7}
        onPageChange={vi.fn()}
      />
    );
    expect(container.querySelectorAll('[data-slot="pagination-ellipsis"]').length).toBeGreaterThan(0);
  });
});
