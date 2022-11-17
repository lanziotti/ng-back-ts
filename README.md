# API RESTful que simula pequenas operações financeiras
Projeto feito para aplicação no processo seletivo para uma vaga de Desenvolvedor Backend Júnior.

## Tecnologias
- NodeJS
  - Express
  - Nodemon
  - PG
  - Dotenv
  - Cors
  - Knex
  - Bcrypt
  - Jsonwebtoken
  - Zod
  - Date-fns
  - Ts-node
- TypeScript
- PostgreSQL
  
## Features
- Cadastrar Usuário
- Fazer Login 
- Autentificação do Usuário Logado
- Validações do token
- Consulta de Saldo do Usuário Logado
- Fazer uma Transferência
- Consulta do Extrato do Usuário Logado
- Filtragem das Transações do Usuário Logado

## Como rodar o projeto
Abra o vsCode ou o editor de código de sua preferência na pasta desejada. Em seguida, abra o terminal. Com ele aberto, faça o clone do projeto do repostório (link está no final dessa documentação) na sua máquina. Após isso, caminhe para a pasta `ng-back-ts` e, no terminal, execute o comando `npm i`. Com isso feito, aparecerá uma pasta de nome `node_modules` no projeto. Logo em seguida, crie um arquivo na raíz do projeto com o nome `.env`. Copie o conteúdo do arquivo `.env.example` (que já está contido no projeto) e cole dentro desse arquivo `.env` criado anteriormente. Em seguida, adiocione para `PORT=` o número 3000 (PORT=3000). Para a variável `HASH_JWT=` coloque qualquer conjunto de caracteres que preferir. A variável `DB_DATABASE` deverá ser preenchida com o nome que você deu para o seu banco de dados. Já para as demais variáveis que começam com `DB`, terá de ser inserido valores de acordo com os dados do seu banco de dados PostgreSQL. A imagem abaixo auxilia na adição dos respectivos valores: 

