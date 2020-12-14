# Solução Trabalho Individual - GCES - 2020/1

[![Actions Status](https://github.com/EzequielDeOliveira/Trabalho-Individual-2020-1/workflows/CI/badge.svg)](https://github.com/EzequielDeOliveira/Trabalho-Individual-2020-1/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

**Matricula**: 16/0119316

**Aluno**: Ezequiel De Oliveira Dos Reis

---

# Containerização
Para  a containerização foi utilizado docker e docker-compose, onde existem 3 containers para divisão do projeto, são eles **api**, **client** e **db**, um para cada parte da aplicação existente no repositório.

Para isso existem dois **Dockerfile**, uma localizado em `/api` e outro em `/client`, já o banco de dados foi utilizado uma imagem postgres, para a comunicação entre banco de dados e api, foi utilizado uma network chamada `api_network`, a senha do banco está como variável de ambiente, por isso é necessário criar um arquivo `.env` contendo a senha do banco chamada de `DATABASE_PASSWORD`.

por exemplo: 

```
DATABASE_PASSWORD=password
```

foi utilizado um volume no docker-compose chamado db, pros arquivos temporários do banco de dados, sobre o mapeamento dos containers é importante ressaltar o mapeamento da pasta `node_modules` que é mantida para não reinstalar todas as depêndencias desnecessáriamente.

# Integração contínua
Sobre a integração contínua foi a utilizada a ferramenta disponibilizada pelo próprio githue que é o ***github CI***, por padrão o script para o CI fica em `.github/workflows`, lá temos o script em `ci.yml`, esse script foi feito de forma que atendesse as necessidades do projeto, dividindo por projeto, uma pipeline para a api e uma para o client, porém no geral temos `Build Api -> Test Api` e `Build Client -> Test Client`.

Por escolha a branch `master` não está protegida, mas considerando um cenário onde só versões estáveis vão pra master via **Pull Request**, o ci é executado reagindo a **push** e **pull request** na branch master.

para qualidade de código foi utilizado o code climate, que também e responsável pela cobertura de teste, porém por ser dois projetos diferentes, a cobertura de código não  foi trabalhada usando o code climate.

# Deploy continuo
Para o deploy continuo, duas ferramentas foram utilizadas, novamente ***Github CI*** e agora ***Digital Ocean*** por conta do acesso para estudantes concedido pelo pacote do github, nesse caso foi adicionada mais uma etapada para o CI, quando a branch `master`recebe uma ação de ***push*** a versão de produção recebe a atualização. 

Para isso funcionar bem foi criada a máquina na ***Digital Ocean***, devidamente configurada, e lá temos um script chamado `deploy.sh` então quando a master recebe um ***push***, uma chamada usando uma chave ssh e feita para a máquina, executando o script de atualização, as informações necessárias para se comunicar com a máquina estão guardados por uma forma de variável de ambiente, usada pelo github actions, ficam na aba ***secrets*** do repósitorio.

# Execução do projeto
Para executar todo o projeto você presica seguir o passos abaixo:

```docker-compose up```

Isso já sobe nosso projeto, porém precisamos criar o banco usado pelo rails, como é inicializado só uma vez, percebi que não faria tanto sentido colocar esse comando no entrypoint, como era na minha primeira tentativa, por esse motivo, pra criar e migrar o banco da api basta esperar o comando anterior ser finalizado e seguir:

```docker-compose exec -T api rake db:create```

```docker-compose exec -T api rake db:migrate```

logo após tudo ser concluido, você podera consultar a aplicação em localhost:

- ***Client***:  `http://localhost:8080`

como é um projeto pequeno, optei por deixar a base da url fixa no ip do deploy no digital ocean ao invés de usar variáveis de ambiente, mas se for necessário usar a api local, basta trocar o **IP** por ***localhost*** na base da do axios, após esssa troca temos:

- ***Api***:  `http://localhost:8080`

# Testes 
Os testes podem ser executados a partir dos comandos:

**Client**:

```sh
docker-compose run --rm client yarn run test:unit
```

**Api**:

```sh
docker-compose run --rm api bundle exec rails test
```

# Deploy
Para acessar o projeto que está rodando em produção basta usar as seguintes URLs:

- ***Client***: [`http://174.138.46.62:8080/`](http://174.138.46.62:8080/)
- ***Api***: [`http://174.138.46.62:3000/`](http://174.138.46.62:3000/)

---

- [GitHub Actions](https://github.com/EzequielDeOliveira/Trabalho-Individual-2020-1/actions)

- [Code Climate](https://codeclimate.com/github/EzequielDeOliveira/Trabalho-Individual-2020-1)