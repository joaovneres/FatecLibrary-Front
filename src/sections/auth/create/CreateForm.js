import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from '../context/auth';

// ----------------------------------------------------------------------

export default function CreateForm() {

    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", { email, password });
    };

    // nome
    const [name, setName] = useState("");
    const [validationName, setValidationName] = useState(true);

    const nameInputError = <TextField
        error
        helperText="É necessário informar seu nome completo."
        name="name"
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => {
            name.trim().split(" ").length > 1 ? setValidationName(true) : setValidationName(false); // eslint-disable-line
            setName(e.target.value);
        }}
    />

    const nameInput = <TextField
        name="name"
        label="Nome"
        type="text"
        value={name}
        onChange={(e) => {
            name.trim().split(" ").length > 1 ? setValidationName(true) : setValidationName(false); // eslint-disable-line
            setName(e.target.value);
        }}
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

    const CPFInputError = <TextField
        error
        helperText="É necessário informar um CPF."
        name="CPF"
        label="CPF"
        type="text"
        value={CPF}
        onChange={(e) => {
            setCPF(maskCPF(e.target.value));
            CPF.trim().length === 13 ? setValidationCPF(true) : setValidationCPF(false); // eslint-disable-line
        }}
    />

    const CPFInput = <TextField
        name="CPF"
        label="CPF"
        type="text"
        value={CPF}
        onChange={(e) => {
            setCPF(maskCPF(e.target.value));
            CPF.trim().length === 13 ? setValidationCPF(true) : setValidationCPF(false); // eslint-disable-line
        }}
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

    const telInputError = <TextField
        error
        helperText="É necessário informar o número completo no formato (DDD) 99999-9999."
        name="tel"
        label="Celular inválido"
        type="text"
        value={tel}
        onChange={(e) => {
            setTel(maskPhone(e.target.value));
            tel.trim().length === 14 ? setValidationTel(true) : setValidationTel(false); // eslint-disable-line
        }}
    />
    const telInput = <TextField
        name="tel"
        label="Celular"
        type="text"
        value={maskPhone(tel)}
        onChange={(e) => {
            setTel(maskPhone(e.target.value));
            tel.trim().length === 14 ? setValidationTel(true) : setValidationTel(false); // eslint-disable-line
        }}
    />


    // email
    const [email, setEmail] = useState("");
    const [validationEmail, setValidationEmail] = useState(true);

    const emailInputError = <TextField
        error
        helperText="ex: email@email.com"
        name="email"
        label="E-mail inválido"
        type="email"
        value={email}
        onChange={(e) => {
            re.test(email) ? setValidationEmail(true) : setValidationEmail(false); // eslint-disable-line
            setEmail(e.target.value);
        }}
    />

    const emailInput = <TextField
        name="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => {
            re.test(email) ? setValidationEmail(true) : setValidationEmail(false); // eslint-disable-line
            setEmail(e.target.value);
        }}
    />

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

    // senha
    const [password, setPassword] = useState("");

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {validationName ? nameInput : nameInputError}
                    {validationCPF ? CPFInput : CPFInputError}
                    {validationTel ? telInput : telInputError}
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
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                    Login
                </LoadingButton>
            </form>
        </>
    );
}
