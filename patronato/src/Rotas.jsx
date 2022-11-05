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
import CadastroAtividades from "./view/cadastros/cadastroAtividade";
import CadastroMateriais from "./view/cadastros/cadastroMaterial";
import CadastroPicadeiro from "./view/cadastros/cadastroPicadeiro";
import CadastroCargos from "./view/cadastros/cadastroCargo";
import CadastroFichaEvol from "./view/cadastros/cadastroFichaEvol";
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
                    <Route exact path="/cadastroAtividade" element={<Private><CadastroAtividades /></Private>} />
                    <Route exact path="/cadastroMaterial" element={<Private><CadastroMateriais /></Private>} />
                    <Route exact path="/cadastroPicadeiro" element={<Private><CadastroPicadeiro/></Private>} />
                    <Route exact path="/cadastroCargo" element={<Private><CadastroCargos /></Private>} />
                    <Route exact path="/cadastroFichaEvol" element={<Private><CadastroFichaEvol /></Private>} />
                </Routes>
            </AuthProvider>
        </Router >
    );
};

export default Rotas;