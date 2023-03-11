import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, AppBar, Toolbar, Container, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// utils
import { bgBlur } from '../utils/cssStyles';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Searchbar from '../layouts/dashboard/header/Searchbar';
import NotificationsPopover from '../layouts/dashboard/header/NotificationsPopover';
import AccountPopover from '../layouts/dashboard/header/AccountPopover';
//

// ----------------------------------------------------------------------
const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: "100%",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));


export default function ProductsPage() {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState(false);

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
        <StyledRoot>
          <StyledToolbar>
            <Searchbar />
            <Box sx={{ flexGrow: 1 }} />
            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}
            >
              <Box>
                <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={() => navigate("/cadastrar")}>Cadastar</Button>
              </Box>
              <Box>
                <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
              </Box>
            </Stack>
          </StyledToolbar>
        </StyledRoot>

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

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
