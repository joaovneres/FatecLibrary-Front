import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Stack, Container } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { list } from '../service/connectionFirebase';
//

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    findBooks();
  }, [books.length]);

  async function findBooks() {
    await list('book', setBooks);
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpenOptions(null);
  };

  const [openOption, setOpenOptions] = useState(false);

  return (
    <>
      <Helmet>
        <title> Página cliente </title>
      </Helmet>

      <Container>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={books} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
