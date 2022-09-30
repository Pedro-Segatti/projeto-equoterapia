import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Login from "./view/login";
import HomePage from "./view/homePage";
import NovaPagina from "./view/novaPagina";

import { AuthContext, AuthProvider } from "./autenticacao";
import { useContext } from 'react';

const Rotas = () => {
    const Private = ({ children }) => {
        const { authenticado } = useContext(AuthContext);

        //realizar comunicação com api para autenticar

        if (!authenticado) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/restrito" element={
                        <Private path="/home">
                            <HomePage />
                        </Private>
                    }
                    />
                </Routes>
            </AuthProvider>
        </Router >
    );
};

export default Rotas;