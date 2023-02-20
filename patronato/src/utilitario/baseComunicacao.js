import axios from "axios";

export const api = axios.create({
  baseURL: `http://${window.location.hostname}:8080`,
});

export const criarSessao = async (login, password) => {
  return api.get("/login", { params: { login: login, password: password } });
};

export const buscarPessoaPeloId = async (id) => {
  return api.get("/pessoaLogada", { params: { id: id } });
};

export const cadastrarPessoa = async (json) => {
  return api.post("/cadastrarPessoa", json);
};

export const atualizaPessoa = async (json) => {
  return api.post("/atualizarPessoa", json);
};

export const cadastrarPraticante = async (jsonPraticante) => {
  return await api.post("/cadastrarPraticante", jsonPraticante);
};

export const cadastrarResponsavel = async (jsonResponsavel) => {
  return await api.post("/cadastrarResponsavel", jsonResponsavel);
};

export const atualizarResponsavel = async (json) => {
  return api.post("/atualizarResponsavel", json);
};

export const cadastrarFuncionario = async (jsonFuncionario) => {
  return await api.post("/cadastrarFuncionario", jsonFuncionario);
};

export const testeConexao = async () => {
  return await api.get("/testeConexao");
};
