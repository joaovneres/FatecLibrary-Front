import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 20,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={product.title} src={product.imageURL} />
      </Box>

      <Stack spacing={2} sx={{ paddingTop: 4, paddingX: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle1" noWrap>
            {product.title} | {product.edition}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            {fCurrency(product.price)}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ p: 2 }}>
        <LoadingButton fullWidth size="medium" type="submit" variant="contained" color="inherit">
          Comprar
        </LoadingButton>
      </Box>
    </Card>
  );
}
