import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { api } from "../../utilitario/baseComunicacao";

function SelectNacionalidade({ pesNacionalidade, setPesNacionalidade }) {
  const [listPaises, setListPaises] = useState([]);

  useEffect(async () => {
    await api.get("/buscaListaPaises").then((response) => {
      setListPaises(response.data);
    });
  }, []);

  const SelectNacionalidade = () => {
    return (
      <>
        <Form.Label htmlFor="inputNacionalidade">Nacionalidade *</Form.Label>
        <Form.Select
          id="inputNacionalidade"
          required
          value={pesNacionalidade}
          onChange={(e) => setPesNacionalidade(e.target.value)}
        >
          {listPaises.size > 0 && 
          listPaises.map((pais) => (
            <option key={pais.paiIso} value={pais.paiIso}>
              {pais.paiNome}
            </option>
          ))}
        </Form.Select>
      </>
    );
  };
  return SelectNacionalidade();
}
export default SelectNacionalidade;
