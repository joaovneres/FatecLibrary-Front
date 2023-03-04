import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../context/auth';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { email, password });
    login(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <p>{authenticated}</p>
          <TextField
            name="email" 
            label="E-mail" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Esqueceu a senha?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </>
  );
}
