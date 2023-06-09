import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// toastfy
import { Slide, toast } from 'react-toastify';
import apiConf from '../../../service/api-conf.json';
import './CreateForm.css';
// ----------------------------------------------------------------------

export default function CreateForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validationCPF && validationDate && validationEmail && validationName && validationPassword && validationTel) {
      toast.success('Usuário cadastrado com sucesso.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });
      navigate('/login');
    } else {
      toast.warning('Há campos inválidos no formulário, verifique.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });
    }
  };
  // nome
  const [name, setName] = useState('');
  const [validationName, setValidationName] = useState(true);

  const validateName = (nameInput) => {
    nameInput.trim().split(' ').length > 1 ? setValidationName(true) : setValidationName(false);
    setName(nameInput);
  };

  const nameInputError = (
    <TextField
      required
      error
      helperText="É necessário informar seu nome completo."
      name="name"
      label="Nome"
      type="text"
      style={{ width: '60%' }}
      value={name}
      onChange={(e) => validateName(e.target.value)}
    />
  );

  const nameInput = (
    <TextField
      required
      name="name"
      label="Nome"
      type="text"
      style={{ width: '60%' }}
      value={name}
      onChange={(e) => validateName(e.target.value)}
    />
  );

  // cpf
  const [CPF, setCPF] = useState('');
  const [validationCPF, setValidationCPF] = useState(true);

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const validateCPF = (CPFInput) => {
    CPF.length >= 13 ? setValidationCPF(true) : setValidationCPF(false);
    setCPF(maskCPF(CPFInput));
  };

  const CPFInputError = (
    <TextField
      required
      error
      helperText="É necessário informar um CPF."
      name="CPF"
      label="CPF"
      type="text"
      value={CPF}
      onChange={(e) => validateCPF(e.target.value)}
    />
  );

  const CPFInput = (
    <TextField required name="CPF" label="CPF" type="text" value={CPF} onChange={(e) => validateCPF(e.target.value)} />
  );

  // data de nascimento
  const [date, setDate] = useState('');
  const [validationDate, setValidationDate] = useState(true);

  const maskDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d+?)$/, '$1');
  };

  const validateDate = (dateInput) => {
    setDate(maskDate(dateInput.trim()));
    const partsBorn = dateInput.slice(0, 10).split('/');
    const born = new Date(partsBorn[2], partsBorn[1] - 1, partsBorn[0]);
    const today = new Date();
    if (today > born && dateInput.length >= 10) {
      setValidationDate(true);
    } else {
      setValidationDate(false);
    }
  };

  const dateInputError = (
    <TextField
      required
      error
      helperText="É necessário informar sua data de nascimento completa, no formato DD/MM/AAAA."
      name="date"
      label="Data de nascimento inválida"
      type="text"
      value={date}
      style={{ width: '31%' }}
      onChange={(e) => validateDate(e.target.value)}
    />
  );

  const dateInput = (
    <TextField
      required
      name="date"
      label="Data de nascimento"
      type="text"
      style={{ width: '31%' }}
      value={date}
      onChange={(e) => validateDate(e.target.value)}
    />
  );

  // telefone
  const [tel, setTel] = useState('');
  const [validationTel, setValidationTel] = useState(true);

  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)$/, '$1');
  };

  const validateTel = (telInput) => {
    setTel(maskPhone(telInput.trim()));
    tel.length >= 14 ? setValidationTel(true) : setValidationTel(false);
  };

  const telInputError = (
    <TextField
      required
      error
      helperText="É necessário informar o número completo no formato (DDD) 99999-9999."
      name="tel"
      label="Celular inválido"
      type="text"
      style={{ width: '31%' }}
      value={tel}
      onChange={(e) => validateTel(e.target.value)}
    />
  );

  const telInput = (
    <TextField
      required
      name="tel"
      label="Celular"
      type="text"
      style={{ width: '31%' }}
      value={tel}
      onChange={(e) => validateTel(e.target.value)}
    />
  );

  // email
  const [email, setEmail] = useState('');
  const [validationEmail, setValidationEmail] = useState(true);

  const validateEmail = (emailInput) => {
    regexEmail.test(emailInput) ? setValidationEmail(true) : setValidationEmail(false);
    setEmail(emailInput);
  };

  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailInputError = (
    <TextField
      required
      error
      helperText="ex: email@email.com"
      name="email"
      label="E-mail inválido"
      type="email"
      value={email}
      onChange={(e) => validateEmail(e.target.value)}
    />
  );

  const emailInput = (
    <TextField
      required
      name="email"
      label="E-mail"
      type="email"
      value={email}
      onChange={(e) => validateEmail(e.target.value)}
    />
  );

  // senha
  const [password, setPassword] = useState('');
  const [validationPassword, setValidationPassword] = useState(true);
  const [requisitoDigito, setRequisitoDigito] = useState(false);
  const [requisitoMai, setRequisitoMai] = useState(false);
  const [requisitoMin, setRequisitoMin] = useState(false);
  const [requisitoNum, setRequisitoNum] = useState(false);

  const validatePassword = (value) => {
    setPassword(value.trim());
    let countValidation = 0;
    let regexMai = /[A-Z]/;
    let regexMin = /[a-z]/;
    let regexNumber = /[0-9]/;

    if (regexNumber.test(value)) {
      setRequisitoNum(true);
      countValidation++;
    } else {
      setRequisitoNum(false);
    }

    if (regexMai.test(value)) {
      setRequisitoMai(true);
      countValidation++;
    } else {
      setRequisitoMai(false);
    }

    if (regexMin.test(value)) {
      setRequisitoMin(true);
      countValidation++;
    } else {
      setRequisitoMin(false);
    }

    if (value.length > 7) {
      setRequisitoDigito(true);
      countValidation++;
    } else {
      setRequisitoDigito(false);
    }
    if (countValidation === 4) {
      return setValidationPassword(true);
    }
    return setValidationPassword(false);
  };

  const passwordProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
        </IconButton>
      </InputAdornment>
    ),
  };

  const passwordInputError = (
    <>
      <TextField
        required
        error
        helperText="É necessário informar uma senha."
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
        name="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        InputProps={passwordProps}
      />
      <Grid container xs={11} className="requisitosSenha">
        <Typography variant="caption" className={`${requisitoDigito ? 'requisitoSucces' : 'requisitoError'}`}>
          No mínimo 8 dígitos
        </Typography>
        <Typography variant="caption" className={`${requisitoMai ? 'requisitoSucces' : 'requisitoError'}`}>
          1 Letra maiúscula
        </Typography>
        <Typography variant="caption" className={`${requisitoMin ? 'requisitoSucces' : 'requisitoError'}`}>
          1 Letra minúscula
        </Typography>
        <Typography variant="caption" className={`${requisitoNum ? 'requisitoSucces' : 'requisitoError'}`}>
          1 Número
        </Typography>
      </Grid>
    </>
  );

  const passwordInput = (
    <>
      <TextField
        required
        value={password}
        onChange={(e) => validatePassword(e.target.value)}
        name="password"
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        InputProps={passwordProps}
      />
    </>
  );

  // endereco
  const [address, setAddress] = useState({
    cep: '',
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
    number: '',
  });

  // cep

  // buscar endereço pelo axios
  const findAdress = (cepValue) => {
    const objResponse = {
      cep: '',
      bairro: '',
      localidade: '',
      logradouro: '',
      uf: '',
      number: '',
    };
    axios.get(`${apiConf.baseURL}${cepValue.replace(/-/g, '').slice(0, 8)}/json/`).then((response) => {
      console.log(response.data);
      objResponse.cep = response.data.cep;
      objResponse.bairro = response.data.bairro;
      objResponse.localidade = response.data.localidade;
      objResponse.logradouro = response.data.logradouro;
      objResponse.uf = response.data.uf;
      setAddress(objResponse);
      setReadOnly();
      setValidationCep(true);
    });
  };

  const [cep, setCep] = useState('');
  const [validationCep, setValidationCep] = useState(true);

  const maskCEP = (value) => {
    if (value.length <= 9) return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
    return cep;
  };

  const cepInputError = (
    <TextField
      required
      error
      helperText="É necessário informar o CEP completo no formato 00000-000."
      name="cep"
      label="CEP inválido"
      type="text"
      id="cep"
      style={{ width: '31%' }}
      value={cep}
      onChange={(e) => {
        setCep(maskCEP(e.target.value));
      }}
      onBlur={(e) => {
        findAdress(e.target.value);
      }}
    />
  );

  const cepInput = (
    <TextField
      required
      name="cep"
      label="CEP"
      type="text"
      id="cep"
      style={{ width: '31%' }}
      value={cep}
      onChange={(e) => {
        setCep(maskCEP(e.target.value));
      }}
      onBlur={(e) => {
        findAdress(e.target.value);
      }}
    />
  );

  // address
  const [validationAddress, setValidationAddress] = useState(true);
  const [addressDisable, setAddresDisable] = useState(false);

  function validarEndereco(value) {
    const logradouro = { ...address };
    logradouro.logradouro = value;
    setAddress(logradouro);
    if (address.logradouro === '' || address.logradouro.length < 5 || address.logradouro.trim().indexOf(' ') === -1) {
      setValidationAddress(false);
    } else {
      setValidationAddress(true);
    }
  }

  const addressInputError = (
    <TextField
      required
      error
      helperText="É necessário informar uma logradouro."
      name="address"
      label="Logradouro inválido"
      type="text"
      id="addressAddress"
      style={{ width: '65%' }}
      value={address.logradouro}
      onChange={(e) => validarEndereco(e.target.value)}
    />
  );

  const addressInput = (
    <TextField
      required
      name="address"
      label="Logradouro"
      type="text"
      id="addressAddress"
      inputProps={{ readOnly: addressDisable }}
      style={{ width: '65%' }}
      value={address.logradouro}
      onChange={(e) => validarEndereco(e.target.value)}
    />
  );

  // number
  const [validationNumber, setValidationNumber] = useState(true);

  function validarNumero(value) {
    const number = { ...address };
    number.number = value;
    setAddress(number);
    if (value.trim() === '') {
      setValidationNumber(false);
    } else {
      setValidationNumber(true);
    }
  }

  const numberInputError = (
    <TextField
      required
      error
      helperText="É necessário informar um número."
      name="number"
      label="Número inválido"
      type="text"
      id="addressNumber"
      value={address.number}
      onChange={(e) => validarNumero(e.target.value)}
    />
  );

  const numberInput = (
    <TextField
      required
      name="number"
      label="Número"
      type="text"
      id="addressNumber"
      style={{ width: '31%' }}
      value={address.number}
      onChange={(e) => validarNumero(e.target.value)}
    />
  );

  // cidade
  const [validationCity, setValidationCity] = useState(true);
  const [cityDisable, setCityDisable] = useState(false);

  function validarCidade(value) {
    const city = { ...address };
    city.localidade = value;
    setAddress(city);
    if (value === '') {
      setValidationCity(false);
    } else {
      setValidationCity(true);
    }
  }

  const cityInputError = (
    <TextField
      required
      error
      helperText="É necessário informar uma cidade."
      name="city"
      label="Cidade inválida"
      type="text"
      id="addressCity"
      style={{ width: '31%' }}
      value={address.localidade}
      onChange={(e) => validarCidade(e.target.value)}
    />
  );

  const cityInput = (
    <TextField
      required
      name="city"
      label="Cidade"
      type="text"
      id="addressCity"
      style={{ width: '31%' }}
      inputProps={{ readOnly: cityDisable }}
      value={address.localidade}
      onChange={(e) => validarNumero(e.target.value)}
    />
  );

  // bairro
  const [validationBairro, setValidationBairro] = useState(true);
  const [bairroDisable, setBairroDisable] = useState(false);

  function validarBairro(value) {
    const bairro = { ...address };
    bairro.bairro = value;
    setAddress(bairro);
    if (value === '' || value.length < 4) {
      setValidationBairro(false);
    } else {
      setValidationBairro(true);
    }
  }

  const bairroInputError = (
    <TextField
      required
      error
      helperText="É necessário informar um bairro."
      name="bairro"
      label="Bairro inválido"
      type="text"
      id="addressNeighborhood"
      style={{ width: '31%' }}
      value={address.bairro}
      onChange={(e) => validarBairro(e.target.value)}
    />
  );

  const bairroInput = (
    <TextField
      required
      name="bairro"
      label="Bairro"
      type="text"
      id="addressNeighborhood"
      style={{ width: '31%' }}
      inputProps={{ readOnly: bairroDisable }}
      value={address.bairro}
      onChange={(e) => validarBairro(e.target.value)}
    />
  );

  // uf

  const [validationUf, setValidationUf] = useState(true);
  const [ufDisable, setUfDisable] = useState(false);

  function validarUf(value) {
    const uf = { ...address };
    uf.uf = value;
    setAddress(uf);
    if (address.uf === '') {
      setValidationUf(false);
    }
    setValidationUf(true);
  }

  const ufInputError = (
    <TextField
      required
      error
      helperText="É necessário informar a uf de um estado."
      name="uf"
      label="Estado inválido"
      type="text"
      id="addressUf"
      style={{ width: '31%' }}
      value={address.uf}
      onChange={(e) => validarUf(e.target.value)}
    />
  );

  const ufInput = (
    <TextField
      required
      name="uf"
      label="Estado"
      type="text"
      id="addressUf"
      style={{ width: '31%' }}
      value={address.uf}
      inputProps={{ readOnly: ufDisable }}
      onChange={(e) => validarUf(e.target.value)}
    />
  );

  // Deixar elementos desabilitados se trouxerem dados do cep

  function setReadOnly() {
    if (address.logradouro !== '') {
      setAddresDisable(true);
    } else {
      setAddresDisable(false);
    }
    if (address.bairro !== '') {
      setBairroDisable(true);
    } else {
      setBairroDisable(false);
    }
    if (address.localidade !== '') {
      setCityDisable(true);
    } else {
      setCityDisable(false);
    }
    if (address.uf !== '') {
      setUfDisable(true);
    } else {
      setUfDisable(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack spacing={2} direction={'row'}>
            {validationName ? nameInput : nameInputError}
            {validationCPF ? CPFInput : CPFInputError}
          </Stack>
          <Stack spacing={2} direction={'row'}>
            {validationDate ? dateInput : dateInputError}
            {validationTel ? telInput : telInputError}
            {validationCep ? cepInput : cepInputError}
          </Stack>
          <Stack spacing={2} direction={'row'}>
            {validationAddress ? addressInput : addressInputError}
            {validationNumber ? numberInput : numberInputError}
          </Stack>
          <Stack spacing={2} direction={'row'}>
            {validationBairro ? bairroInput : bairroInputError}
            {validationCity ? cityInput : cityInputError}
            {validationUf ? ufInput : ufInputError}
          </Stack>
          {validationEmail ? emailInput : emailInputError}
          {validationPassword ? passwordInput : passwordInputError}
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" style={{ marginTop: '3vh' }}>
          Cadastrar
        </LoadingButton>
      </form>
    </>
  );
}
