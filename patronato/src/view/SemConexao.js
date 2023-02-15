import React, { useEffect } from "react";
import HTTP_STATUS from "../utilitario/httpStatus";
import Load from './img/load.gif';
import Logo from './img/textoPatronatoSaoJoseourado.png';
import Image from 'react-bootstrap/Image';
import estilos from './style/semConexao.module.css';

import { testeConexao } from "../utilitario/baseComunicacao";
import { useNavigate } from "react-router-dom";

const SemConexao = () => {
  const navegar = useNavigate();

  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
    });
  }

  useEffect(() => {
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
          <Image className={estilos.cavaloGif} src={Load}></Image>
          <br />
          <Image className={estilos.logo} src={Logo}></Image>
          <p className={estilos.titulo}>Não foi possível estabelecer conexão</p>
          <p className={estilos.subtitulo}>Aguarde enquanto o sistema é reestabelecido</p>
          <br />
        </div>
      </div>
    </div>
  );
};
export default SemConexao;
