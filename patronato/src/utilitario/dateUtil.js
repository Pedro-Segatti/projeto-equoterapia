import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const dataFormatadaAnoMesDia = (data) => {
    return dayjs(data).format('YYYY-MM-DD');
};

export const dataFormatadaDiaMesAno = (data) => {
    return dayjs(data).format('DD/MM/YYYY');
};

export const horaFormatada = (hora) => {
    return dayjs(hora,"HH:mm");
};

export const dataApiFormatada = (data) => {
    return dayjs(data);
};