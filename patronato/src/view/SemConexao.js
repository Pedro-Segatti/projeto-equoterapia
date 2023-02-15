import React, { useEffect } from "react";
import HTTP_STATUS from "../utilitario/httpStatus";
import Load from './img/load.gif';
import Logo from './img/textoPatronatoSaoJoseourado.png';
import Image from 'react-bootstrap/Image';
import './style/semConexao.css';

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
        <div className="childScon">
          <Image className="cavaloGifScon" src={Load}></Image>
          <br />
          <Image className="logoScon" src={Logo}></Image>
          <p className="tituloScon">Não foi possível estabelecer conexão</p>
          <p className="subtituloScon">Aguarde enquanto o sistema é reestabelecido</p>
          <br />
        </div>
      </div>
    </div>
  );
};
export default SemConexao;
