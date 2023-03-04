import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import account from '../../../_mock/account';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        console.log({ email, password })
        if (password === account.password && email === account.email) {
            setUser({ id: "123", email });
            navigate("/dashboard/app");
        }
    };

    const logout = () => {
        console.log("saiu");
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{
            autthenticated: !!user, user, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
};