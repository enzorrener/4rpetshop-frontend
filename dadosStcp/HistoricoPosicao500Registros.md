Histórico de Posições (500 Registros)
Serviço – Histórico de Posições (500 Registros)

Revisão – 07/10/2020

 

Serviço – Histórico de Posições (500 Registros)

Esse serviço é responsável pela listagem das últimas 500 posições (sem endereço) de um veículo associado à um login assim como as informações de sua posição.

A busca pode ser feita para um único veículo ou todos os veículos da conta. Você também poderá informar um número sequencial único para pegar as próximas 500 posições (sem endereço) a partir daquele id.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/getVehiclePositionsByLimit500

 

Parâmetros - Abaixo são listados os parâmetros que deverão ser enviados para consumo do serviço.

 

Parâmetros

Tipo

Descrição

key (obrigatório)

string (length=30)

Chave para acesso aos serviços de integração. Solicite a chave para o suporte.

user (obrigatório)	string	Usuário webcliente
pass (obrigatório)	string	Senha webcliente(Convertida em MD5)
plate	string	Informe uma placa específica ou nada para retornarem todos os veículos.
positionId	string	Informe um sequencial inicial ou nada para retornarem os últimos 500.
satelital	boolean	true para buscar por ID satelital ou false caso contrário
 

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",   
  "pass": "e725df0794b817f84db1e813c3512b21",
  "plate": "ABC1234",
  "positionId": "1424"
}
 

Resposta - Após o envio dos dados para listagem das posições juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
deviceId	int 	Identificador do dispositivo
deviceModel	string	Modelo do dispositivo
plate	string	Placa do veículo
date	date	Data GPS da posição
positionId	int	Identificador da posição (sequencial único)
ignition	string	Status da ignição (ON, OFF)
speed	int	Velocidade em Km/h
odometer	string	Odômetro em metros
horimeter	string	Horímetro em minutos
latitude	string	Latitude da posição
longitude	string	Longitude da posição
gpsFix	string	Indicador do status do GPS 1 - Com GPS; 0 - Sem GPS ou vazio se não disponível  
originPosition	string	Indicador da origem da posição
isLbs	int	1 - Posição Lbs; 0 - Posição GPS
direction	string	Direção do veículo em graus (Sendo (0º e 360º) norte e 180º sul)
mainBattery	int	Bateria principal do veículo (V)
backupBattery	string	Bateria backup do dispositivo
batteryPercentual	string	Porcentagem da bateria do dispositivo
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
        "deviceModel": "ST390",
        "deviceId": 123456,
        "positionId": 123456,
        "date": "2020-01-01 00:00:00",
        "ignition": "ON",
        "odometer": "5",
        "horimeter": "000063",
        "address": "",
        "direction": "064.91",
        "header": "STT",
        "gpsFix": "1",
        "speed": "0",
        "mainBattery": "12.61",
        "backupBattery": "4.06",
        "latitude": "-22.847178",
        "longitude": "-47.08351",
        "driverName": "",
        "driverId": "00000000000123",
        "input1": "0",
        "input2": "0",
        "output1": "0",
        "output2": "0",
        "rs232": "",
        "isLbs": 1,
        "mcc": "724",
        "mnc": "05",
        "cell": "3911",
        "lac": "3019",
        "rxlvl": "-83",
        "ta": "7",
        "nBrCellId1": null,
        "nBrCellId2": null,
        "nBrCellId3": null,
        "nBrCellId4": null,
        "nBrCellId5": null,
        "nBrCellId6": null,
        "originPosition": "Com GPS",
        "batteryPercentual": "100%"
      }
   ]
}
 

Informações de Recurso

Taxas Limitadas?

20 segundos

Autenticação

Requer contexto do usuário

Formatos de resposta

json

Método

POST

Protocolo

HTTP / HTTPS

Objeto de Resposta

Histórico de posições

Versão da API

1.0.0