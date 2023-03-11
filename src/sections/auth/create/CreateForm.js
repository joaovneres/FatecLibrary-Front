import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../context/auth';
// toastfy
import { Slide, toast } from 'react-toastify'; // eslint-disable-line

import './CreateForm.css'

// ----------------------------------------------------------------------

export default function CreateForm() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validationCPF &&
            validationDate &&
            validationEmail &&
            validationName &&
            validationPassword &&
            validationTel) {
            toast.success('Usuário cadastrado com sucesso.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Slide,
            });
            navigate("/login")
        } else {
            toast.warning('Há campos inválidos no formulário, verifique.', {
                position: "top-right",
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
    }
    // nome
    const [name, setName] = useState("");
    const [validationName, setValidationName] = useState(true);

    const validateName = (nameInput) => {
        nameInput.trim().split(" ").length > 1 ? setValidationName(true) : setValidationName(false); // eslint-disable-line
        setName(nameInput);
    }

    const nameInputError = <TextField
        error
        helperText="É necessário informar seu nome completo."
        name="name"
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => validateName(e.target.value)}
    />

    const nameInput = <TextField
        name="name"
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => validateName(e.target.value)}
    />

    // cpf
    const [CPF, setCPF] = useState("");
    const [validationCPF, setValidationCPF] = useState(true);

    const maskCPF = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    const validateCPF = (CPFInput) => {
        CPF.length >= 13 ? setValidationCPF(true) : setValidationCPF(false); // eslint-disable-line
        setCPF(maskCPF(CPFInput));
    }

    const CPFInputError = <TextField
        error
        helperText="É necessário informar um CPF."
        name="CPF"
        label="CPF"
        type="text"
        value={CPF}
        onChange={(e) => validateCPF(e.target.value)}
    />

    const CPFInput = <TextField
        name="CPF"
        label="CPF"
        type="text"
        value={CPF}
        onChange={(e) => validateCPF(e.target.value)}
    />

    // data de nascimento
    const [date, setDate] = useState("");
    const [validationDate, setValidationDate] = useState(true);

    const maskDate = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d+?)$/, "$1");
    }

    const validateDate = (dateInput) => {
        setDate(maskDate(dateInput.trim()));
        dateInput.length >= 10 ? setValidationDate(true) : setValidationDate(false) // eslint-disable-line
    }

    const dateInputError = <TextField
        error
        helperText="É necessário informar sua data de nascimento completa, no formato DD/MM/AAAA."
        name="date"
        label="Data de nascimento inválida"
        type="text"
        required
        value={date}
        onChange={(e) => validateDate(e.target.value)}
    />

    const dateInput = <TextField
        name="date"
        label="Data de nascimento"
        type="text"
        required
        value={date}
        onChange={(e) => validateDate(e.target.value)}
    />

    // telefone
    const [tel, setTel] = useState("");
    const [validationTel, setValidationTel] = useState(true);

    const maskPhone = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    const validateTel = (telInput) => {
        setTel(maskPhone(telInput.trim()));
        tel.length >= 14 ? setValidationTel(true) : setValidationTel(false); // eslint-disable-line
    }

    const telInputError = <TextField
        error
        helperText="É necessário informar o número completo no formato (DDD) 99999-9999."
        name="tel"
        label="Celular inválido"
        type="text"
        value={tel}
        onChange={(e) => validateTel(e.target.value)}
    />

    const telInput = <TextField
        name="tel"
        label="Celular"
        type="text"
        value={tel}
        onChange={(e) => validateTel(e.target.value)}
    />

    // email
    const [email, setEmail] = useState("");
    const [validationEmail, setValidationEmail] = useState(true);

    const validateEmail = (emailInput) => {
        regexEmail.test(emailInput) ? setValidationEmail(true) : setValidationEmail(false); // eslint-disable-line
        setEmail(emailInput);
    }

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const emailInputError = <TextField
        error
        helperText="ex: email@email.com"
        name="email"
        label="E-mail inválido"
        type="email"
        value={email}
        onChange={(e) => validateEmail(e.target.value)}
    />

    const emailInput = <TextField
        name="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => validateEmail(e.target.value)}
    />

    // senha
    const [password, setPassword] = useState("");
    const [validationPassword, setValidationPassword] = useState(true);
    const [requisitoDigito, setRequisitoDigito] = useState(false);
    const [requisitoMai, setRequisitoMai] = useState(false);
    const [requisitoMin, setRequisitoMin] = useState(false);
    const [requisitoNum, setRequisitoNum] = useState(false);

    const validatePassword = (value) => {
        setPassword(value.trim());
        let countValidation = 0; // eslint-disable-line
        let regexMai = /[A-Z]/; // eslint-disable-line
        let regexMin = /[a-z]/; // eslint-disable-line
        let regexNumber = /[0-9]/; // eslint-disable-line

        if (regexNumber.test(value)) {
            setRequisitoNum(true);
            countValidation++; // eslint-disable-line
        } else {
            setRequisitoNum(false);
        }

        if (regexMai.test(value)) {
            setRequisitoMai(true);
            countValidation++; // eslint-disable-line
        } else {
            setRequisitoMai(false);
        }

        if (regexMin.test(value)) {
            setRequisitoMin(true);
            countValidation++; // eslint-disable-line
        } else {
            setRequisitoMin(false);
        }

        if (value.length > 7) {
            setRequisitoDigito(true);
            countValidation++; // eslint-disable-line
        } else {
            setRequisitoDigito(false);
        }
        if (countValidation === 4) {
            return setValidationPassword(true);
        }
        return setValidationPassword(false);
    }

    const passwordProps = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
            </InputAdornment>
        )
    }

    const passwordInputError =
        <>
            <TextField
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
                <Typography variant='caption' className={`${requisitoDigito ? "requisitoSucces" : "requisitoError"}`}>No mínimo 8 dígitos</Typography>
                <Typography variant='caption' className={`${requisitoMai ? "requisitoSucces" : "requisitoError"}`}>1 Letra maiúscula</Typography>
                <Typography variant='caption' className={`${requisitoMin ? "requisitoSucces" : "requisitoError"}`}>1 Letra minúscula</Typography>
                <Typography variant='caption' className={`${requisitoNum ? "requisitoSucces" : "requisitoError"}`}>1 Número</Typography>
            </Grid>
        </>


    const passwordInput =
        <>
            <TextField
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                InputProps={passwordProps}
            />
        </>

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {validationName ? nameInput : nameInputError}
                    {validationCPF ? CPFInput : CPFInputError}
                    {validationDate ? dateInput : dateInputError}
                    {validationTel ? telInput : telInputError}
                    {validationEmail ? emailInput : emailInputError}
                    {validationPassword ? passwordInput : passwordInputError}
                </Stack>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" style={{ marginTop: "3vh" }}>
                    Cadastrar
                </LoadingButton>
            </form>
        </>
    );
}
