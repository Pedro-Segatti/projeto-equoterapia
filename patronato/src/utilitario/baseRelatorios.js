import { api } from "./baseComunicacao";
import { convertBase64ToFile } from "./patronatoUtil";

export const gerarRelatorio = async (nomeDownloadArquivo, jsonParams) => {
    const pdf = await api.get("/pdf", { params: {jsonParams}});
    let file = convertBase64ToFile("data:application/pdf;base64," + pdf.data, nomeDownloadArquivo + ".pdf");
    var blob = new Blob([file], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    window.open(url);
};