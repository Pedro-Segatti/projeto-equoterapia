import React, { useState, useEffect, useContext } from 'react';
import { buscarPessoaPeloId } from "../utilitario/baseComunicacao";
import { AuthContext } from "../contexts/autenticacao";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import logo from './img/logoSemFundo.png';
import logoutImg from './img/logout.png';

const Menu = ({tituloPagina}) => {
  const [pessoaLogada, setPessoaLogada] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarPessoaLogada = async () => {
      const response = await buscarPessoaPeloId(user);
      setPessoaLogada(response.data);
      setLoading(false);
    };

    const atualizaTitulo = async () => {
      document.title = tituloPagina;
    };
    
    atualizaTitulo();
    buscarPessoaLogada();
  }, []);

  const handleClickLogout = (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <header>
      <Navbar sticky='top' expand="lg">
        <Navbar.Brand className="mx-3" href="/"><Image className="logo" src={logo}></Image></Navbar.Brand>
        <Navbar.Toggle className="bg-ligth" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Cadastros" id="basic-nav-dropdown" className="mr-4">
              <NavDropdown.Item href="/cadastroAnimais">Animal</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroPraticantes">Praticante</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroResponsavel">Responsável</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroFuncionario">Funcionário</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroMedico">Médico</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroAtividade">Atividade</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroMaterial">Material</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroPicadeiro">Picadeiro</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroCargo">Cargo</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroMontaria">Montaria</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroBairro">Bairro</NavDropdown.Item>
              <NavDropdown.Item href="/cadastroLogradouro">Logradouro</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Movimentos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/movimentoAgendamentoSessao">Agendamento de Sessão</NavDropdown.Item>
              <NavDropdown.Item href="/movimentoFichaEvol">Ficha de Evolução</NavDropdown.Item>
              <NavDropdown.Item href="/movimentoFichaAnamnese">Ficha de Anamnese</NavDropdown.Item>
              <NavDropdown.Item href="/movimentoAvalSocioecon">Avaliação Socioeconômica</NavDropdown.Item>
              <NavDropdown.Item href="/movimentoAvalFisioter">Avaliação Fisioterápica</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Relatórios" id="basic-nav-dropdown">
            <NavDropdown.Item href="/relatorioAgendamentos">Agendamento</NavDropdown.Item>
              <NavDropdown.Item href="/relatorioFuncionarios">Funcionário</NavDropdown.Item>
              <NavDropdown.Item href="/relatorioFichaEvolucao">Ficha de Evolução</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {!loading &&
          <Navbar.Collapse className="justify-content-end">
            <div className='user-display'>
              <div>
                <Navbar.Brand className="mx-3" href="/perfil">
                  <Image className="ftPerfil" src={pessoaLogada.pesFoto}></Image>
                </Navbar.Brand>
              </div>

              <div className='textos'>
                <p className='nomeLogin'>{pessoaLogada.pesNome}</p>
                <a onClick={handleClickLogout} href='/'>
                  <Image className='logout' src={logoutImg}></Image>
                </a>
              </div>
            </div>
          </Navbar.Collapse>
        }
      </Navbar>
    </header>
  )
}
export default Menu;