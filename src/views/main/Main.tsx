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
import Loading from 'components/Loading';
import { Typography } from '@mui/material';

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

  if (loading) return <Loading />;

  return (
    <Box sx={{ p: 1 }}>
      <Paper>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ p: 1 }}
          justifyContent="center"
          spacing={1}>
          <TextField
            placeholder="Enter ID..."
            onChange={handleSearchQueryChange}
            type="number"
            label="Search by ID"
            value={searchQuery}
          />
          <Button variant="contained" color="secondary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.1rem' }} align="center">
                ID
              </TableCell>
              <TableCell sx={{ fontSize: '1.1rem' }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ fontSize: '1.1rem' }} align="center">
                Year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                style={{ backgroundColor: product.color }}
                onClick={() => showModal(product)}>
                <TableCell align="center" sx={{ fontSize: '1.1rem' }}>
                  {product.id}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '1.1rem' }}>
                  {product.name}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '1.1rem' }}>
                  {product.year}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={1}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={page === 1 || loading}
          onClick={() => handlePageChange(page - 1)}>
          Previous
        </Button>
        <Typography variant="h5">{page}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={page === totalPages || loading}
          onClick={() => handlePageChange(page + 1)}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default MainView;
