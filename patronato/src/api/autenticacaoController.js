import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const createSession = async (login, password) => {
    console.log("reqqq", login, password);
    return api.get("/login", JSON.stringify(login), JSON.stringify(password));
}