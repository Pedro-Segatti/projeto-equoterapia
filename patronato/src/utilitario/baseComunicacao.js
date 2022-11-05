import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const criarSessao = async (login, password) => {
    return api.get("/login", { params: { "login": login, "password": password } });
};

export const buscarPessoaPeloId = async (id) => {
    return api.get("/pessoaLogada", { params: { "id": id } });
};

export const cadastrarPessoa = async (json) => {
    return api.post("/cadastrarPessoa", json);
};