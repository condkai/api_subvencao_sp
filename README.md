# SGV - API

Reference:
@github/AlexViderman idea from heroku in node.js
* git clone https://github.com/AlexViderman/heroku-selenium.git


## Funções:

###### buscarInspecaoID/:id

> Realiza a busca do numero de `inspecao_id` pelo numero do `workflow_id`.

*Exemplo:*

```
 http://localhost:14000/buscarInspecaoID/8466623

```

###### listarWFID/

> Realiza a busca do numero de `workflow_id` na tabela DTGInstancia.

>  `?atividade=` deve ser usado na chamado.

*Exemplo:*

```
 http://localhost:14000/listarWFID/?atividade=Validação da pré-valorização

```


###### selecao/

>  `?wf_id=` deve ser usado na chamado.

>  `?inspecao_id=` deve ser usado na chamado.

>  `?nome_empresa=` deve ser usado na chamado.

*Exemplo:*

```
 http://localhost:14000/selecao/?wf_id=8466623&inspecao_id=403134&nome_empresa=COOPERATIVA DE VISTORIADORES DO SUL DO BRASIL LTDA - RS, PELOTAS

```