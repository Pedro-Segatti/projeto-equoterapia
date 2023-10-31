import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  ColumnRigth,
} from "./style/footer";

const Footer = () => {
  return (
    <footer>
      <Box>
        <Container>
          <Row>
            <Column>
              <br />
            </Column>

            <ColumnRigth>
              <p style={{ marginBottom: "0", textAlign: "right", fontSize: "12px" }}><b>Versão:</b> 1.0</p>
              <p style={{ marginBottom: "0", textAlign: "right", fontSize: "12px" }}>© Copyright 2022. Todos os direitos reservados.</p>
            </ColumnRigth>
          </Row>
        </Container>
      </Box >
    </footer>
  );
};
export default Footer;
