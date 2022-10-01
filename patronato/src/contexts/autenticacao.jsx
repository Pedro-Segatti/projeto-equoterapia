import React, { useState, useEffect, createContext } from "react";
import { api, createSession } from "../api/autenticacaoController";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const navegar = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false);
    }, []);

    const login = async (log, password) => {

        const response = await createSession(log, password);

        console.log("response", response);

        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(loggedUser);
        navegar("/");
    };

    const logout = () => {
        console.log('logout');
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        navegar("/login");
    };

    return (
        <AuthContext.Provider value={{ autenticado: !!user, user, loading, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

