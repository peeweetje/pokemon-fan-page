import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export function PokemonPagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 20,
}: PokemonPaginationProps) {
  const { getPageNumbers } = usePagination({
    totalItems: totalPages * itemsPerPage,
    itemsPerPage,
    currentPage,
  });

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              className={`${
                currentPage === 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(Number(page))}
                  isActive={currentPage === page}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={`${
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer hover:bg-gray-100'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
