import React from 'react';
import { testeConexao } from "./utilitario/baseComunicacao";
import { useNavigate } from "react-router-dom";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Login from "./view/login";
import Perfil from "./view/perfil";
import Configuracoes from "./view/configuracoes";
import SemConexao from "./view/SemConexao";
import HomePage from "./view/homePage";
import NovaPagina from "./view/novaPagina";
import CadastroAnimais from "./view/cadastros/cadastroAnimais";
import CadastroPraticantes from "./view/cadastros/cadastroPraticante";
import CadastroResponsavel from "./view/cadastros/cadastroResponsavel";
import CadastroFuncionario from "./view/cadastros/cadastroFuncionario";
import CadastroMedico from "./view/cadastros/cadastroMedico";
import CadastroAtividades from "./view/cadastros/cadastroAtividade";
import CadastroMateriais from "./view/cadastros/cadastroMaterial";
import CadastroPicadeiro from "./view/cadastros/cadastroPicadeiro";
import CadastroCargos from "./view/cadastros/cadastroCargo";
import CadastroMontaria from "./view/cadastros/cadastroMontaria";
import CadastroBairro from "./view/cadastros/cadastroBairro";
import CadastroLogradouro from "./view/cadastros/cadastroLogradouro";
import MovimentoFichaEvol from "./view/movimentos/movimentoFichaEvol";
import MovimentoFichaAnamnese from './view/movimentos/movimentoFichaAnamnese';
import MovimentoAvalFisioter from "./view/movimentos/movimentoAvalFisioter";
import MovimentoAvalSocioecon from "./view/movimentos/movimentoAvalSocioecon";
import MovimentoAgendamentoSessao from "./view/movimentos/movimentoAgendamentoSessao";
import RelatorioAgendamentos from "./view/relatorios/relatorioAgendamentos";
import RelatorioFuncionarios from "./view/relatorios/relatorioFuncionarios";
import RelatorioFichaEvolucao from './view/relatorios/relatorioFichaEvolucao';

import Carregando from "./view/carregando";

import { AuthContext, AuthProvider } from "./contexts/autenticacao";
import { useContext } from 'react';

const Rotas = () => {
    const Private = ({ children }) => {
        const { autenticado, loading } = useContext(AuthContext);
        const navegar = useNavigate();

        if (loading) {
            return <Carregando showCarregando={loading} />;
        }

        const testarConexao = async () =>{
            try {
                await testeConexao();
            } catch (error) {
                navegar("/SemConexao");
            }
        }
        testarConexao();

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
                    <Route exact path="/semConexao" element={<SemConexao />} />
                    <Route exact path="/" element={<Private><HomePage /></Private>} />
                    <Route exact path="/perfil" element={<Private><Perfil /></Private>} />
                    <Route exact path="/configuracoes" element={<Private><Configuracoes /></Private>} />
                    <Route exact path="/novaPagina" element={<Private><NovaPagina /></Private>} />
                    <Route exact path="/cadastroAnimais" element={<Private><CadastroAnimais /></Private>} />
                    <Route exact path="/cadastroPraticantes" element={<Private><CadastroPraticantes /></Private>} />
                    <Route exact path="/cadastroResponsavel" element={<Private><CadastroResponsavel /></Private>} />
                    <Route exact path="/cadastroFuncionario" element={<Private><CadastroFuncionario /></Private>} />
                    <Route exact path="/cadastroMedico" element={<Private><CadastroMedico /></Private>} />
                    <Route exact path="/cadastroAtividade" element={<Private><CadastroAtividades /></Private>} />
                    <Route exact path="/cadastroMaterial" element={<Private><CadastroMateriais /></Private>} />
                    <Route exact path="/cadastroPicadeiro" element={<Private><CadastroPicadeiro/></Private>} />
                    <Route exact path="/cadastroCargo" element={<Private><CadastroCargos /></Private>} />
                    <Route exact path="/cadastroMontaria" element={<Private><CadastroMontaria /></Private>} />
                    <Route exact path="/cadastroBairro" element={<Private><CadastroBairro /></Private>} />
                    <Route exact path="/cadastroLogradouro" element={<Private><CadastroLogradouro /></Private>} />
                    <Route exact path="/movimentoAgendamentoSessao" element={<Private><MovimentoAgendamentoSessao /></Private>} />
                    <Route exact path="/movimentoFichaEvol" element={<Private><MovimentoFichaEvol /></Private>} />
                    <Route exact path="/movimentoFichaAnamnese" element={<Private><MovimentoFichaAnamnese /></Private>}></Route>
                    <Route exact path="/movimentoAvalSocioecon" element={<Private><MovimentoAvalSocioecon /></Private>} />
                    <Route exact path="/movimentoAvalFisioter" element={<Private><MovimentoAvalFisioter /></Private>} />
                    <Route exact path="/relatorioAgendamentos" element={<Private><RelatorioAgendamentos /></Private>} />
                    <Route exact path="/relatorioFuncionarios" element={<Private><RelatorioFuncionarios /></Private>} />
                    <Route exact path="/relatorioFichaEvolucao" element={<Private><RelatorioFichaEvolucao /></Private>} />
                </Routes>
            </AuthProvider>
        </Router >
    );
};

export default Rotas;