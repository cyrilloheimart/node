> Integrantes
> Angellica Passos
> Cyrillo
> Mayra Garcia
> Rafael Trog

# Convergerimos

[x] O projeto deverá estar em um repositório GIT
[x] Definir rotas e controles modularizados
[x] Utilizar a função map, filter e reduce
[x] Setar o ambiente de desenvolvimento
[x] Adicionar arquivos de configurações no projeto tipo yaml
[x] Tratativas de erro (400 Bad Request)
[x] Publicar o endpoint na nuvem
[x] Testas endpoint app front

## Descrição

O projeto é um estoque de uma concessionaria de carros que tem as rotinas para funcionar e calcular valores.

- GET /estoque - Lista Carros em estoque
- GET /estoque/valor - Calcula o valor total dos carros em estoque
- GET /estoque/buscar/:filtro?s=value - Filtra por qualquer propriedade gravada
- GET /estoque/:modelo/ipva?base=1.5 - Calcula Ipva por modelo de acordo com a base de calculo
- GET /estoque/:id - Busca carro por ID
- GET /estoque/download/:nomeArquivo - Download de foto na pasta storage no servidor
- POST /estoque/upload - Upload de imagens para storage
- POST /estoque/incluir - Inclui carro no estoque
- DELETE /estoque/excluir/:id - Deleta um carro
