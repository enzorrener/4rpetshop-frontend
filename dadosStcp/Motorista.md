Motoristas
Serviço – Motoristas

Revisão – 01/06/2021

 

Serviço – Lista Todos Motoristas

Esse serviço é responsável pela listagem de todos os motoristas associados ao login.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/motorist/getallmotorists

 

Parâmetros - Abaixo são listados os parâmetros que deverão ser enviados para consumo do serviço.

Parâmetros

Tipo

Descrição

key(obrigatório)

string (length=30)

Chave para acesso aos serviços de integração.

user(obrigatório)	string	Usuário webcliente
pass(obrigatório)	string	Senha webcliente(Convertida em MD5)
Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21"
}
 

 

 

As informações são retornadas no formato Json.

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "data": [
        {
            "id": 365,
            "fullName": "Nome Completo",
            "cpf": "",
            "rg": "",
            "fixPhone": "11122",
            "cellPhone": "11989862326",
            "address": "",
            "postalCode": "",
            "number": "",
            "neighborhood": "",
            "city": "",
            "state": null,
            "country": null,
            "ibuttonNumber": "00000009820045",
            "type": 1,
            "cnh": "TesteJornadaccc",
            "cnhValidate": "2021-02-24",
            "sharedDriver": 1,
            "sharedDriverDefault": 1
        }       
    ]
}
Serviço – Buscar Motorista

Esse serviço é responsável pela busca de um unico motorista a busca pode serr feita por nome, cnh ou matrícula  do motorista.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/motorist/getmotorist

Exemplo de envio por nome:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "motorist" : {
     "name": "trecho do nome"
  }
}
Exemplo de envio por cnh:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "motorist" : {
     "cnh": "0326654545"
  }
}
Exemplo de envio por matricula:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "motorist" : {
     "ibuttonNumber": "00000000000152"
  }
}
As informações são retornadas no formato Json.

 

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "data": [
        {
            "id": 365,
            "fullName": "Nome Completo",
            "cpf": "",
            "rg": "",
            "fixPhone": "11122",
            "cellPhone": "11989862326",
            "address": "",
            "postalCode": "",
            "number": "",
            "neighborhood": "",
            "city": "",
            "state": null,
            "country": null,
            "ibuttonNumber": "00000009820045",
            "type": 1,
            "cnh": "TesteJornadaccc",
            "cnhValidate": "2021-02-24",
            "sharedDriver": 1,
            "sharedDriverDefault": 1
        }       
    ]
}
Serviço – Adicionar ou Alterar Motorista

Esse serviço é responsável por salvar e alterar motoristas, para alterar basta manda o id do motorista sem o id sera adicionado um motorista novo.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/motorist/saveorupdate

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "motorists": [
    {
        "fullName": "Nome Completo",
        "cpf": "",
        "rg": "",
        "fixPhone": "11122",
        "cellPhone": "11989862326",
        "address": "",
        "postalCode": "",
        "number": "",
        "neighborhood": "",
        "city": "",
        "state": "SP",
        "country": "Brasil",
        "ibuttonNumber": "000000011112222",
        "type": 1,
        "cnh": "TesteJornadaccc",
        "cnhValidate": "2021-02-24",
        "sharedDriverDefault": 1
     }
   ]
}
Serviço – Remover motorista

Esse serviço é responsável pela remoção do motorista na base de dados.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/motorist/delete

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "motorist" : {
     "id": "3526"
  }
}
Informações de Recurso

Taxas Limitadas?

1 Por minuto

Autenticação

Requer contexto do usuário

Formatos de resposta

json

Método

POST

Protocolo

HTTP

Objeto de Resposta

Lista de veículos

Versão da API

1.0.0

 

Resposta - Após o envio dos dados para listagem dos motorista juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
id	int 	Identificador do motorista
fullName	string	Nome completo
cpf	string	Cadastro pessoa física
rg	string	Registro geral
fixPhone	string	Telefone fixo
cellPhone	string	Telefone móvel
address	string	logradouro
postalCode	string 	Código de endereço postal 
number	string	Numero residência
neighborhood	string	Status da saída 2 (ON, OFF)
city	string	Cidade
state	string	Sigla do estado
country	string	País
ibuttonNumber 	string	Matrícula do motorista
cnh	string	Carteira de habilitação
cnhValidate	string	data validade cnh (YYYY-MM-DD)
sharedDriverDefault 	unt	Motorista compartilhado