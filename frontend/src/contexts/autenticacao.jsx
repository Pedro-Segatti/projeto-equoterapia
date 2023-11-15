import React, { useState, useEffect, createContext } from "react";
import { api, criarSessao, testeConexao } from "../utilitario/baseComunicacao";
import { useNavigate } from "react-router-dom";
import HTTP_STATUS from '../utilitario/httpStatus';
import { loginSenhaInvalidos } from '../utilitario/mensagemUtil'

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const navegar = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testarConexao = async () =>{
            try {
                await testeConexao();
            } catch (error) {
                navegar("/SemConexao");
            }
        }
        testarConexao();

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
            const response = await criarSessao(log, password);

            const user = response.data.pesId;
            const token = response.data.access_token;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("access_token", token);

            api.defaults.headers.Authorization = `Bearer ${token}`;

            setUser(user);
            navegar("/");
        } catch (error) {
            if (error.response.status === HTTP_STATUS.NOT_FOUND) {
                loginSenhaInvalidos();
            }

            if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
                loginSenhaInvalidos();
            }
        }
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

