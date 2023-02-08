import React, { useState, useEffect  } from 'react';
import { Form } from "react-bootstrap";
import { api } from "../../utilitario/baseComunicacao";

const SelectNacionalidade = ({ pesNacionalidade, setPesNacionalidade }) => {
  const [listPaises, setListPaises] = useState([]);
  useEffect(() => {
    api.get("/buscaListaPaises").then((response) => {
      setListPaises(response.data);
    });
  }, []);

  return (
    <>
      <Form.Label htmlFor="inputNacionalidade">Nacionalidade *</Form.Label>
      <Form.Select
        id="inputNacionalidade"
        required
        value={pesNacionalidade}
        onChange={(e) => setPesNacionalidade(e.target.value)}
      >
        {listPaises.map((pais) => (
          <option key={pais.paiIso} value={pais.paiIso}>
            {pais.paiNome}
          </option>
        ))}
      </Form.Select>
    </>
  );
};
export default SelectNacionalidade;
