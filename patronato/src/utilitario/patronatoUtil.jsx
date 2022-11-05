import { cadastrarPessoa } from "./baseComunicacao"

export const criarPessoa = async (pesNome, pesCpf, pesSexo, pesDataNasc, pesEndNum, pesEndCompl, pesNacionalidade, pesFoto, pesEmail1, pesEmail2, pesLogId) => {
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
        "pesLogId": pesLogId,
    };

    return await cadastrarPessoa(json);
}