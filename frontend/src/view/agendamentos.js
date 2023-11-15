import React, { useState, useEffect } from "react";
import { api } from "../utilitario/baseComunicacao";
import { reloadPage } from "../utilitario/equoterapiaUtil";
import { BsFillCalendarCheckFill, BsEyeFill } from "react-icons/bs";
import { dataApiFormatada, dataFormatadaDiaMesAno, horaFormatadaString, horaFormatada } from "../utilitario/dateUtil";
import { Button, Modal, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';
import HTTP_STATUS from "../utilitario/httpStatus";
import { isMobile } from "react-device-detect";

import estilos from './style/agendamentos.module.css';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState("");
  const [existeAgendamento, setExisteAgendamento] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const buscaAgendamentos = async () => {
      setAgendamentos(await (await api.get("/pesquisaAgendamentosAtivos")).data)
      setLoading(false);
    };

    buscaAgendamentos();
  }, []);

  const atualizaItemSelecionado = (item) => {
    setAgendamentoSelecionado(item);
    setExisteAgendamento(true);
    handleShow();
  }

  const concluirAgendamento = async () => {
    agendamentoSelecionado.agdData =  dataApiFormatada(agendamentoSelecionado.agdData);
    agendamentoSelecionado.agdHora = horaFormatada(agendamentoSelecionado.agdHora);
    agendamentoSelecionado.agdConcluido = true;
    const response = await api.post("/cadastrarAgendamento", agendamentoSelecionado);
    if (response.status === HTTP_STATUS.OK) {
      reloadPage();
    }
  }

  const LinhaTabela = ({ item }) => {
    const { agdData, agdHora, agdDescricao } = item;
    const { pesNome } = item.praticante.pessoa;
    const selecionarItem = e => atualizaItemSelecionado(item);
    
    return <tr className={estilos.tabelaLinha}>
      <td className="bold">{dataFormatadaDiaMesAno(agdData)}</td>
      <td>{horaFormatadaString(agdHora)}</td>
      <td>{agdDescricao}</td>
      <td>{pesNome}</td>
      {!isMobile && <td>
        {item.animalList.length > 0 && item.animalList[0].aniNome}
      </td>}
      {!isMobile && <td>
        {item.funcionarioList.length > 0 && item.funcionarioList[0].pessoa.pesNome}
      </td>}
      <td>
        <Button variant="success" onClick={selecionarItem}><BsEyeFill /></Button>
      </td>
    </tr>
  }

  return (
    <div>
      {!loading && agendamentos.length > 0 &&
        <Table className={estilos.tabelaAgendamentos} responsive>
          <thead className={estilos.tabelaCabecalho}>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Descrição</th>
              <th>Praticante</th>
              {!isMobile && <th>Animal</th>}
              {!isMobile && <th>Instrutor</th>}
              <th>Detalhar</th>
            </tr>
          </thead>

          <tbody className={estilos.tabelaCorpo}>
            { 
              agendamentos.map(agd => <LinhaTabela key={agd.agdId} item={agd} />)
            }
          </tbody>
        </Table>
      }

      <Modal className='modal-xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{agendamentoSelecionado.agdDescricao}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="center">
            <br />

            <p className="bold font-28">{dataFormatadaDiaMesAno(agendamentoSelecionado.agdData)}</p>
            <p className="font-28">{agendamentoSelecionado.agdHora}</p>

            <br />

            <Row>
              <Col md="4">
                <Card className={estilos.card_agendamento}>
                  <Card.Body>
                    <Card.Title>Animais</Card.Title>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.animalList.map(ani => <ListGroup.Item key={ani.aniId}>{ani.aniNome}</ListGroup.Item>)}
                      </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className={estilos.card_agendamento}>
                  <Card.Body>
                    <Card.Title>Instrutores</Card.Title>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.funcionarioList.map(agdFunc => <ListGroup.Item key={agdFunc.pessoa.pesId}>{agdFunc.pessoa.pesNome}</ListGroup.Item>)}
                      </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className={estilos.card_agendamento}>
                  <Card.Body>
                    <Card.Title>Materiais</Card.Title>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.materialList.map(mat => <ListGroup.Item key={mat.matId}>{mat.matDescricao}</ListGroup.Item>)}
                      </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div>{agendamentoSelecionado.agdObservacoes}</div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" title="Concluir Agendamento" onClick={concluirAgendamento}><BsFillCalendarCheckFill />    Concluir Agendamento</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Agendamentos;
