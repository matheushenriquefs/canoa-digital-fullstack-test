# Teste desenvolvedor Full Stack :computer:

Este teste tem como finalidade o desenvolvimento de uma API RESTful para cadastro, edição, visualização e exclusão de uma base de veículos. Assim como uma interface paraconsumo desta API.

## Canoa Digital :boat:

<img src="https://scontent.fcgh32-1.fna.fbcdn.net/v/t1.0-9/p960x960/30688807_2006043029612621_4476086028217614336_o.png?_nc_cat=111&_nc_ohc=tSDIK_uKIVcAX_q4Js0&_nc_ht=scontent.fcgh32-1.fna&oh=59afe61c9b4bf5e3b822c94d1a2f4f4a&oe=5EF6B816" alt="Canoa Digital Logo" width="480">

### Sobre a empresa :office:

A Canoa Digital (ex-Wengo) é uma empresa líder de mídia no mercado latino-americano no campo esotérico, operando mercados digitais (Astrocentro e Ayuda Mística) para monetização de coaching de vida, astrologia e leituras psíquicas.

## Tecnologias/Bibliotecas :rocket:

* Front-end
  * HTML5 
  * CSS3
  * JavaScript/JQuery
  * Data Tables

* Back-end
  * Node.JS
  * Express
  * MongoDB
  * Mongoose

## Aviso :heavy_exclamation_mark: :heavy_exclamation_mark: :heavy_exclamation_mark:

Para que a aplicação funcione em seu navegador é necessário iniciar o Apache e o MongoDB localmente. Isso pode ser feito por meio de softwares como o **WAMP**, **XAMPP** ou **Laragon**.
* WAMP: (http://www.wampserver.com/en/)
* XAMPP: (https://www.apachefriends.org/pt_br/index.html)
* Laragon: (https://laragon.org/)
* MongoDB: (https://www.mongodb.com/)

## Instalação :hammer_and_wrench:

1. Clone o repositório para sua pasta **www** (WAMP, Laragon), **htdocs** (XAMPP) ou sua pasta de preferência.
1. Abra o CMD ou Terminal e navegue até a pasta do projeto.
1. Execute o comando `npm start`.
1. Abra seu navegador e na barra de endereços digite: `http://localhost/canoa-digital-fullstack-test/index.html`.

## Estrutura de arquivos :file_folder:
```bash
canoa-digital-fullstack-test
├── api
│   ├── controllers
│   │   └── controller.js
│   ├── models
│   │   └── model.js
│   ├── routes
│   │   └── routes.js
│   └── server.js
├── css
│   └── custom-styles.css
├── img
│   └── canoa-digital-logo.png
├── js
│   ├── actions.js
│   ├── custom-styles.js
│   ├── data-tables.js
│   ├── main.js
│   ├── requests.js
│   ├── tooltips.js
│   ├── utils.js
│   └── validations.js
├── lib
│   ├── main.css
│   └── main.js
├── node_modules
├── scss
├── vendor
├── index.html
├── gulpfile.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── .browserslistrc
├── .travis.yml
└── .gitignore
```

### Detalhando a estrutura :open_file_folder:

No desenvolvimento desta aplicação foi usado um template Bootstrap de dashboard com integração com o plugin JQuery Data Tables.
Todos os arquivos de terceiros (***.css, ***.js) estão dentro da pasta **vendor**.<br>
Na pasta **api** encontra-se o *server.js* que contém todas as configurações da API em si, como conecção ao banco de dados, definição de porta, etc...<br><br>
Dentro da **api** há a pasta *controllers*, *models* e *routes*, cada um contendo seu respectivo arquivo de configuração (controllers definindo os metodos *CRUD*, models o schema do veiculo utilizado pelo Mongoose e routes definindo os endpoints da API).<br><br>
Na pasta **css** há o *custom-styles.css*, que contém algumas estilizações com os os devidos vendor prefixes adicionados onde necessário. Este arquivo se encontra na pasta **lib** porém minificado e com o nome de *main.css* (este é o css que é efetivamente carregado pela página).<br><br>
A pasta **js** contém os seguintes arquivos: *actions.js*, *custom-styles.js*, *data-tables.js*, *main.js*, *requests.js*, *tooltips.js*, *utils.js* e *validations.js*. Os outros arquivos funcionam como módulos e compõem o *main.js*, este por sua vez sem os comentários que há nos "módulos". Este arquivo encontra-se minificado na pasta **lib** com o nome de *main.js*.
