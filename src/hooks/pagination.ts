import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const usePagination = (initialPerPage = 5) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(initialPerPage);
  const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);

  const changePage = (newPage: number): void => {
    setSearchParams({ page: newPage.toString(), perPage: perPage.toString() });
    searchParams.get('page');
    setPage(newPage);
  };

  const changePerPage = (newPerPage: number): void => {
    setSearchParams({ perPage: newPerPage.toString(), page: page.toString() });
    setPerPage(newPerPage);
  };

  const changeTotalPages = (newTotal: number): void => {
    setTotalPages(newTotal);
  };

  const changeTotalItems = (newTotal: number): void => {
    setTotalItems(newTotal);
  };

  return {
    page,
    perPage,
    totalPages,
    totalItems,
    changeTotalPages,
    changePage,
    changePerPage,
    changeTotalItems
  };
};

export default usePagination;
