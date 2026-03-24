Histórico Posições
Serviço – Histórico Posições

Revisão – 29/06/2020

 

Serviço – Histórico Posições

Esse serviço é responsável pela listagem das últimas 50 posições de um veículo associado à um login assim como as informações de sua posição.

A busca pode ser feita para um único veículo ou todos os veículos da conta. Você também poderá informar um número sequencial único para pegar as próximas 50 posições a partir daquele id.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/getVehiclePositions

 

Parâmetros - Abaixo são listados os parâmetros que deverão ser enviados para consumo do serviço.

 

Parâmetros

Tipo

Descrição

key(obrigatório)

string (length=30)

Chave para acesso aos serviços de integração.

user(obrigatório)	string	Usuário webcliente
pass(obrigatório)	string	Senha webcliente(Convertida em MD5)
plate	string	Placa do veículo
positionId	string	Sequencial inicial da posição
 

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "plate": "ABC1234"
  "positionId": "1424"
}
 

Resposta - Após o envio dos dados para listagem das posições juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
deviceId	int 	Identificador do dispositivo
plate	string	Placa do veículo
date	date	Data GPS da posição
positionId	int	Identificador da posição (sequencial único)
ignition	string	Status da ignição (ON, OFF)
speed	int	Velocidade em Km/h
odometer	string	Odômetro em metros
horimeter	string	Horímetro em minutos
latitude	string	Latitude da posição
longitude	string	Longitude da posição
address	string	Endereço
direction	string	Direção do veículo em graus (Sendo (0º e 360º) norte e 180º sul)
mainBattery	int	Bateria principal do veículo (V)
driverName	string	Nome do motorista (somente com ibutton ou dispositivos para leitura)
rs232	string	Dados trafegados pela rs232 (somente alguns modelos de rastreadores)
driverId	string	ID do motorista (somente com ibutton ou dispositivos para leitura)
input1	string	Stauts entrada 1
input2	string	Status entrada 2
output1	string	Status saída 1
output2	string	Status saída 2
 

 

As informações são retornadas no formato Json.

 

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "data": [
        {
            "plate": "ABC1234",
            "deviceId": 1234,
            "positionId": 1426,
            "date": "2018-09-27 11:15:12",
            "ignition": "OFF",
            "odometer": "61783255",
            "horimeter": "085120",
            "address": "ALAMEDA PRAÇA CAPITAL - LOT. CENTER SANTA GENEBRA, CAMPINAS - SP, 13080-650",
            "direction": "000.00",
            "speed": "0",
            "mainBattery": "13.10",
            "latitude": "-22.847178",
            "longitude": "-47.08351",
            "driverName": "",
            "driverId": "",
            "input1": "0",
            "input2": "0",
            "output1": "0",
            "output2": "0",
            "rs232": ""
        },
        {
            "plate": "ABC1234",
            "deviceId": 123456,
            "positionId": 1425,
            "date": "2018-09-27 10:15:12",
            "ignition": "OFF",
            "odometer": "61783255",
            "horimeter": "085120",
            "address": "ALAMEDA PRAÇA CAPITAL - LOT. CENTER SANTA GENEBRA, CAMPINAS - SP, 13080-650",
            "direction": "000.00",
            "speed": "0",
            "mainBattery": "13.13",
            "latitude": "-22.847169",
            "longitude": "-47.083507",
            "driverName": "",
            "driverId": "",
            "input1": "0",
            "input2": "0",
            "output1": "0",
            "output2": "0",
​            "rs232": ""
        }
    ]
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

Histórico de posições

Versão da API

1.0.0