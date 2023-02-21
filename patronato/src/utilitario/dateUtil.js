import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const dataFormatadaAnoMesDia = (data) => {
    return data !== "" ? dayjs(data).format('YYYY-MM-DD') : "";
};

export const dataFormatadaDiaMesAno = (data) => {
    return dayjs(data).format('DD/MM/YYYY');
};

export const horaFormatada = (hora) => {
    return dayjs(hora,"HH:mm");
};

export const horaFormatadaString = (hora) => {
    var hrFormatada = String(hora).split(':');
    hrFormatada = hrFormatada[0] + ":" + hrFormatada[1];
    return hrFormatada;
};

export const dataApiFormatada = (data) => {
    return dayjs(data);
};