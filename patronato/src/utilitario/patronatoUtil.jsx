import { cadastrarPessoa, atualizaPessoa } from "./baseComunicacao"

export const reloadPage = () => {
    window.location.reload(true);
  };

export const criarPessoa = async (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
    const json = montaJsonPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
    return await cadastrarPessoa(json);
}

export const atualizarPessoa = async (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
    const json = montaJsonPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
    return await atualizaPessoa(json);
}

export const montaJsonPessoa = (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
    const unMaskCpf = pesCpf.replace(/[^\d]/g, '');
    const json = {
        "pesNome": pesNome,
        "pesCpf": unMaskCpf,
        "pesSexo": pesSexo,
        "pesDataNasc": pesDataNasc,
        "pesEndNum": pesEndNum,
        "pesEndCompl": pesEndCompl,
        "pesNacionalidade": pesNacionalidade,
        "pesFoto": pesFoto,
        "pesEmail1": pesEmail1,
        "pesEmail2": pesEmail2,
        "pesLogId": pesLogId
    };
    return json;
} 

export const montaJsonPessoaCompleta = (pesId, pesNome, pesCpf,pesLoginPassword, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId, telefoneList) => {
    const unMaskCpf = pesCpf.replace(/[^\d]/g, '');
    const json = {
        "pesId":pesId,
        "pesNome": pesNome,
        "pesCpf": unMaskCpf,
        "pesLoginPassword":pesLoginPassword,
        "pesSexo": pesSexo,
        "pesDataNasc": pesDataNasc,
        "pesEndNum": pesEndNum,
        "pesEndCompl": pesEndCompl,
        "pesNacionalidade": pesNacionalidade,
        "pesFoto": pesFoto,
        "pesEmail1": pesEmail1,
        "pesEmail2": pesEmail2,
        "logradouro": pesLogId,
        "telefoneList": telefoneList
    };
    return json;
} 

export const convertBase64ToFile = (base64String, fileName) => {
    let arr = base64String.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let uint8Array = new Uint8Array(n);
    while (n--) {
        uint8Array[n] = bstr.charCodeAt(n);
    }
    let file = new File([uint8Array], fileName, { type: mime });
    return file;
}