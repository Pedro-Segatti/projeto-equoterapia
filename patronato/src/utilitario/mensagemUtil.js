import { Store } from 'react-notifications-component';

export const loginSenhaInvalidos = () => {
    Store.addNotification({
        title: "Login ou Senha inválidos",
        message: "Revise os campos",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const registroSalvo = () => {
    Store.addNotification({
        title: "Registro salvo com sucesso",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const registroExcluido = () => {
    Store.addNotification({
        title: "Registro excluído com sucesso",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const semRegistros = () => {
    Store.addNotification({
        title: "A pesquisa não retornou registros",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const pessoaDuplicada = () => {
    Store.addNotification({
        title: "Já existe praticante com o CPF informado",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const avisoCustomizado = (mensagem) => {
    Store.addNotification({
        title: mensagem,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};
