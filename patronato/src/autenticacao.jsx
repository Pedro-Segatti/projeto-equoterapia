import React, { useState, createContext } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navegar = useNavigate();
    const [user, setUser] = useState(null);

    const login = (log, password) => {
        console.log('login', { log, password });
        if (password === "123") {
            setUser({ id: "123", log });
            navegar("/home");
        }
    };

    const logout = () => {
        console.log('logout');
        setUser(null);
        navegar("/login");
    };

    return (
        <AuthContext.Provider value={{ autenticado: !!user, user, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

