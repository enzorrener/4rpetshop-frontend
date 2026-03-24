Veículos última posição
Serviço – Veículos última posição

Revisão – 28/09/2018

 

Serviço – Veículos última posição

Esse serviço é responsável pela listagem de todos os veículos associados ao login, assim como as informações de sua última posição.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/getClientVehicles

 

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
 

Resposta - Após o envio dos dados para listagem dos veículos juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
vehicleId	int 	Identificador do veículo
plate	string	Placa do veículo
label	string	Rótulo
positionId	int	Identificador da posição (sequencial único)
date	date	Data GPS da posição
systemDate	date	Data em que a posição chegou ao servidor
ignition	string	Status da ignição (ON, OFF)
speed	int	Velocidade em Km/h
output1	string	Status da saída 1 (ON, OFF)
output2	string	Status da saída 2 (ON, OFF)
latitude	string	Latitude da última posição
longitude	string	Longitude da última posição
address	string	Endereço
deviceId	int	Identificador do dispositivo
mainBattery	string	Bateria principal do veículo (V)
backupBattery	string	Bateria backup do dispositivo (V)
driverId	string	ID do motorista (somente com ibutton ou dispositivos para leitura)
vehicleType	int	Tipo do veículo
odometer	string	Odômetro em metros
horimeter	string	Horímetro em minutos
rpm	string	RPM (somente com modelos de dispositivos que reportam essa informação)
temp1	string	Temperatura do sensor 1 em ºC (somente com dispositivos de temperatura integrados)
temp2	string	Temperatura do sensor 2 em ºC (somente com dispositivos de temperatura integrados)
temp3	string	Temperatura do sensor 3 em ºC (somente com dispositivos de temperatura integrados)
direction	string	Direção do veículo em graus (Sendo (0º e 360º) norte e 180º sul)
 

 

As informações são retornadas no formato Json.

 

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "data": [
        {
            "vehicleId": 4,
            "plate": "ABC1234",
            "label": "Carro da Frota A",
            "positionId": 16145844,
            "date": "2018-09-26 11:19:27",
            "systemDate": "2018-09-26 11:20:01",
            "ignition": "OFF",
            "speed": "0",
            "output1": "OFF",
            "output2": "OFF",
            "latitude": "-22.846837",
            "longitude": "-47.083258",
            "address": "ALAMEDA PRAÇA CAPITAL - LOT. CENTER SANTA GENEBRA, CAMPINAS - SP, 13080-650",
            "deviceId": 123456,
            "mainBattery": "13.10",
            "backupBattery": "4.1",
            "driverId": "1F00CA1221AA31",
            "vehicleType": 5,
            "odometer": "61747659",
            "horimeter": "085059",
            "rpm": "1000",
            "temp1": "30",
            "temp2": "22",
            "temp3": "14",
            "direction": "000.00"
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

Lista de veículos

Versão da API

1.0.0