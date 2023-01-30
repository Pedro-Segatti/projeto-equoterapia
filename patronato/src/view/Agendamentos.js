import React, { useState, useEffect } from "react";
import { api } from "../utilitario/baseComunicacao";
import { dataFormatada, horaFormatada } from "../utilitario/dateUtil";
import './style/agendamentos.css';


const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscaAgendamentos = async () => {
      setAgendamentos(await (await api.get("/pesquisaAgendamentosAtivos")).data)
      setLoading(false);
    };

    buscaAgendamentos();
  }, []);

  const LinhaTabela = ({ item }) => {
    const { agdData, agdHora, agdDescricao } = item;
    const { pesNome } = item.praticante.pessoa;

    return <tr className="tabelaLinha">
      <td className="bold">{dataFormatada(agdData)}</td>
      <td>{horaFormatada(agdHora)}</td>
      <td>{agdDescricao}</td>
      <td>{pesNome}</td>
      <td>
        {
          <p>{item.agendamentoAnimalList.length > 0 && item.agendamentoAnimalList[0].axaIdAnimal.aniNome}</p>
        }
      </td>
      <td>
        {
          <p>{item.agendamentoFuncionarioList.length > 0 && item.agendamentoFuncionarioList[0].axfIdFuncionario.pessoa.pesNome}</p>
        }
      </td>
    </tr>
  }

  return (
    <div>
      {!loading &&
        <table className="tabelaAgendamentos table-reflow">
          <thead className="tabelaCabecalho">
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Descrição</th>
              <th>Praticante</th>
              <th>Animal</th>
              <th>Instrutor</th>
            </tr>
          </thead>

          <tbody className="tabelaCorpo">
            {
              agendamentos.map(agd => <LinhaTabela key={agd.agdId} item={agd} />)
            }
          </tbody>
        </table>
      }
    </div>
  );
};
export default Agendamentos;
