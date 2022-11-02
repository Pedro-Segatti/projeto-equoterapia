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
import CadastroAnimais from "./view/cadastros/cadastroAnimais";
import MovimentoFichaEvol from "./view/movimentos/movimentoFichaEvol";
import MovimentoAvalSocioecon from "./view/movimentos/movimentoAvalSocioecon";
import Carregando from "./view/carregando";

import { AuthContext, AuthProvider } from "./contexts/autenticacao";
import { useContext } from 'react';

const Rotas = () => {
    const Private = ({ children }) => {
        const { autenticado, loading } = useContext(AuthContext);

        if (loading) {
            return <Carregando showCarregando={loading} />;
        }

        //realizar comunicação com api para autenticar
        if (!autenticado) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/" element={<Private><HomePage /></Private>} />
                    <Route exact path="/novaPagina" element={<Private><NovaPagina /></Private>} />
                    <Route exact path="/cadastroAnimais" element={<Private><CadastroAnimais /></Private>} />
                    <Route exact path="/movimentoFichaEvol" element={<Private><MovimentoFichaEvol /></Private>} />
                    <Route exact path="/movimentoAvalSocioecon" element={<Private><MovimentoAvalSocioecon /></Private>} />
                </Routes>
            </AuthProvider>
        </Router >
    );
};

export default Rotas;