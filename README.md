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

Ao iniciar o container pela primeira vez será criada uma pasta dados-mysql, portanto todas as informações do banco de dados serão salvas neste diretório. Caso o container seja apagado por algum motivo, todas as informações já enviadas ao banco de dados estarão salvas.

## Diagramas
- Entidade Relacionamento
![Diagrama_ER](https://lh3.googleusercontent.com/u/2/drive-viewer/AK7aPaBv8yOVrXXhnhc-MXyptPMuzc3VxEB5zR-XCm-nBSQxgRBWDUYLDIZLZ2HPWvB00HrIQB_u8uUYXAQASCO_xT4cOZZ_Pg=w1920-h912)

## Manual de implantação
Para a execução do projeto, deve-se instalar o orquestrador de containers [Docker](https://www.docker.com/)

Também deve ser instalado o [Java_18](https://jdk.java.net/java-se-ri/18)

Basta abrir um terminal (CMD) e posicioná-lo no diretório principal do projeto
Para posicionar o terminal deve-se seguir este exemplo:
```bash
cd C:\Users\seuUsuario\Documents\GitHub\projeto-equoterapia
```

Primeiro deve-se acessar a pasta do backend com o comando
```bash
cd backend
```
Executar a construção do projeto com Maeven, para que ele seja gerado corretamente.
```bash
mvnw clean install
```
Então voltar para o diretório anterior
```bash
cd ..
```
Após isso, basta executar o seguinte comando:
```bash
docker-compose up --build
```





