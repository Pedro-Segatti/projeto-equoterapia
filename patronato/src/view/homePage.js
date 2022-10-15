import React from "react";
import Menu from "./menu.js";
import Footer from "./footer.js";
import { Container } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <Menu />
            <Container className="vh-100">
            </Container>
            <Footer />
        </div>
    );
};
export default HomePage;
