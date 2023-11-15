import React, { useEffect, useState } from "react";
import HTTP_STATUS from "../utilitario/httpStatus";
import Image from 'react-bootstrap/Image';
import estilos from './style/semConexao.module.css';
import { api } from "../utilitario/baseComunicacao";

import { testeConexao } from "../utilitario/baseComunicacao";
import { useNavigate } from "react-router-dom";

const SemConexao = () => {
  const navegar = useNavigate();

  const [gifCarregando, setGifCarregando] = useState("");

  const buscaConfiguracao = async () => {
    const response = await api.get("/configuracoes");
    const { confImageLoading } = response.data;
    setGifCarregando(confImageLoading);
    console.log(response.data)
  }


  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
    });
  }

  useEffect(() => {
    buscaConfiguracao();
    const tentarConexao = async () => {
      while (true) {
        try {
          const responseTentativa = await testeConexao();
          if (responseTentativa.status === HTTP_STATUS.OK) {
            navegar("/");
            return;
          }
        } catch (error) {

        }
        await sleep(10000);
      }
    };

    tentarConexao();
  }, []);

  return (
    <div>
      <div>
        <div className={estilos.child}>
          <Image className={estilos.cavaloGif} src={gifCarregando}></Image>
          <p className={estilos.titulo}>Não foi possível estabelecer conexão</p>
          <p className={estilos.subtitulo}>Aguarde enquanto o sistema é reestabelecido</p>
          <br />
        </div>
      </div>
    </div>
  );
};
export default SemConexao;
