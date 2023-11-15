import React from "react";
import Menu from "./menu.js";
import Footer from "./footer.js";
import Agendamentos from "./agendamentos.js";
import { Container } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <Menu tituloPagina={"Home"} />
            <Container className="vh-100">
                <Agendamentos />
            </Container>
            <Footer />
        </div>
    );
};
export default HomePage;
