import React, { useEffect, useState } from "react";
import { api } from "../utilitario/baseComunicacao";
import Image from 'react-bootstrap/Image';
import { Modal } from 'react-bootstrap';
import './style/carregando.css';

const Carregando = ({ showCarregando }) => {
    const [gifCarregando, setGifCarregando] = useState("");

    const buscaConfiguracao = async () => {
        const response = await api.get("/configuracoes");
        const { confImageLoading } = response.data;
        setGifCarregando(confImageLoading);
    }

    useEffect(() => {
        buscaConfiguracao();
    }, []);

    return (
        <div>
            <Modal show={showCarregando} className="dialogCarregando">
                <Modal.Body>
                    <div className="panelCarregando">
                        <Image className="cavaloGifCarregando" src={gifCarregando}></Image>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default Carregando;
