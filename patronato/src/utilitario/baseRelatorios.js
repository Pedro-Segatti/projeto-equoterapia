import { api } from "./baseComunicacao";
import { convertBase64ToFile } from "./patronatoUtil";
import { saveAs } from 'file-saver';
import HTTP_STATUS from "./httpStatus";
import { mensagemCustomizada } from "../utilitario/mensagemUtil";

export const gerarRelatorio = async (linkApi, nomeDownloadArquivo, jsonParams) => {
    const pdf = await api.put("/"+linkApi,jsonParams);
    if(pdf.status === HTTP_STATUS.NO_CONTENT){
        mensagemCustomizada("Nenhum registro foi encontrado", "warning");
        return;
    }
    let file = convertBase64ToFile("data:application/pdf;base64," + pdf.data, nomeDownloadArquivo + "teste.pdf");
    saveAs(file, nomeDownloadArquivo + ".pdf");
};