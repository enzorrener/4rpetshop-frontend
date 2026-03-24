Enviar Comandos
Serviço – Enviar Comandos

Revisão – 09/12/2019

 

Serviço – Enviar Comandos

Esse serviço é responsável pelo envio de comandos para um dispositivo do cliente.

Os comandos permitidos são os de habilitar e desabilitar as saídas 1 e 2 do rastreador e também o de solicitar posição(somente equipamentos suntech).

Os dados enviados pelo solicitante são processados pelo Web Service e a listagem retornada em formato Json. Para que o processo seja realizado com sucesso, o solicitante deve possuir uma chave de integração fornecido pela STC.

 

uri – ws/sendCommands

 

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
command	string	Comando a ser enviado (Lista abaixo)
commandValue	Int	Valor do comando (Apenas comando de odômetro e serial)
 

Enable1 - Habilitar saída 1
Disable1 - Desabilitar saída 1
Enable2 - Habilitar saída 2
Disable2 - Desabilitar saída 1
SetOdometer - Ajustar Odômetro
serialCommand - Enviar comando pela serial do rastreador
 

Exemplo de envio:

{
  "key": "17bfae24cd65753c0a577e8f65a405cf",
  "user": "stc",
  "pass": "e725df0794b817f84db1e813c3512b21",
  "plate": "ABC1234",
  "command": "Enable1"
}
 

Resposta - Após o envio dos dados para listagem das posições juntamente com a chave, o Web Service irá processar os dados, validar e retornar a resposta para a transação.

Parâmetros	Tipo 	Descrição
success	bolean	 
error	numeric (length=1)	Identificador do erro
msg	String	Mensagem do erro
data	string	Resposta
 

As informações são retornadas no formato Json.

 

Exemplo de sucesso:

{
    "success": true,
    "error": 0,
    "msg": "Comando solicitado com sucesso",
    "data": "Enable1"
}
 

Informações de Recurso

Taxas Limitadas?

Não

Autenticação

Requer contexto do usuário

Formatos de resposta

json

Método

POST

Protocolo

HTTP

Objeto de Resposta

Envio de comandos

Versão da API

1.0.0