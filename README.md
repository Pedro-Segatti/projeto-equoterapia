# Sistema para gerenciamento de Equoterapia.

O projeto surgiu como resultado do trabalho na disciplina Projeto Integrador III do curso de Ciência da Computação na URI Erechim, sob a orientação do Professor Fabio Zanin. Inicialmente colaborando com o Patronato São José, uma instituição sem fins lucrativos voltada para equoterapia e apoio a vulnerabilidade social. A aplicação visa melhorar a gestão do programa de equoterapia, substituindo métodos manuais por uma solução eficiente e acolhedora.

## Ferramentas utilizadas e por que.
- Java
  O backend da aplicação foi desenvolvido com a linguagem de programação Java juntamente com o framework Spring Boot, facilitando a utilização de toda a persistência de informações no Banco de Dados, possibilitando que seja feito todo o BackEnd de forma rápida e eficiente.
- Javascript
  O frontend baseou-se em Node (Javascript), onde junto com a biblioteca React e o framework Bootstrap permitiram a fácil criação de interfaces interativas, possibilitando exibir e atualizar os componentes visuais de forma eficiente e prática, na medida em que os dados mudam.
- Mysql
  Dentre os benefícios vistos para a escolha do MySQL no projeto estão a facilidade de uso, a confiabilidade, o desempenho, a alta disponibilidade e a segurança.

## Motivação
  Com o aumento do volume de informações e a necessidade de um maior controle sobre as mesmas, os processos que anteriormente eram feitos utilizando papel e caneta têm a chance de se tornarem informatizados. Tendo isso em mente, a motivação do trabalho baseou-se na demanda de uma entidade filantrópica de cunho social, onde o grupo enxergou a possibilidade de realmente fazer a diferença para a sociedade.

## Principais autores no início do projeto e suas funções.
Este projeto foi desenvolvido por:
  - Eduardo Vitor Mokfa
  - Pedro Henrique Segatti
  - Rafaela Jamilly Bortoloso

Para atender as necessidades da instituição sem fins lucrativos Patronato São José

## Tecnicamente, como é o projeto.
A aplicação está inteiramente estruturada com containers, portanto a execução do mesmo é extremamente simples e fácil.

O banco de dados foi enviado ao docker hub, para que não seja necessário realizar a criação de tabelas localmente. https://hub.docker.com/r/eduardomokfa/equoterapia_database 

## Documentações


## Diagramas
- Entidade Relacionamento
![Diagrama_ER](https://lh3.googleusercontent.com/u/2/drive-viewer/AK7aPaBv8yOVrXXhnhc-MXyptPMuzc3VxEB5zR-XCm-nBSQxgRBWDUYLDIZLZ2HPWvB00HrIQB_u8uUYXAQASCO_xT4cOZZ_Pg=w1920-h912)

## Manual de implantação
Para a execução do projeto, deve-se instalar o orquestrador de containers [Docker](https://www.docker.com/)

Após realizar a instalação, basta abrir um terminal (CMD) e posicioná-lo no diretório principal do projeto
Para posicionar o terminal deve-se seguir este exemplo:
```bash
cd C:\Users\seuUsuario\Documents\GitHub\projeto-equoterapia
```
Após posicionar, basta executar o seguinte comando:
```bash
docker-compose up --build
```





