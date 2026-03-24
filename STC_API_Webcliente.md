# 📡 API Webcliente STC — Documentação de Integração

> **Revisão:** 31/05/2021  
> **Versão da API:** 1.0.0  
> **Padrão:** REST | **Formato:** JSON | **Método:** POST

---

## 📌 Índice

1. [Configuração e Autenticação](#1-configuração-e-autenticação)
2. [Estrutura Padrão de Requisição e Resposta](#2-estrutura-padrão-de-requisição-e-resposta)
3. [Rate Limits](#3-rate-limits)
4. [Endpoints Disponíveis](#4-endpoints-disponíveis)
   - [4.1 Veículos — Última Posição](#41-veículos--última-posição)
   - [4.2 Eventos em Aberto](#42-eventos-em-aberto)
   - [4.3 Histórico de Posições (50 registros)](#43-histórico-de-posições-50-registros)
   - [4.4 Histórico de Posições (500 registros)](#44-histórico-de-posições-500-registros)
   - [4.5 Histórico de Eventos](#45-histórico-de-eventos)
   - [4.6 Enviar Comandos](#46-enviar-comandos)
   - [4.7 Motoristas](#47-motoristas)
5. [Tabela de Tipos de Evento (eventRef)](#5-tabela-de-tipos-de-evento-eventref)
6. [Validações e Boas Práticas](#6-validações-e-boas-práticas)
7. [Exemplo de Implementação](#7-exemplo-de-implementação)

---

## 1. Configuração e Autenticação

### 🌐 URL Base

```
http://ap3.stc.srv.br/integration/prod/
```

### 🔐 Autenticação

Todas as requisições exigem os três parâmetros abaixo. A chave de integração (`key`) deve ser solicitada diretamente ao suporte da STC.

| Parâmetro | Tipo            | Obrigatório | Descrição                                      |
|-----------|-----------------|-------------|------------------------------------------------|
| `key`   | string (len=30) | ✅ Sim       | Chave de integração fornecida pela STC          |
| `user`  | string          | ✅ Sim       | Usuário do webcliente                           |
| `pass`  | string          | ✅ Sim       | Senha do webcliente convertida em **MD5**       |

> ⚠️ **Atenção:** A senha deve ser enviada **sempre em formato MD5**. Nunca envie a senha em texto puro.

**Informações que utilizo no login:**
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030"
}
```

---

## 2. Estrutura Padrão de Requisição e Resposta

### Requisição
- **Método:** `POST`
- **Content-Type:** `application/json`
- **Protocolo:** HTTP ou HTTPS

### Resposta — Sucesso
```json
{
  "success": true,
  "error": 0,
  "data": [ ... ]
}
```

### Resposta — Erro
```json
{
  "success": false,
  "error": 1,
  "msg": "Descrição do erro"
}
```

| Campo     | Tipo    | Descrição                                  |
|-----------|---------|--------------------------------------------|
| `success` | boolean | `true` em caso de sucesso                 |
| `error`   | int     | `0` = sem erro; outro valor = código de erro |
| `data`    | array   | Lista de objetos retornados                |
| `msg`     | string  | Mensagem de erro (quando `success = false`) |

---

## 3. Rate Limits

| Endpoint                          | Limite           |
|-----------------------------------|------------------|
| Última posição dos veículos       | 1 req / minuto   |
| Eventos em aberto                 | 1 req / minuto   |
| Histórico de posições (50)        | 1 req / minuto   |
| Histórico de posições (500)       | 1 req / 20 seg   |
| Histórico de eventos              | 1 req / minuto   |
| Enviar comandos                   | Sem limite       |
| Motoristas (todos os endpoints)   | 1 req / minuto   |

> ⚠️ Respeite os rate limits para evitar bloqueios ou erros de autenticação.

---

## 4. Endpoints Disponíveis

---

### 4.1 Veículos — Última Posição

**URI:** `ws/getClientVehicles`  
**Descrição:** Lista todos os veículos do login com dados da última posição registrada.

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030"
}
```

#### Response Fields

| Campo           | Tipo   | Descrição                                                   |
|-----------------|--------|-------------------------------------------------------------|
| `vehicleId`   | int    | Identificador do veículo                                    |
| `plate`       | string | Placa do veículo                                            |
| `label`       | string | Rótulo/nome do veículo                                      |
| `positionId`  | int    | ID sequencial único da posição                              |
| `date`        | date   | Data GPS da posição                                         |
| `systemDate`  | date   | Data de chegada da posição ao servidor                      |
| `ignition`    | string | Status da ignição: `ON` ou `OFF`                        |
| `speed`       | int    | Velocidade em Km/h                                          |
| `output1`     | string | Status da saída 1: `ON` ou `OFF`                        |
| `output2`     | string | Status da saída 2: `ON` ou `OFF`                        |
| `latitude`    | string | Latitude                                                    |
| `longitude`   | string | Longitude                                                   |
| `address`     | string | Endereço completo                                           |
| `deviceId`    | int    | Identificador do dispositivo rastreador                     |
| `mainBattery` | string | Bateria principal em Volts                                  |
| `backupBattery`| string | Bateria backup em Volts                                    |
| `driverId`    | string | ID do motorista (iButton/RFID — quando disponível)          |
| `vehicleType` | int    | Tipo do veículo                                             |
| `odometer`    | string | Odômetro em metros                                          |
| `horimeter`   | string | Horímetro em minutos                                        |
| `rpm`         | string | RPM (dispositivos compatíveis)                              |
| `temp1/2/3`   | string | Temperatura dos sensores em ºC (dispositivos compatíveis)   |
| `direction`   | string | Direção em graus (0°/360° = Norte, 180° = Sul)              |

#### Exemplo de Resposta
```json
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
      "address": "ALAMEDA PRAÇA CAPITAL - CAMPINAS - SP, 13080-650",
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
```

---

### 4.2 Eventos em Aberto

**URI:** `ws/getClientEvents`  
**Descrição:** Lista todos os eventos em aberto ou em tratamento dos veículos do login.

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030",
  "eventId": "1120"
}
```

| Parâmetro  | Tipo   | Obrigatório | Descrição                                         |
|------------|--------|-------------|---------------------------------------------------|
| `eventId`| string | ❌ Não       | Sequencial inicial do evento (para paginação)     |

#### Response Fields

| Campo          | Tipo   | Descrição                                              |
|----------------|--------|--------------------------------------------------------|
| `eventId`    | int    | ID único do evento                                     |
| `date`       | date   | Data GPS do evento                                     |
| `licensePlate`| string| Placa do veículo                                      |
| `label`      | string | Rótulo do veículo                                      |
| `deviceId`   | int    | ID do dispositivo                                      |
| `latitude`   | string | Latitude                                               |
| `longitude`  | string | Longitude                                              |
| `speed`      | int    | Velocidade em Km/h                                     |
| `mainBattery`| string | Bateria principal (V)                                  |
| `odometer`   | string | Odômetro em metros                                     |
| `complement` | string | Complemento do evento                                  |
| `description`| string | Descrição legível do evento                            |
| `address`    | string | Endereço                                               |
| `eventStatus`| string | Status: `A` = Aberto, `T` = Em tratamento         |
| `driverId`   | string | ID do motorista                                        |
| `ignition`   | string | Ignição no momento do evento: `ON` ou `OFF`        |
| `input1/2`   | string | Status das entradas                                    |
| `output1/2`  | string | Status das saídas                                      |
| `eventRef`   | string | Código do tipo de evento (ver Tabela de Eventos)       |

---

### 4.3 Histórico de Posições (50 registros)

**URI:** `ws/getVehiclePositions`  
**Descrição:** Retorna as últimas 50 posições de um veículo específico ou de todos os veículos. Suporta paginação pelo `positionId`.

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030",
  "plate": "ABC1234",
  "positionId": "1424"
}
```

| Parâmetro     | Tipo   | Obrigatório | Descrição                                             |
|---------------|--------|-------------|-------------------------------------------------------|
| `plate`     | string | ❌ Não       | Placa do veículo (omitir retorna todos)               |
| `positionId`| string | ❌ Não       | Sequencial inicial para paginação                     |

#### Response Fields

| Campo        | Tipo   | Descrição                                            |
|--------------|--------|------------------------------------------------------|
| `deviceId` | int    | ID do dispositivo                                    |
| `plate`    | string | Placa                                                |
| `positionId`| int   | ID sequencial único da posição                       |
| `date`     | date   | Data GPS                                             |
| `ignition` | string | Ignição: `ON` ou `OFF`                           |
| `speed`    | int    | Velocidade em Km/h                                   |
| `odometer` | string | Odômetro em metros                                   |
| `horimeter`| string | Horímetro em minutos                                 |
| `latitude` | string | Latitude                                             |
| `longitude`| string | Longitude                                            |
| `address`  | string | Endereço completo                                    |
| `direction`| string | Direção em graus                                     |
| `mainBattery`| int  | Bateria principal (V)                                |
| `driverName`| string| Nome do motorista (quando disponível)               |
| `driverId` | string | ID do motorista                                      |
| `rs232`    | string | Dados da serial RS232 (modelos compatíveis)          |
| `input1/2` | string | Status das entradas                                  |
| `output1/2`| string | Status das saídas                                   |

---

### 4.4 Histórico de Posições (500 registros)

**URI:** `ws/getVehiclePositionsByLimit500`  
**Descrição:** Retorna as últimas 500 posições **sem o campo endereço**. Inclui dados extras de diagnóstico LBS (rede celular).

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030",
  "plate": "ABC1234",
  "positionId": "1424",
  "satelital": true
}
```

| Parâmetro     | Tipo    | Obrigatório | Descrição                                              |
|---------------|---------|-------------|--------------------------------------------------------|
| `plate`     | string  | ❌ Não       | Placa (omitir retorna todos)                           |
| `positionId`| string  | ❌ Não       | Sequencial inicial para paginação                      |
| `satelital` | boolean | ❌ Não       | `true` = busca por ID satelital                      |

#### Campos adicionais (além dos do endpoint de 50 registros)

| Campo              | Descrição                                                  |
|--------------------|------------------------------------------------------------|
| `deviceModel`    | Modelo do dispositivo rastreador                           |
| `gpsFix`         | `1` = com GPS; `0` = sem GPS                          |
| `isLbs`          | `1` = posição LBS (celular); `0` = posição GPS        |
| `originPosition` | Descrição textual da origem da posição                     |
| `backupBattery`  | Bateria backup (V)                                         |
| `batteryPercentual`| Percentual de carga da bateria                           |
| `mcc`, `mnc`, `cell`, `lac` | Dados de rede celular para LBS             |

---

### 4.5 Histórico de Eventos

**URI:** `ws/getVehicleEvents`  
**Descrição:** Retorna os últimos 50 eventos de um veículo ou todos. Suporta paginação pelo `eventId`.

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030",
  "plate": "ABC1234",
  "eventId": "1120"
}
```

| Parâmetro   | Tipo   | Obrigatório | Descrição                                  |
|-------------|--------|-------------|--------------------------------------------|
| `plate`   | string | ❌ Não       | Placa (omitir retorna todos os veículos)   |
| `eventId` | string | ❌ Não       | Sequencial inicial para paginação          |

**Response Fields:** mesmo estrutura do endpoint Eventos em Aberto, com adição de `driverName`.

---

### 4.6 Enviar Comandos

**URI:** `ws/sendCommands`  
**Descrição:** Envia comandos remotos para o rastreador. Permite controlar saídas e ajustar odômetro.

#### Request Body
```json
{
  "key": "0e2a0c3a8ee7b5ecd805195f6bd98ca4",
  "user": "teste",
  "pass": "102030",
  "plate": "ABC1234",
  "command": "Enable1",
  "commandValue": 0
}
```

| Parâmetro      | Tipo   | Obrigatório | Descrição                                           |
|----------------|--------|-------------|-----------------------------------------------------|
| `plate`      | string | ✅ Sim       | Placa do veículo                                    |
| `command`    | string | ✅ Sim       | Comando a enviar (ver lista abaixo)                 |
| `commandValue`| int   | ⚠️ Condicional | Necessário apenas para `SetOdometer` e `serialCommand` |

#### Comandos disponíveis

| Comando          | Descrição                                              |
|------------------|--------------------------------------------------------|
| `Enable1`      | Habilitar saída 1                                      |
| `Disable1`     | Desabilitar saída 1                                    |
| `Enable2`      | Habilitar saída 2                                      |
| `Disable2`     | Desabilitar saída 2                                    |
| `SetOdometer`  | Ajustar odômetro (informar valor em `commandValue`)  |
| `serialCommand`| Enviar comando pela serial do rastreador               |

#### Exemplo de Resposta
```json
{
  "success": true,
  "error": 0,
  "msg": "Comando solicitado com sucesso",
  "data": "Enable1"
}
```

---

### 4.7 Motoristas

#### 4.7.1 Listar Todos os Motoristas
**URI:** `ws/motorist/getallmotorists`

```json
{
  "key": "...",
  "user": "...",
  "pass": "..."
}
```

---

#### 4.7.2 Buscar Motorista
**URI:** `ws/motorist/getmotorist`

Busca por **nome**, **CNH** ou **matrícula (ibuttonNumber)**:

```json
// Por nome:
{ "key": "...", "user": "...", "pass": "...", "motorist": { "name": "trecho do nome" } }

// Por CNH:
{ "key": "...", "user": "...", "pass": "...", "motorist": { "cnh": "0326654545" } }

// Por matrícula:
{ "key": "...", "user": "...", "pass": "...", "motorist": { "ibuttonNumber": "00000000000152" } }
```

---

#### 4.7.3 Adicionar ou Alterar Motorista
**URI:** `ws/motorist/saveorupdate`

> Para **alterar**, inclua o campo `id`. Para **adicionar**, omita o `id`.

```json
{
  "key": "...",
  "user": "...",
  "pass": "...",
  "motorists": [
    {
      "fullName": "Nome Completo",
      "cpf": "000.000.000-00",
      "rg": "",
      "fixPhone": "1133334444",
      "cellPhone": "11999998888",
      "address": "Rua Exemplo",
      "postalCode": "00000-000",
      "number": "100",
      "neighborhood": "Bairro",
      "city": "Cidade",
      "state": "SP",
      "country": "Brasil",
      "ibuttonNumber": "000000011112222",
      "type": 1,
      "cnh": "00000000000",
      "cnhValidate": "2025-12-31",
      "sharedDriverDefault": 1
    }
  ]
}
```

#### Campos do objeto motorista

| Campo                 | Tipo   | Descrição                               |
|-----------------------|--------|-----------------------------------------|
| `id`                | int    | ID do motorista (apenas para alteração) |
| `fullName`          | string | Nome completo                           |
| `cpf`               | string | CPF                                     |
| `rg`                | string | RG                                      |
| `fixPhone`          | string | Telefone fixo                           |
| `cellPhone`         | string | Celular                                 |
| `address`           | string | Logradouro                              |
| `postalCode`        | string | CEP                                     |
| `number`            | string | Número                                  |
| `neighborhood`      | string | Bairro                                  |
| `city`              | string | Cidade                                  |
| `state`             | string | Sigla do estado (ex: SP)                |
| `country`           | string | País                                    |
| `ibuttonNumber`     | string | Matrícula / número do iButton           |
| `cnh`               | string | Número da CNH                           |
| `cnhValidate`       | string | Validade da CNH no formato YYYY-MM-DD   |
| `sharedDriverDefault`| int  | Motorista compartilhado (1 = sim)       |

---

#### 4.7.4 Remover Motorista
**URI:** `ws/motorist/delete`

```json
{
  "key": "...",
  "user": "...",
  "pass": "...",
  "motorist": { "id": "3526" }
}
```

---

## 5. Tabela de Tipos de Evento (eventRef)

O campo `eventRef` é composto por um **prefixo** e um **número**, separados por `_` (ex: `ALT_1`).

### Prefixo ALT — Alertas

| eventRef  | Descrição                              |
|-----------|----------------------------------------|
| ALT_1     | Ultrapassou Limite Velocidade           |
| ALT_2     | Voltou ao Limite de Velocidade          |
| ALT_3     | Antena GPS desconectada                 |
| ALT_4     | Antena GPS reconectada                  |
| ALT_5     | Saiu da Cerca Virtual                   |
| ALT_6     | Entrou na Cerca Virtual                 |
| ALT_8     | Curto na Antena GPS                     |
| ALT_9     | Entrou em Sleep Mode                    |
| ALT_10    | Saiu de Sleep Mode                      |
| ALT_13    | Erro na Bateria Backup                  |
| ALT_14    | Bateria com Baixa Tensão                |
| ALT_15    | Choque                                  |
| ALT_16    | Colisão                                 |
| ALT_33    | Ligou Ignição                           |
| ALT_34    | Desligou Ignição                        |
| ALT_40    | Bateria Principal Conectada             |
| ALT_41    | Bateria Principal Desconectada          |
| ALT_44    | Bateria Interna Conectada               |
| ALT_45    | Bateria Interna Desconectada            |
| ALT_46    | Aceleração brusca                       |
| ALT_47    | Freada brusca                           |
| ALT_48    | Curva acentuada                         |
| ALT_50    | Detecção de Jammer                      |
| ALT_59    | I-Button / RFID Inserido                |
| ALT_60    | I-Button / RFID Removido                |
| ALT_61    | Tempo parado excedido (motor ligado)    |
| ALT_62    | Tempo parado excedido                   |
| ALT_63    | Ponto Morto                             |
| ALT_64    | RPM excedido                            |
| ALT_100   | Entrou no Check-point                   |
| ALT_101   | Saiu do Check-point                     |
| ALT_102   | Fora da Rota                            |

### Prefixo EMG — Emergências

| eventRef  | Descrição                              |
|-----------|----------------------------------------|
| EMG_1     | Botão de Pânico                        |
| EMG_2     | Em Movimento com Ignição Desligada     |
| EMG_3     | Remoção da Bateria Principal           |
| EMG_5     | Anti-furto acionado                    |
| EMG_6     | Anti-furto acionado (porta)            |
| EMG_7     | Violação de Descanso                   |
| EMG_8     | Anti-furto acionado (choque)           |
| EMG_9     | Emergência por RF                      |
| EMG_10    | Ausência do dispositivo de Presença    |
| EMG_11    | Emergência por GPRS ou SMS             |
| EMG_12    | Emergência por Jammer                  |

### Prefixo EVT — Eventos de Entrada/Saída

| eventRef  | Descrição                              |
|-----------|----------------------------------------|
| EVT_1     | Entrada 1 aterrada                     |
| EVT_2     | Entrada 1 em aberto                    |
| EVT_3     | Entrada 2 aterrada                     |
| EVT_4     | Entrada 2 em aberto                    |
| EVT_100   | Excedeu Tempo Parado                   |
| EVT_101   | Manutenção 90%                         |
| EVT_102   | Manutenção 100%                        |
| EVT_103   | Perda de Sinal GPRS                    |
| EVT_104   | Separação do Comboio                   |
| EVT_108   | Sem Comunicação                        |

---

## 6. Validações e Boas Práticas

### ✅ Checklist antes de implementar

- [ ] Solicitar a **chave de integração** (`key`) ao suporte da STC
- [ ] Confirmar credenciais (`user` e `pass`) do webcliente
- [ ] Garantir que a senha seja convertida em **MD5** antes do envio
- [ ] Definir o **Content-Type** da requisição como `application/json`
- [ ] Implementar controle de **rate limit** para não ultrapassar o limite por endpoint
- [ ] Sempre verificar o campo `success` antes de processar o `data`

### 🔒 Segurança

- Nunca exponha a `key` ou `pass` em código client-side (frontend)
- Armazene as credenciais em variáveis de ambiente (ex: `.env`)
- A senha deve ser convertida para MD5 no servidor, nunca no cliente

### 📄 Paginação

- Os endpoints de histórico suportam paginação via `positionId` ou `eventId`
- Envie o último ID recebido para buscar o próximo lote de registros
- Omitir o parâmetro retorna sempre os registros mais recentes

### 🕐 Rate Limit

- Implemente um intervalo de pelo menos **1 minuto** entre chamadas aos endpoints limitados
- Para o endpoint de 500 posições, aguarde pelo menos **20 segundos**
- Utilize filas ou agendadores (cron) para gerenciar o polling

---

## 7. Exemplo de Implementação

### Converter senha para MD5 (Node.js)

```javascript
const crypto = require('crypto');

function hashMD5(senha) {
  return crypto.createHash('md5').update(senha).digest('hex');
}
```

### Classe de configuração base

```javascript
const STC_CONFIG = {
  baseUrl: 'http://ap3.stc.srv.br/integration/prod/',
  key: process.env.STC_KEY,
  user: process.env.STC_USER,
  pass: hashMD5(process.env.STC_PASS),
};
```

### Exemplo de requisição — Última posição dos veículos

```javascript
async function getVehicles() {
  const response = await fetch(`${STC_CONFIG.baseUrl}ws/getClientVehicles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key: STC_CONFIG.key,
      user: STC_CONFIG.user,
      pass: STC_CONFIG.pass,
    }),
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(`Erro STC: ${json.msg || json.error}`);
  }

  return json.data;
}
```

### Exemplo de requisição — Enviar comando

```javascript
async function sendCommand(plate, command, commandValue = null) {
  const body = {
    key: STC_CONFIG.key,
    user: STC_CONFIG.user,
    pass: STC_CONFIG.pass,
    plate,
    command,
  };

  if (commandValue !== null) body.commandValue = commandValue;

  const response = await fetch(`${STC_CONFIG.baseUrl}ws/sendCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return await response.json();
}

// Uso:
sendCommand('ABC1234', 'Enable1');
sendCommand('ABC1234', 'SetOdometer', 61747659);
```

---

## 📊 Resumo dos Endpoints

| Serviço                          | URI                                  | Rate Limit   |
|----------------------------------|--------------------------------------|--------------|
| Última posição dos veículos      | `ws/getClientVehicles`             | 1/min        |
| Eventos em aberto                | `ws/getClientEvents`               | 1/min        |
| Histórico de posições (50)       | `ws/getVehiclePositions`           | 1/min        |
| Histórico de posições (500)      | `ws/getVehiclePositionsByLimit500` | 1/20s        |
| Histórico de eventos             | `ws/getVehicleEvents`              | 1/min        |
| Enviar comandos                  | `ws/sendCommands`                  | Sem limite   |
| Listar motoristas                | `ws/motorist/getallmotorists`      | 1/min        |
| Buscar motorista                 | `ws/motorist/getmotorist`          | 1/min        |
| Salvar/alterar motorista         | `ws/motorist/saveorupdate`         | 1/min        |
| Remover motorista                | `ws/motorist/delete`               | 1/min        |

---

*Documentação gerada com base na API Webcliente STC — Versão 1.0.0*
