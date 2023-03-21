import React from "react";
import Image from 'react-bootstrap/Image';
import Load from './img/load.gif';
import { Modal } from 'react-bootstrap';

import estilos from './style/carregando.module.css';

const Carregando = ({showCarregando}) => {
    return (
        <div>
            <Modal show={showCarregando} className={estilos.dialog}>
                <Modal.Body>
                    <div className={estilos.panelCarregando}>
                        <Image className={estilos.cavaloGif} src={Load}></Image>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default Carregando;
