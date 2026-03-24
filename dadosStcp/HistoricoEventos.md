Histórico Eventos
Serviço – Histórico Eventos

Revisão – 28/05/2021

 

Serviço – Histórico Eventos

Esse serviço é responsável pela listagem dos últimos 50 eventos de um veículo associado à um login assim como as informações de sua posição.

A busca pode ser feita para um único veículo ou todos os veículos da conta. Você também poderá informar um número sequencial único para pegar os próximos 50 eventos a partir daquele id.

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/getVehicleEvents

 

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
eventId	string	Sequencial inicial do Evento
 

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "plate": "ABC1234",
  "eventId": "1120"
}
 

Resposta - Após o envio dos dados para listagem das posições juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
deviceId	int 	Identificador do dispositivo
plate	string	Placa do veículo
date	date	Data GPS da posição
eventId	int	Identificador do evento (sequencial único)
speed	string	Velocidade em Km/h
odometer	string	Odômetro em metros
latitude	string	Latitude da posição
longitude	string	Longitude da posição
address	string	Endereço
complement	string	Complemento do evento
description	string	Descrição do evento
eventStatus	string	Status do evento (A = em aberto, T = em tratamento)
mainBattery	string	Bateria principal do veículo (V)
driverName	string	Nome do motorista (somente com ibutton ou dispositivos para leitura)
driverId	string	ID do motorista (somente com ibutton ou dispositivos para leitura)
ignition	string	Estado da ignição no momento do evento
eventRef	string	Tipo de acionamento do evento*
input1	string	Status entrada 1
input2	string	Status entrada 2
output1	string	Status saída 1
output2	string	Status saída 2
 

*Tabela de tipos de acionamento de eventos:

 

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
            "eventId": 1122,
            "date": "2018-09-26 09:19:32",
            "plate": "ABC1234",
            "deviceId": 123456,
            "latitude": "-22.846767",
            "longitude": "-47.083274",
            "speed": "0",
            "mainBattery": "13.07",
            "odometer": "61747659",
            "input1": "0",
            "input2": "0",
            "output1": "0",
            "output2": "0",
            "complement": "",
            "eventRef": "ALT_1",
            "description": "Ultrapassou Limite de Velocidade",
            "eventStatus": "A",
            "address": "CONDOMÍNIO PRAÇA CAPITAL - R. ADELAIDE DANIEL DE ALMEIDA, 140 - CENTRO, CAMPINAS - SP",
            "driverId": "",
            "ignition": "ON"
        },
        {
            "eventId": 1121,
            "date": "2018-09-26 08:59:58",
            "plate": "ABC1234",
            "deviceId": 123456,
            "latitude": "-22.846767",
            "longitude": "-47.083274",
            "speed": "0",
            "mainBattery": "12.32",
            "odometer": "61731629",
            "input1": "0",
            "input2": "0",
            "output1": "0",
            "output2": "0",             
            "complement": "",
            "eventRef": "ALT_10",
            "description": "Saiu de Sleep Mode",
            "eventStatus": "A",
            "address": "CONDOMÍNIO PRAÇA CAPITAL - R. ADELAIDE DANIEL DE ALMEIDA, 140 - CENTRO, CAMPINAS - SP",
            "driverId": "",
            "ignition": "OFF"
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

Histórico de eventos

Versão da API

1.0.0