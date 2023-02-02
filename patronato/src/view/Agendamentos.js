import React, { useState, useEffect } from "react";
import { api } from "../utilitario/baseComunicacao";
import { reloadPage } from "../utilitario/patronatoUtil";
import { BsFillCalendarCheckFill, BsEyeFill } from "react-icons/bs";
import { dataApiFormatada, dataFormatadaDiaMesAno, horaFormatadaString, horaFormatada } from "../utilitario/dateUtil";
import { Button, Modal, Row, Col, Card, ListGroup } from 'react-bootstrap';
import HTTP_STATUS from "../utilitario/httpStatus";

import './style/agendamentos.css';

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


    return <tr className="tabelaLinha">
      <td className="bold">{dataFormatadaDiaMesAno(agdData)}</td>
      <td>{horaFormatadaString(agdHora)}</td>
      <td>{agdDescricao}</td>
      <td>{pesNome}</td>
      <td>
        {item.agendamentoAnimalList.length > 0 && item.agendamentoAnimalList[0].axaIdAnimal.aniNome}
      </td>
      <td>
        {item.agendamentoFuncionarioList.length > 0 && item.agendamentoFuncionarioList[0].axfIdFuncionario.pessoa.pesNome}
      </td>
      <td>
        <Button variant="success" onClick={selecionarItem}><BsEyeFill /></Button>
      </td>
    </tr>
  }

  return (
    <div>
      {!loading && agendamentos.length > 0 &&
        <table className="tabelaAgendamentos">
          <thead className="tabelaCabecalho">
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Descrição</th>
              <th>Praticante</th>
              <th>Animal</th>
              <th>Instrutor</th>
              <th>Detalhar</th>
            </tr>
          </thead>

          <tbody className="tabelaCorpo">
            { 
              agendamentos.map(agd => <LinhaTabela key={agd.agdId} item={agd} />)
            }
          </tbody>
        </table>
      }

      <Modal className='modal-xl' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{agendamentoSelecionado.agdDescricao}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="center">
            <br />

            <p className="bold font-28">{agendamentoSelecionado.agdData}</p>
            <p className="font-28">{agendamentoSelecionado.agdHora}</p>

            <br />

            <Row>
              <Col md="4">
                <Card className="card">
                  <Card.Body>
                    <Card.Title>Animais</Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.agendamentoAnimalList.map(ani => <ListGroup.Item>{ani.axaIdAnimal.aniNome}</ListGroup.Item>)}
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="card">
                  <Card.Body>
                    <Card.Title>Instrutores</Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.agendamentoFuncionarioList.map(agdFunc => <ListGroup.Item>{agdFunc.axfIdFuncionario.pessoa.pesNome}</ListGroup.Item>)}
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="card">
                  <Card.Body>
                    <Card.Title>Materiais</Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        {existeAgendamento && agendamentoSelecionado.agendamentoMaterialList.map(mat => <ListGroup.Item>{mat.axmIdMaterial.matDescricao}</ListGroup.Item>)}
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <p>{agendamentoSelecionado.agdObservacoes}</p>


          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" title="Concluir Agendamento" onClick={concluirAgendamento}><BsFillCalendarCheckFill /></Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Agendamentos;
