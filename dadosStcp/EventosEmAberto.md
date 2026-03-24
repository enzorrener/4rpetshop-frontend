Eventos em aberto
Serviço – Eventos em aberto

Revisão – 29/06/2020

 

Serviço – Eventos em aberto

Esse serviço é responsável pela listagem dos eventos abertos dos veículos associados ao login.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/getClientEvents

 

Parâmetros - Abaixo são listados os parâmetros que deverão ser enviados para consumo do serviço.

 

Parâmetros

Tipo

Descrição

key(obrigatório)

string (length=30)

Chave para acesso aos serviços de integração.

user(obrigatório)	string	Usuário webcliente
pass(obrigatório)	string	Senha webcliente(Convertida em MD5)
eventId	string	Sequencial inicial do Evento
 

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "eventId": "1120"
}
 

Resposta - Após o envio dos dados para listagem dos eventos juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
eventId	int 	Identificador do evento (sequencial único)
date	date	Data GPS do evento
licensePlate	string	Placa do veículo
label	string	Rótulo
deviceId	int 	Identificador do dispositivo
latitude	string	Latitude do evento
longitude	string	Longitude do evento
speed	int	Velocidade em Km/h
mainBattery	string	Bateria principal do veículo (V)
odometer	string	Odômetro em metros
complement	string	Complemento do evento
description	string	Descrição do evento
address	string	Endereço
eventStatus	string	Status do evento (A=aberto,T=em tratamento)
driverId	string	ID do motorista (somente com ibutton ou dispositivos para leitura)
ignition	string	Estado da ignição no momento do evento (ON, OFF)
input1	string	Status entrada 1
input2	string	Status entrada 2
output1	string	Status saída 1
output2	string	Status saída 2
eventRef	string	Tipo de acionamento de evento*
 

*Tabela de tipos de acionamento de evento

 

Tipo	Id	Descrição
300ALT	70	Ultrapassou Limite Vel. na Chuva
300ALT	71	Voltou ao Limite Vel. na Chuva
300ALT	72	Voltou ao Limite Vel. Sem Chuva
300ALT	73	Ultrapassou Limite Vel. na Cerca
300ALT	74	Voltou ao Limite Vel. na Cerca
400ALT	1	Jammer detectado
400ALT	2	Abertura do Box
400ALT	3	Emerg. de outro dispositivo
400ALT	4	Presença nao detectada
400ALT	5	Presença recuperada
400ALT	6	Botão de Pânico
400ALT	7	Iniciado envio de comando RF
400ALT	8	Parado envio de comando RF
400ALT	9	Emerg. do dispositivo procurado
910	1	Houve Movimentacao
910	2	Portatil - Botao de Panico
910	3	Portatil - Baixa Tensao na Bateria
910	5	Portátil - Saiu da Cerca Virtual
910	56	Conectou na Base Magnetic
910	57	Desconectou na Base Magnetic
910	58	Portatil - Baixa Tensao na Bateria
910	6	Portátil - Entrou na Cerca Virtual
910	72	Desligado pelo botão power
ALT	1	Ultrapassou Limite Velocidade
ALT	10	Saiu de Sleep Mode
ALT	100	Entrou no Check-point
ALT	101	Saiu do Check-point
ALT	102	Fora da Rota
ALT	103	TimeOut Id. Motorista - Inicio Viag
ALT	104	TimeOut Id. Motorista - Fim Viag
ALT	105	Dentro Area Controle - Antecipado
ALT	106	Dentro Area Controle - Prz.Previsto
ALT	107	Dentro Area Controle - Atrasado
ALT	13	Erro na Bateria Backup
ALT	14	Bateria com Baixa Tensao
ALT	15	Choque
ALT	16	Colisao
ALT	2	Voltou ao Limite de Velocidade
ALT	3	Antena GPS desconectada
ALT	33	Ligou Ignicao
ALT	34	Desligou Ignicao
ALT	4	Antena GPS reconectada
ALT	40	Bateria Principal Conectada
ALT	41	Bateria Principal Desconectada
ALT	44	Bateria Interna Conectada
ALT	45	Bateria Interna Desconectada
ALT	46	Aceleracao brusca
ALT	47	Freada brusca
ALT	48	Curva acentuada
ALT	5	Saiu da Cerca Virtual
ALT	50	Deteccao de Jammer
ALT	59	I-Button / RFID Inserido
ALT	6	Entrou na Cerca Virtual
ALT	60	I-Button / RFID Removido
ALT	61	Tempo parado excedido motor ligado
ALT	62	Tempo parado excedido
ALT	63	Ponto Morto
ALT	64	RPM excedido
ALT	65	Calibracao RPM concluida
ALT	66	Calibracao Odometro concluida
ALT	67	Calibracao Odometro concluida-2
ALT	68	Calibracao DPA concluida
ALT	72	Emerg. de outro dispositivo
ALT	73	Ausencia do dispositivo de Presenca
ALT	74	Detectado Dispositivo de Presenca
ALT	8	Curto na Antena GPS
ALT	9	Entrou em Sleep Mode
EMG	1	Botao de Panico
EMG	10	Ausencia do dispositivo de Presenca
EMG	11	Emergencia por GPRS ou SMS
EMG	12	Emergencia por Jammer
EMG	2	Em Movimento com Ignicao Desligada
EMG	3	Remocao da Bateria Principal
EMG	5	Anti-furto acionado
EMG	6	Anti-furto acionado (porta)
EMG	7	Violacao de Descanso
EMG	8	Anti-furto acionado (choque)
EMG	9	Emergencia por RF
EVT	1	Entrada 1 aterrada
EVT	100	Excedeu Tempo Parado
EVT	101	Manutencao 90%
EVT	102	Manutencao 100%
EVT	103	Perda de Sinal GPRS
EVT	104	Separacao do Comboio
EVT	105	Temp. Insuflamento fora do limite
EVT	106	Temp. Retorno fora do limite
EVT	107	Umidade do ar fora do limite
EVT	108	Sem Comunicacao
EVT	2	Entrada 1 em aberto
EVT	3	Entrada 2 aterrada
EVT	4	Entrada 2 em aberto
EVT	5	Entrada 3 aterrada
EVT	6	Entrada 3 em aberto
 

As informações são retornadas no formato Json.

 

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "data": [
        {
            "eventId": 1424,
            "date": "2018-09-26 09:15:18",
            "licensePlate": "DXA9578",
            "label": "Carro da frota A",
            "deviceId": 123456,
            "latitude": "-22.847158",
            "longitude": "-47.083506",
            "speed": "0",
            "mainBattery": "13.07",
            "odometer": "61783255",
            "input1": "0",
            "input2": "0",
            "output1": "0",
            "output2": "0",
            "complement": "",
            "eventRef": "ALT_9",
            "description": "Entrou em Sleep Mode",
            "eventStatus": "A",
            "address": "ALAMEDA PRAÇA CAPITAL - LOT. CENTER SANTA GENEBRA, CAMPINAS - SP, 13080-650",
            "driverId": "",
            "ignition": "ON"
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

Lista de eventos

Versão da API

1.0.0