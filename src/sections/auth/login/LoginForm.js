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
  const [validationEmail, setValidationEmail] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { email, password });
    login(email, password);
  };

  const emailInputError = <TextField
    error
    helperText="ex: email@email.com"
    name="email"
    label="E-mail inválido"
    type="email"
    value={email}
    onChange={(e) => {
      re.test(email) ? setValidationEmail(true) : setValidationEmail(false); // eslint-disable-line
      return setEmail(e.target.value);
    }}
  />

  const emailInput = <TextField
    name="email"
    label="E-mail"
    type="email"
    value={email}
    onChange={(e) => {
      re.test(email) ? setValidationEmail(true) : setValidationEmail(false); // eslint-disable-line
      return setEmail(e.target.value);
    }}
  />

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {validationEmail ? emailInput : emailInputError}
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
