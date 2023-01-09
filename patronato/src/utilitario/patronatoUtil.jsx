import { cadastrarPessoa, atualizaPessoa } from "./baseComunicacao"

export const criarPessoa = async (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
    const json = montaJsonPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
    return await cadastrarPessoa(json);
}

export const atualizarPessoa = async (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
    const json = montaJsonPessoa(pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId);
    return await atualizaPessoa(json);
}

export const montaJsonPessoa = (pesId, pesNome, pesCpf,pesLoginPassword, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId, telefoneList) => {
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