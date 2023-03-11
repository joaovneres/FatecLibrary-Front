import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import account from '../../../_mock/account';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Manter o usuário, mesmo com refresh
    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Guardar dados dos logins no local storage
        const loggedUser = {
            id: "1",
            email,
        };

        if (password === account.password && email === account.email) {
            console.log("entrou3")
            setUser({ loggedUser });
            localStorage.setItem("user", JSON.stringify(loggedUser));
            navigate("/dashboard/app");
        }
    };

    const logout = () => {
        console.log("saiu");
        setUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{
            authenticated: !!user, user, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};