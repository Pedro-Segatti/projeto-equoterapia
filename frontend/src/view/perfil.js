import React, { useState, useEffect, useContext } from "react";
import { ReactNotifications } from 'react-notifications-component';
import { buscarPessoaPeloId } from "../utilitario/baseComunicacao";
import { base64NoPhoto, montaJsonPessoaCompleta } from "../utilitario/equoterapiaUtil";
import { AuthContext } from "../contexts/autenticacao";
import { cadastrarPessoa, encriptarSenha } from "../utilitario/baseComunicacao";
import { Form, Col, Row, Container, Image } from 'react-bootstrap';
import { mensagemCustomizada, registroSalvo } from "../utilitario/mensagemUtil"
import HTTP_STATUS from "../utilitario/httpStatus";
import Toolbar from './toolbar';
import Menu from "./menu";
import Footer from "./footer";

const Perfil = () => {
  const [pessoaLogada, setPessoaLogada] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [pesFoto, setPesFoto] = useState(base64NoPhoto);
  const [pesSexo, setPesSexo] = useState("");
  const [pesEmail1, setPesEmail1] = useState("");
  const [pesLoginPasswordConfirm, setPesLoginPasswordConfirm] = useState("");
  const [pesLoginPasswordNew, setPesLoginPasswordNew] = useState("");

  const showPreview = (e) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPesFoto(reader.result);
        }
      }

      reader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarPessoaLogada();
  }, []);

  const preencherCamposPessoa = (data) => {
    setPesEmail1(data.pesEmail1);
    setPesSexo(data.pesSexo);
    if (data.pesFoto !== null) {
      setPesFoto(data.pesFoto);
    }
  }

  const buscarPessoaLogada = async () => {
    const response = await buscarPessoaPeloId(user);
    setPessoaLogada(response.data);
    preencherCamposPessoa(response.data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var alterouSenha = false;
    if (pesLoginPasswordNew !== null && pesLoginPasswordNew !== "") {
      var encriptPassword = await encriptarSenha(pesLoginPasswordConfirm);
      
      console.log(encriptPassword.data !== pessoaLogada.pesLoginPassword);

      if (encriptPassword.data !== pessoaLogada.pesLoginPassword) {
        mensagemCustomizada("A senha atual não confere", "warning");
        return
      }

      encriptPassword = await encriptarSenha(pesLoginPasswordNew);
      pessoaLogada.pesLoginPassword = encriptPassword.data;
      alterouSenha = true;
    }

    if (pessoaLogada.pesFoto === base64NoPhoto) {
      pessoaLogada.pesFoto = null;
    } else {
      pessoaLogada.pesFoto = pesFoto;
    }

    pessoaLogada.pesSexo = pesSexo;
    pessoaLogada.pesEmail1 = pesEmail1;

    try {
      const jsonPessoa = await montaJsonPessoaCompleta(pessoaLogada.pesId, pessoaLogada.pesNome, pessoaLogada.pesCpf, pessoaLogada.pesLoginPassword, pessoaLogada.pesSexo, pessoaLogada.pesDataNasc, pessoaLogada.pesEndNum, pessoaLogada.pesEndCompl, pessoaLogada.pesNacionalidade.paiIso, pessoaLogada.pesFoto, pessoaLogada.pesEmail1, pessoaLogada.pesEmail2, pessoaLogada.logradouro, pessoaLogada.telefoneList);
      console.log(jsonPessoa);
      
      const response = await cadastrarPessoa(jsonPessoa);

      if (alterouSenha) {
        logout();
      }
      if (response.status === HTTP_STATUS.OK) {
        registroSalvo();
        buscarPessoaLogada();
      }
    } catch (error) {

    }
  }

  return (
    <div>
      <Menu tituloPagina={"Perfil"} />
      <ReactNotifications />
      {!loading && <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="12">
              <div className="fotoPessoa">
                <Image id="imgPessoa" onClick={() => setPesFoto(base64NoPhoto)} src={pesFoto}></Image>

                <Form.Control type="file" id="inputFoto" accept="image/png, image/jpg, image/jpeg" onChange={showPreview} />
                <Form.Label htmlFor="inputFoto" className='label-input-file'>Selecione a Foto</Form.Label>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Form.Label htmlFor="inputNome">Nome </Form.Label>
              <Form.Control value={pessoaLogada.pesNome} disabled={true}
                type="text" id="inputNome" />
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <Form.Label htmlFor="inputDate">Data de Nascimento</Form.Label>
              <Form.Control value={pessoaLogada.pesDataNasc}
                type="date" id="inputDate" disabled={true} />
            </Col>
            <Col md="6">
              <Form.Label htmlFor="inputCpf">CPF</Form.Label>
              <Form.Control id="inputCpf" type="text" maxLength='14' inputMode="numeric"
                mask="000.000.000-00" value={pessoaLogada.pesCpf} disabled={true} />
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <Form.Label htmlFor="inputSexo">Sexo</Form.Label>
              <Form.Select id='inputSexo' required
                value={pesSexo}
                onChange={(e) => setPesSexo(e.target.value)}>
                <option>Selecione</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Form.Label htmlFor="inputEmailP">Email Principal</Form.Label>
              <Form.Control value={pesEmail1}
                onChange={(e) => setPesEmail1(e.target.value)}
                type="text" id="inputEmailP" />
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <Form.Label htmlFor="inputPasswordConfirm">Senha Atual</Form.Label>
              <Form.Control value={pesLoginPasswordConfirm}
                onChange={(e) => setPesLoginPasswordConfirm(e.target.value)}
                type="password" id="inputPasswordConfirm" />
            </Col>

            <Col md="6">
              <Form.Label htmlFor="inputPasswordNew">Nova Senha</Form.Label>
              <Form.Control value={pesLoginPasswordNew}
                onChange={(e) => setPesLoginPasswordNew(e.target.value)}
                type="password" id="inputPasswordNew" />
            </Col>
          </Row>

          <Toolbar cancelarHidden={true} pesquisarHidden={true} excluirHidden={true} />
        </Form>
      </Container>
      }
      <Footer />
    </div>
  );
};
export default Perfil;
