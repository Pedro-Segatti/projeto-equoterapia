import React, { useState  } from 'react';
import { Form, Card, Table, Button, Col, Row } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import TableFooter from '../table/tableFooter';
import useTable from '../table/useTable';
import { mensagemCustomizada } from "../../utilitario/mensagemUtil";
import { IMaskInput } from 'react-imask';

const TabelaTelefones = ({ listTelefones, setListTelefones }) => {
  const removeTelefoneSelecionado = async (index) => {
      try {
          setListTelefones(listTelefones.filter((item, i) => i !== index));
          mensagemCustomizada("Telefone Excluído com Sucesso", "success");
      } catch (error) {
          console.log(error);
      }
  }

  const criarTelefone = (e) => {
    const jsonItem = {
        "telId": null,
        "telNumero": "",
        "telIdPessoa": ""
    }
    setListTelefones(tel => [...tel, jsonItem]);
}

const atualizaTelefone = (item, telefone) => {
    item.telNumero = telefone.replace("(", "").replace(" ", "").replace("-", "");
}

const LinhaTabelaTelefones = ({ item, removeTelefoneSelecionado, index }) => {
  const [telNumero, setTelNumero] = useState(item.telNumero);

  const removerItem = e => removeTelefoneSelecionado(index);

  return <tr>
      <td width={'100px'}>
          <Form.Control value={telNumero}
              onChange={(e) => setTelNumero(e.target.value)}
              as={IMaskInput} inputMode="numeric" id="inputTel" mask="(00)00000-0000" maxLength="16" required onComplete={atualizaTelefone(item, telNumero)} autoComplete="off"/>
      </td>
      <td width={'80px'} className='center'>
          <Button className='btn-danger' onClick={removerItem}><BsFillTrashFill /></Button>
      </td>
  </tr>
}

const TabelaTelefones = ({ data, rowsPerPage }) => {
  const [pagina, setPage] = useState(1);
  const { slice, range } = useTable(data, pagina, rowsPerPage);
  return (
      <>
          <Table size="sm">
              <thead>
                  <tr>
                      <th>Número</th>
                      <th className='center'>Ação</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      slice.map((item, index) => <LinhaTabelaTelefones key={index} item={item} removeTelefoneSelecionado={removeTelefoneSelecionado} index={index} />)
                  }
              </tbody>
          </Table>
          <TableFooter range={range} slice={slice} setPage={setPage} page={pagina} />
      </>
  );
};

  return (
    <>
      <Card>
          <div className='marginLeft'>
              <Row>
                  <Col md="12">
                      <b>Telefones</b>
                  </Col>
              </Row>
              <Row>
                  <Col md="12">
                      <Button variant="primary" className='btn-success btnMarginTop' onClick={criarTelefone}>Adicionar</Button>
                  </Col>
              </Row>
              <TabelaTelefones data={listTelefones} rowsPerPage={5} selecionaLinha={false} removeResp={removeTelefoneSelecionado} />
          </div>
      </Card>
    </>
  );
};
export default TabelaTelefones;
