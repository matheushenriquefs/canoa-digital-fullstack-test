/**
 * Inicializando o data tables com uma variavel global para efetuar as operacoes
 * de mostrar informacoes, deletar e atualizar
 */

let globalVeiculoId;
function initializeDataTables(){
    $("#dataTable").DataTable({
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
      },
      ajax: {
        url: "http://localhost:49152/veiculos",
        dataSrc: "",
        type: "GET",

        /**
         * Pega as informacoes contidas na tabela, atribui a um objeto e popula
         * o modal de informacoes com os dados do objeto
         * @param {Object} data - objeto que contem as informacoes da tabela
         */
        
        data: function(data){
          setTimeout(function(){
            $(".btnModalInfo").on("click", function(){
              $("#modalVeiculoLabel").text("Info veículo");

              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;
              data.ano = this.parentNode.parentNode.children[3].innerText;
              data.descricao = this.parentNode.parentNode.children[4].innerText;
              data.vendido = this.parentNode.parentNode.children[5].innerText;

              globalVeiculoId = data.id;

              populateInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"], data, "btnModalInfo");
            });
          }, 1500);

          /**
           * Pega as informacoes contidas na tabela, atribui a um objeto e popula
           * o modal de edicao com os dados do objeto
           * @param {Object} data - objeto que contem as informacoes da tabela
           */

          setTimeout(function(){
            $(".btnModalEditar").on("click", function(){
              $("#modalVeiculoLabel").text("Editar veículo");
              $("#btnEditarVeiculo").removeClass("d-none");
              $("#btnAdicionarVeiculo").addClass("d-none");

              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;
              data.ano = this.parentNode.parentNode.children[3].innerText;
              data.descricao = this.parentNode.parentNode.children[4].innerText;
              data.vendido = this.parentNode.parentNode.children[5].innerText;

              globalVeiculoId = data.id;

              populateInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"], data, "btnModalEditar");
            });
          }, 1500);
          
          /**
           * Pega as informacoes contidas na tabela, atribui a um objeto e popula
           * o modal de remocao com os dados do objeto
           * @param {Object} data - objeto que contem as informacoes da tabela
           */

          setTimeout(function(){
            $(".btnModalDeletar").on("click", function(){
              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;

              globalVeiculoId = data.id;
        
              $("#marcaVeiculoText").text(data.marca.concat(" ", data.veiculo));
            });
          }, 1500);
        }
      },
      columns:[
        {
          data: "_id",
          visible: true,
          targets: 0,
          render: function (data, type, full, meta){
            return  data;
          }
        },
        {
          data: "veiculo",
          visible: true,
          targets: 1,
          className: "text-center compact nowrap",
          render: function (data, type, full, meta){
            return  data;
          }
        },
        {
          data: "marca",
          visible: true,
          targets: 2,
          className: "text-center compact nowrap",
          render: function (data, type, full, meta){
            return  data;
          }
        },
        {
          data: "ano",
          visible: true,
          targets: 3,
          className: "text-center",
          render: function (data, type, full, meta){
            return  data;
          }
        },
        {
          data: "descricao",
          visible: true,
          targets: 4,
          className: "text-center text-truncate texto-descricao",
          render: function (data, type, full, meta){
            return  data;
          }
        },
        {
          data: "vendido",
          visible: true,
          targets: 5,
          className: "text-center",

          /**
           * Mostra o status do veiculo de uma maneira mais legivel ao usuario
           */

          render: function (data, type, full, meta){
            if(data === false){
              return  "Não";
            }else{
              return "Sim";
            }
          }
        },
        {
          data: "created_at",
          visible: true,
          targets: 6,
          className: "text-center",
         
          /**
           * Mostra a data de adicao do veiculo de uma maneira mais legivel ao usuario
           */

          render: function (data, type, full, meta){
            let date = new Date(data);
            let formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
            return formattedDate.join("/");
          }
        },
        {
          data: "update_at",
          visible: true,
          targets: 7,
          className: "text-center",

          /**
           * Mostra a data de atualizacao do veiculo de uma maneira mais legivel ao usuario
           */

          render: function (data, type, full, meta){
            let date = new Date(data);
            let formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
            return formattedDate.join("/");
          }
        },
        {
          data: "update_at",
          visible: true,
          targets: 8,
          className: "acoes text-center",

          /**
           * Insere em cada linha da tabela os botoes de info, edicao e remocao
           */
          
          render: function (data, type, full, meta){
            return '<button class="btn btn-info btn-icon-split btn-acoes mb-2 btnModalInfo" data-toggle="modal" data-target="#modalVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-info"></i></span><span class="text text-white">Info</span></button>' + 
            '<button class="btn btn-warning btn-icon-split btn-acoes mb-2 btnModalEditar" data-toggle="modal" data-target="#modalVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-edit"></i></span><span class="text text-white">Editar</span></button>' +
            '<button class="btn btn-danger btn-icon-split btn-acoes btnModalDeletar" data-toggle="modal" data-target="#modalDeletarVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-trash"></i></span><span class="text text-white">Deletar</span></button>'
          }
        }
      ]
    });
  };