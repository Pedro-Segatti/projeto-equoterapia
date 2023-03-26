import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/autenticacao";
import { IMaskInput } from 'react-imask';
import { Form, Row, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Carregando from "./carregando";
import logo from './img/logoComFundo.png';
import texto from './img/textoPatronatoSaoJoseourado.png';
import bgimg from './img/login-img.png';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import {
    Container,
    Card,
    Box,
} from "../view/style/login";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false); 

    const [log, setLog] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const atualizaTitulo = async () => {
          document.title = "Login";
        };
        
        atualizaTitulo();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const LogUnmask = log.replace(/[^\d]/g, '');
        await login(LogUnmask, password);
        setLog("");
        setPassword("");
        setLoading(false);
    };

    return (
        <Container>
            <ReactNotifications />
            <Carregando showCarregando={loading} />
            <Image className="bgImg" src={bgimg}></Image>
            <Card className='alturaLogin'>
                <div className="logoContent">
                    <Image className="logo" src={logo}></Image>
                    <br />
                    <Image className="texto" src={texto}></Image>
                </div>

                <Row>
                    <Box>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label htmlFor="inputLogin">Login</Form.Label>
                            <Form.Control id="inputLogin" type="text" maxLength='14' as={IMaskInput}
                                mask="000.000.000-00" placeholder='Digite aqui o seu CPF...' required value={log} onBlur={(l) => setLog(l.target.value)} 
                                className="inputLogin" />
                            <br />
                            <Form.Label htmlFor="inputSenha">Senha</Form.Label>
                            <Form.Control id="inputPassword" type="password" placeholder='Digite aqui a sua senha...' required value={password} onChange={(p) => setPassword(p.target.value)} className="inputLogin" />

                            <br />
                            <Button type="submit" className="buttonLogin">Entrar</Button>

                            {false && <div className="esqueciSenha">
                                <a href="https://google.com.br">Esqueci Minha Senha</a>
                            </div>}
                        </Form>
                    </Box>
                </Row>
            </Card>
        </Container >
    );
};
export default Login;