![Logo do projeto](https://github.com/lanziotti/ng-back-ts/blob/master/imageBeekeeper.png)

Após ter atribuido todos esses valores para suas respectivas variáveis e de ter criado o seu banco de dados, crie as tabelas exatamente como estão contidas no arquivo `dump.sql` do projeto, para isso você pode usar o Beekeeper Studio ou até mesmo qualquer outro de sua preferência.
Feito tudo isso, abra novamente o terminal e execute o comando `npm run dev`. Após isso, finalmente, pode-se testar a funcionalidade dos endpoints conforme explicado logo abaixo.

## Endpoints
#### `POST` `/user`
Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

Input:
```javascript
{
    "username": "tadeu",
    "passwordUser": "Tadeu123"
}
```

Output:
```javascript
{
    "id": 12,
    "username": "tadeu",
    "accountid": 12
}
```

Output inválido (Exemplos):
```javascript
[
	{
		"mensagem": "Todos os campos são obrigatórios."
	}
]
```
```javascript
[
	{
		"mensagem": "O USERNAME precisa ter, no mínimo, 3 caracteres."
	}
]
```
```javascript
[
	{
		"mensagem": "A SENHA precisa ter, no mínimo, 8 caracteres."
	}
]
```
```javascript
[
	{
		"mensagem": "A SENHA precisa ter pelo menos uma LETRA MAIÚSCULA."
	}
]
```
```javascript
[
	{
		"mensagem": "A SENHA precisa ter pelo menos um NÚMERO."
	}
]
```

#### `POST` `/login`
Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

Input:
```javascript
{
    "username": "pedrojose",
    "passwordUser": "12345678"
}
```

Output:
```javascript
{
	"user": {
		"id": 7,
		"username": "pedrojose",
		"accountid": 7
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY4NjM3MDM0LCJleHAiOjE2Njg3MjM0MzR9.FOHiAo7NtthcJxAIA_0XPTz2P3zJB8pU-Bh5a2cDXXE"
}
```

Output inválido:
```javascript
{
    "mensagem": "USERNAME e/ou SENHA inválidos."
}
```


## **OBS**: Todas os endpoints a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade há a validação do token informado.



#### `GET` `/user/balance`
Essa é a rota que será chamada quando o usuário quiser obter o saldo (balance) disponível na sua conta.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
    "id": 7,
    "balance": 5200
}
```

Output inválido:
```javascript
{
    "mensagem": "Não autorizado. Por favor, efetue o login."
}
```

#### `POST` `/transfer`
Essa é a rota que será chamada quando o usuário quiser realizar uma transferência bancária para outro usuário. 

Input:
```javascript
{
    "username": "pedropedreira",
    "valueTransaction": 1800
}
```

Output:
```javascript
{
	"id": 19,
	"debitedaccountid": 7,
	"creditedaccountid": 6,
	"valuetransaction": "1800",
	"createdat": "2022-11-17T03:00:00.000Z"
}
```

Output inválido (Exemplos):
```javascript
{
    "mensagem": "Usuário de origem não encontrado. Por favor, faça novamente o login."
}
```
```javascript
{
    "mensagem": "Não existe usuário com uma conta bancária cadastrada com esse USERNAME. Por favor, verifique se digitou corretamente."
}
```
```javascript
{
    "mensagem": "Não é possível fazer uma transferência para a sua própria conta."
}
```

#### `GET` `/user/extract`
Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output (exemplos):
```javascript
[
	{
		"id": 13,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 14,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 15,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 16,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 18,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	},
	{
		"id": 19,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	},
	{
		"id": 17,
		"debitedaccountid": 2,
		"creditedaccountid": 7,
		"valuetransaction": "800",
		"createdat": "2022-11-16T03:00:00.000Z"
	}
]
```

```javascript
[]
```

## **OBS**: No endpoint a seguir (filtragem das transferências) o usuário logado poderá filtrar suas transferências por ENVIADAS (cash-out), RECEBIDAS (cash-in) ou por data de efetuação, sendo que a sua escolha do tipo de filtragem é feita pelos parâmetros de query na rota.


### - Exemplo 1:
#### `GET` `/user/search?debitedAccountNumber=7`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas tranferências enviadas (cash-out). 

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output (exemplos):
```javascript
[
	{
		"id": 13,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 14,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 15,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 16,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "500",
		"createdat": "2022-11-16T03:00:00.000Z"
	},
	{
		"id": 18,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	},
	{
		"id": 19,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	}
]
```

```javascript
[]
```

### - Exemplo 2:
#### `GET` `/user/search?creditedAccountNumber=7`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas tranferências recebidas (cash-in).

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
[
	{
		"id": 17,
		"debitedaccountid": 2,
		"creditedaccountid": 7,
		"valuetransaction": "800",
		"createdat": "2022-11-16T03:00:00.000Z"
	}
]
```

```javascript
[]
```

### - Exemplo 3:
#### `GET` `/user/search?date=2022-11-17`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas tranferências enviadas (cash-out) ou recebidas (cash-in) pela data de efetuação.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
[
	{
		"id": 18,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	},
	{
		"id": 19,
		"debitedaccountid": 7,
		"creditedaccountid": 6,
		"valuetransaction": "1800",
		"createdat": "2022-11-17T03:00:00.000Z"
	}
]
```

```javascript
[]
```

### - Exemplos de Output inválido para qualquer que seja a filtragem escolhida pelo usuário:
```javascript
{
    "mensagem": "Esse usuário não existe no banco de dados do sistema."
}
```

```javascript
{
    "mensagem": "O número da sua conta bancária está INCORRETO. Por favor insira o número CORRETO."
}
```

## Links
- Repositório: https://github.com/lanziotti/ng-back-ts

## Contatos
- Email: rodrigolanziotti@yahoo.com.br
- LinkedIn: https://www.linkedin.com/in/rodrigo-lanziotti-16a64966/

## Versão
1.0.0

## Autor
**Rodrigo Lanziotti de Freitas**

#

Obrigado por visitar meu repositório...😎

...fique a vontade para entrar em contato quando quiser! 😉
