export const dataFormatada = (data) => {
    var dtFormatada = String(data).split('-');
    dtFormatada = dtFormatada[2] + "/" + dtFormatada[1] + "/" + dtFormatada[0];
    return dtFormatada;
};

export const horaFormatada = (hora) => {
    var hrFormatada = String(hora).split(':');
    hrFormatada = hrFormatada[0] + ":" + hrFormatada[1];
    return hrFormatada;
};
