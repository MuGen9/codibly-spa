import { getProducts, searchProduct, Product } from 'api/services/products';
import TableContainer from '@mui/material/TableContainer';
import { useSearchParams } from 'react-router-dom';
import { useModal } from 'providers/ModalProvider';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import usePagination from 'hooks/pagination';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import { useSnackbar } from 'notistack';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const MainView = () => {
  const { page, perPage, changePage, totalPages, changeTotalPages } = usePagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('searchQuery') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const loadData = async (page: number, perPage: number): Promise<void> => {
    try {
      setLoading(true);
      const response = (await getProducts(page, perPage)).data;
      changeTotalPages(response.total_pages);
      setProducts(response.data);
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const searchItem = async (query: string): Promise<void> => {
    try {
      setLoading(true);
      const item = (await searchProduct(query)).data;
      setProducts([item.data]);
    } catch (e) {
      enqueueSnackbar((e as Error).message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number): void => {
    changePage(newPage);
    loadData(newPage, perPage);
  };

  const handleSearchQueryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ searchQuery: searchQuery.toString() });

    if (!searchQuery) loadData(page, perPage);
    else searchItem(searchQuery);
  };

  useEffect(() => {
    if (searchQuery) searchItem(searchQuery);
    else loadData(page, perPage);
  }, []);

  if (loading) return <>Loading data...</>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper>
        <Stack direction="row">
          <TextField
            placeholder="Enter search query..."
            onChange={handleSearchQueryChange}
            type="number"
            label="Search query"
            value={searchQuery}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                style={{ backgroundColor: product.color }}
                onClick={() => showModal(product)}>
                <TableCell align="center">{product.id}</TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={page === 1 || loading}
        onClick={() => handlePageChange(page - 1)}>
        Previous
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={page === totalPages || loading}
        onClick={() => handlePageChange(page + 1)}>
        Next
      </Button>
    </Box>
  );
};

export default MainView;
