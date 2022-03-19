# Turing Bot

O Turing Bot é um projeto colaborativo do grupo [Programação Web para Iniciantes (Além do Código)](https://t.me/alemdocodigo).

Este projeto consiste em um bot para o Telegram criado pelos participantes para gerenciar o próprio grupo.

## Instalação
Para instalar o Turing Bot, é necessário ter o node versão 11 ou superior.
Outra dependência do Turing Bot é o MongoDB. Ele é um sistema de banco de dados não relacional, de fácil instalação e utilização.
Utiliza JSON como sintaxe, tornando muito simples a manipulação de dados.

A escolha do MongoDB se deu pela baixa curva de aprendizagem, e pelo fato de não ser necessário estruturar o banco de dados antes da utilização do bot.

Mais informações sobre o MongoDB podem ser encontradas na [Documentação Oficial do MongoDB](https://docs.mongodb.com/manual/) (em inglês).

A primeira coisa que precisa ser feita para rodar o projeto é instalar suas dependências.
Este passo pode ser feito de forma muito simples. No diretório do projeto, rode o seguinte comando:

    $ npm install

## Uso

Com o projeto pronto para ser executado, basta rodar o comando que o fará rodar:

    $ npm start

Se a seguinte frase aparecer, significa que o projeto está rodando:

    Turing Bot listening on port 3000

A porta informada pode variar de acordo com sua configuração do arquivo .env (maiores explicações abaixo).

## Descrição das Dependências

### Express
O express é um framework para o node.js que facilita o trabalho com requisições (requests) e respostas (responses) HTTP.
Com ele é possível definir quais verbos HTTP serão enviados pra quais rotas dentro do aplicativo, além de definir de forma simples as respostas que a aplicação enviará.

### Body Parser
O Body Parser é um middleware, ou seja, atua entre a requisição em si e o express.
Ele faz a leitura de tudo o que é enviado no corpo da requisição , faz o tratamento necessário e adiciona como atributos.
No caso de um bot Telegram, ele precisa converter tudo o que é enviado para JSON, para que possamos saber exatamente o que está sendo solicitado ao Bot.

### dotenv
O dotenv permite criar arquivos .env definindo alguns parâmetros do bot.
Assim fica fácil alterarmos os parâmetros de acordo com nossas necessidades, seja pra testar em vários ambientes ou pra criar novos bots com base neste repositório.

Este projeto contém um exemplo de arquivo .env para que sua criação seja simples para qualquer pessoa que deseje contribuir com o projeto.
Ele está localizado na raíz do projeto e chama-se .env.example

### node-fetch
O node-fetch permite que o bot faça requisições HTTP.
Ele é usado na library do Telegram e as requisições são feitas à API de bots do Telegram.
