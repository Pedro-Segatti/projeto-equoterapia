import { api } from "./baseComunicacao";
import { convertBase64ToFile } from "./patronatoUtil";
import { saveAs } from 'file-saver';

export const gerarRelatorio = async (linkApi, nomeDownloadArquivo, jsonParams) => {
    const pdf = await api.put("/"+linkApi,jsonParams);
    let file = convertBase64ToFile("data:application/pdf;base64," + pdf.data, nomeDownloadArquivo + "teste.pdf");
    saveAs(file, nomeDownloadArquivo + ".pdf");
};