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
        const recoveredToken = localStorage.getItem("access_token");

        if (recoveredUser && recoveredToken) {
            const idUser = JSON.parse(recoveredUser);
            setUser(idUser)
        }

        setLoading(false);
    }, []);

    const login = async (log, password) => {

        const response = await createSession(log, password);

        const user = response.data.pesId;
        const token = response.data.access_token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser(user);
        navegar("/");
    };

    const logout = () => {
        console.log('logout');
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        api.defaults.headers.Authorization = null;
        navegar("/login");
    };

    return (
        <AuthContext.Provider value={{ autenticado: !!user, user, loading, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

