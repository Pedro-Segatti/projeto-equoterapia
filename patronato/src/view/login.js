import React, { useState, useContext } from 'react';

import { AuthContext } from "../contexts/autenticacao";

import { Form, Row, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import logo from './img/logoComFundo.png';
import texto from './img/textoPatronatoSaoJoseourado.png';
import bgimg from './img/login-img.png';

import {
    Container,
    Card,
    Box,
} from "../view/style/login";

const Login = () => {
    const { login } = useContext(AuthContext);

    const [log, setLog] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit", { log, password });
        login(log, password);
    };

    return (
        <Container>
            <Image className="bgImg" src={bgimg}></Image>
            <Card>
                <div className="logoContent">
                    <Image className="logo" src={logo}></Image>
                    <br />
                    <Image className="texto" src={texto}></Image>
                </div>

                <Row>
                    <Box>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label htmlFor="inputLogin">Login</Form.Label>
                            <Form.Control id="inputLogin" type="text" value={log} onChange={(l) => setLog(l.target.value)} className="inputLogin" />
                            <br />
                            <Form.Label htmlFor="inputSenha">Senha</Form.Label>
                            <Form.Control id="inputPassword" type="password" value={password} onChange={(p) => setPassword(p.target.value)} className="inputLogin" />

                            <br />
                            <Button type="submit" className="buttonLogin">Entrar</Button>

                            <div className="esqueciSenha">
                                <a href="https://google.com.br">Esqueci Minha Senha</a>
                            </div>
                        </Form>
                    </Box>
                </Row>
            </Card>
        </Container >
    );
};
export default Login;