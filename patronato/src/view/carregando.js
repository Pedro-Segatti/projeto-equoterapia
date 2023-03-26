import React from "react";
import Image from 'react-bootstrap/Image';
import Load from './img/load.gif';
import { Modal } from 'react-bootstrap';
import './style/carregando.css';

const Carregando = ({showCarregando}) => {
    return (
        <div>
            <Modal show={showCarregando} className="dialogCarregando">
                <Modal.Body>
                    <div className="panelCarregando">
                        <Image className="cavaloGifCarregando" src={Load}></Image>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default Carregando;
