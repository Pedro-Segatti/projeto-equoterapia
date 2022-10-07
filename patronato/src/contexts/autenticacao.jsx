import React, { useState, useEffect, createContext } from "react";
import { api, createSession } from "../api/autenticacaoController";
import { useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';

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

        try {
            const response = await createSession(log, password);

            const user = response.data.pesId;
            const token = response.data.access_token;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("access_token", token);

            api.defaults.headers.Authorization = `Bearer ${token}`;

            setUser(user);
            navegar("/");
        } catch (error) {
            if (error.response.status === 404) {
                notificationOnError();
            }

            if (error.response.status === 400) {
                notificationOnError();
            }
        }
    };

    const notificationOnError = () => {
        Store.addNotification({
            title: "Login ou Senha inválidos",
            message: "Revise os campos",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true,
                pauseOnHover: true
            },
        });
    }

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

