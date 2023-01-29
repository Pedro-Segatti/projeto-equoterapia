import React from "react";
import Image from 'react-bootstrap/Image';
import texto from './img/textoPatronatoSaoJose.png';
import {
  Box,
  Container,
  Row,
  Column,
  ColumnRigth,
  FooterLink,
  Link,
} from "./style/footer";

const Footer = () => {
  return (
    <footer>
      <Box>
        <Container>
          <Row>
            <Column id="logo">
              <Image className="textoLogo" src={texto}></Image>
            </Column>

            <Column>
              <FooterLink href="https://m.facebook.com/patronatoequoterapia/" target="_blank">
                <i className="fab fa-facebook-f"></i>
              </FooterLink>
            </Column>

            <Column>
              <FooterLink href="https://m.facebook.com/patronatoequoterapia/" target="_blank">
                <i className="fab fa-instagram"></i>
              </FooterLink>
            </Column>

            <Column>
              <FooterLink href="https://m.facebook.com/patronatoequoterapia/" target="_blank">
                <i className="fab fa-twitter"></i>
              </FooterLink>
            </Column>

            <Column>
              <FooterLink href="https://m.facebook.com/patronatoequoterapia/" target="_blank">
                <i className="fab fa-youtube"></i>
              </FooterLink>
            </Column>

            <ColumnRigth>
              <p style={{ marginBottom: "0", textAlign: "right", fontSize: "12px" }}><b>Versão:</b> 1.0</p>
              <Link href="https://m.facebook.com/patronatoequoterapia/" target="_blank" style={{ background: "none" }}>
                <p style={{ marginBottom: "0" }}><b>Patronato</b></p>
              </Link>
              <p style={{ marginBottom: "0", textAlign: "right", fontSize: "12px" }}>© Copyright 2022. Todos os direitos reservados.</p>
            </ColumnRigth>
          </Row>
        </Container>
      </Box >
    </footer>
  );
};
export default Footer;
