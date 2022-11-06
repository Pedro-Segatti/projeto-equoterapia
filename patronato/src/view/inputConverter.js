import React from "react";
import { Button, InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";


const Toolbar = ({ descricao, atualizaDlgPesquisa }) => {
  return (
    <InputGroup>
      <Form.Control value={descricao} type="text" disabled />
      <Button onClick={atualizaDlgPesquisa}><BsSearch /></Button>
    </InputGroup>
  );
};
export default Toolbar;
