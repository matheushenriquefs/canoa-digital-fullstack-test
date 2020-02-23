$(document).ready(function(){
  let globalVeiculoId;

  function clearInputs(inputs, action){
    for(let val of inputs){
      $("#" + val).removeClass("border-success");
      $("#" + val).removeClass("border-danger");
      $("#" + val).val("");
      $("#" + val + "Text").removeClass("text-success");
      $("#" + val + "Text").removeClass("text-danger");
      $("#" + val + "Text").text("");
    }
    $("#input" + action + "VendidoNao").prop("checked", true);
  }

  function populateInputs(inputs, obj, action){
    let array = [];
    if(action === "Info"){
      for(let val in obj){
        if(val !== "id"){
          array.push(obj[val]);
        }
      }
      for(let i = 0; i <= inputs.length; i++){
        if(array[i] === "Sim"){
          $("#input" + action + "VendidoSim").removeAttr("disabled");
          $("#input" + action + "VendidoSim").prop("checked", true);
          $("#input" + action + "VendidoNao").attr("disabled", "");
        }else{
          $("#input" + action + "VendidoNao").removeAttr("disabled");
          $("#input" + action + "VendidoNao").prop("checked", true);
          $("#input" + action + "VendidoSim").attr("disabled", "");
        }
        $("#" + inputs[i]).attr("placeholder", array[i]);
      }
    }else if(action === "Editar"){
      let array = [];
      for(let val in obj){
        if(val !== "id" && val !== "update_at"){
          array.push(obj[val]);
        }
      }
      for(let i = 0; i <= inputs.length; i++){
        if(array[i] === "Sim"){
          $("#input" + action + "VendidoSim").prop("checked", true);
        }else{
          $("#input" + action + "VendidoNao").prop("checked", true);
        }
        $("#" + inputs[i]).val(array[i]);
      }
    }
  }
  
  function initializeDataTables(){
    $("#dataTable").DataTable({
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
      },
      ajax: {
        url: "http://localhost:49152/veiculos",
        dataSrc: "",
        type: "GET",
        data: function(data){
          setTimeout(function(){
            $(".btnModalInfo").on("click", function(){

              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;
              data.ano = this.parentNode.parentNode.children[3].innerText;
              data.descricao = this.parentNode.parentNode.children[4].innerText;
              data.vendido = this.parentNode.parentNode.children[5].innerText;

              globalVeiculoId = data.id;

              populateInputs(["inputInfoVeiculo", "inputInfoMarca", "inputInfoAno", "inputInfoDescricao"], data, "Info");
            });
          }, 500);

          setTimeout(function(){
            $(".btnModalEditar").on("click", function(){

              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;
              data.ano = this.parentNode.parentNode.children[3].innerText;
              data.descricao = this.parentNode.parentNode.children[4].innerText;
              data.vendido = this.parentNode.parentNode.children[5].innerText;

              globalVeiculoId = data.id;

              populateInputs(["inputEditarVeiculo", "inputEditarMarca", "inputEditarAno", "inputEditarDescricao"], data, "Editar");
            });
          }, 500);
          

          setTimeout(function(){
            $(".btnModalDeletar").on("click", function(){
              data.id = this.parentNode.parentNode.children[0].innerText;
              data.veiculo = this.parentNode.parentNode.children[1].innerText;
              data.marca = this.parentNode.parentNode.children[2].innerText;

              globalVeiculoId = data.id;
        
              $("#marcaVeiculoText").text(data.marca.concat(" ", data.veiculo));
            });
          }, 500);
        }
      },
      ordering: false,
      columns:[
        {
          data: "_id",
          visible: true,
          searchable: false,
          targets: 0,
          className: "d-none",
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
          render: function (data, type, full, meta){
            let date = new Date(data);
            let formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
            return formattedDate.join("/");
          }
        },
        {
          data: "update_at",
          visible: true,
          searchable: false,
          targets: 8,
          className: "acoes text-center",
          render: function (data, type, full, meta){
            return '<button class="btn btn-info btn-icon-split btn-acoes mb-2 btnModalInfo" data-toggle="modal" data-target="#modalInfoVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-info"></i></span><span class="text text-white">Info</span></button>' + 
            '<button class="btn btn-warning btn-icon-split btn-acoes mb-2 btnModalEditar" data-toggle="modal" data-target="#modalEditarVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-edit"></i></span><span class="text text-white">Editar</span></button>' +
            '<button class="btn btn-danger btn-icon-split btn-acoes btnModalDeletar" data-toggle="modal" data-target="#modalDeletarVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-trash"></i></span><span class="text text-white">Deletar</span></button>'
          }
        }
      ]
    });
  };

  initializeDataTables();

  function refreshTable(){
    $("#dataTable").DataTable().ajax.reload(null, false);
  };

  $("#dataTable").on("page.dt", function(){
    refreshTable();
  });

  function customStyles(){
    setTimeout(function(){
      let btn = document.createElement("button");
      let btnIconColor = document.createElement("span");
      let btnText = document.createElement("span");
      let icon = document.createElement("i");
      let column = document.createElement("div");
      let labels = Array.from(document.getElementsByTagName("label"));
      let searchDiv = document.getElementById("dataTable_filter");
      let lengthDiv = document.getElementById("dataTable_length");
      let searchInputText = searchDiv.children;
      let searchInput = document.getElementsByClassName("form-control")[1];
      let dataTableRow = document.getElementById("dataTable_wrapper").children[0];

      btn.classList.add("btn", "btn-success", "btn-icon-split", "mb-2");
      btn.style.height = "2rem";
      btn.setAttribute("id", "btnModalAdicionar");
      btn.setAttribute("data-toggle", "modal");
      btn.setAttribute("data-target", "#modalAdicionarVeiculo");

      btnIconColor.classList.add("icon", "text-white");

      btnText.classList.add("text", "text-white");
      btnText.innerText = "Adicionar veículo";

      icon.classList.add("fas", "fa-plus");

      column.classList.add("col-sm-12", "col-md-4", "pl-0", "pr-0");
      column.style.display.flex = "flex";
      column.style.justifyContent = "center";

      for(let val of labels){
        val.classList.add("text-wrap");
      }
      labels[0].childNodes[1].textContent = " Itens";

      searchDiv.parentElement.classList.add("pl-0");
      searchDiv.parentElement.classList.remove("col-md-6");
      searchDiv.parentElement.classList.add("col-md-4");

      lengthDiv.parentElement.classList.remove("col-md-6");
      lengthDiv.parentElement.classList.add("col-md-4");

      searchInputText[0].childNodes[0].textContent = "";

      searchInput.classList.add("ml-0", "w-100");
      searchInput.setAttribute("placeholder", "Pesquisar");

      btn.appendChild(btnIconColor);
      btnIconColor.appendChild(icon);
      btn.appendChild(btnText);

      dataTableRow.style.display = "flex";
      dataTableRow.style.justifyContent = "center";

      dataTableRow.insertBefore(column, dataTableRow.children[1]);
      column.appendChild(btn);

      if(screen.width >= 768){
        searchDiv.parentElement.classList.remove("pl-0");
        column.style.display.flex = "flex";
        column.style.justifyContent = "center";
      }
    }, 500);
  };

  customStyles();

  $("#inputAdicionarVeiculo").tooltip({"trigger": "focus", "title": "Um veículo válido NÃO deve conter caracteres especiais"});

  $("#inputAdicionarMarca").tooltip({"trigger": "focus", "title": "Uma marca válida NÃO deve conter caracteres especiais"});

  $("#inputAdicionarAno").tooltip({"trigger": "focus", "title": "Um ano válido NÃO deve conter letras, caracteres especiais ou números negativos"});

  $("#inputAdicionarDescricao").tooltip({"trigger": "focus", "title": "Faça uma breve descrição do veículo"});

  $("#inputEditarVeiculo").tooltip({"trigger": "focus", "title": "Um veículo válido NÃO deve conter caracteres especiais"});

  $("#inputEditarMarca").tooltip({"trigger": "focus", "title": "Uma marca válida NÃO deve conter caracteres especiais"});

  $("#inputEditarAno").tooltip({"trigger": "focus", "title": "Um ano válido NÃO deve conter letras, caracteres especiais ou números negativos"});

  $("#inputEditarDescricao").tooltip({"trigger": "focus", "title": "Faça uma breve descrição do veículo"});


  $("#modalAdicionarVeiculo").on("hidden.bs.modal", function(e){
    clearInputs(["inputAdicionarVeiculo", "inputAdicionarMarca", "inputAdicionarAno", "inputAdicionarDescricao"]);
  });

  $("#modalEditarVeiculo").on("hidden.bs.modal", function(e){
    clearInputs(["inputEditarVeiculo", "inputEditarMarca", "inputEditarAno", "inputEditarDescricao"]);
  });

  function validateInputVeiculoMarca(inputId){
    let inputValue = $("#" + inputId).val().trim().toUpperCase();
    if(inputValue.length < 2){
      $("#" + inputId).removeClass("border-success");
      $("#" + inputId + "Text").removeClass("text-success");

      $("#" + inputId).addClass("border-danger");
      $("#" + inputId + "Text").addClass("text-danger");
      $("#" + inputId + "Text").text("Nome curto demais");
      return false;
    }else if(!inputValue.length >= 2 && !new RegExp(/^[a-zA-Z\u00C0-\u00FF\0-9]*$/).test(inputValue)){
      $("#" + inputId).removeClass("border-success");
      $("#" + inputId + "Text").removeClass("text-success");

      $("#" + inputId).addClass("border-danger");
      $("#" + inputId + "Text").addClass("text-danger");
      $("#" + inputId + "Text").text("Nome inválido");
      return false;
    }else{
      $("#" + inputId).removeClass("border-danger");
      $("#" + inputId + "Text").removeClass("text-danger");

      $("#" + inputId).addClass("border-success");
      $("#" + inputId + "Text").addClass("text-success");
      $("#" + inputId + "Text").text("Nome válido");
      return true;
    }
  }
  
  function validateInputAno(inputId){
    let inputValue = parseInt($("#" + inputId).val().trim());
    if(new RegExp(/^[1-9]\d{3}$/g).test(inputValue)){
      $("#" + inputId).removeClass("border-danger");
      $("#" + inputId + "Text").removeClass("text-danger");

      $("#" + inputId).addClass("border-success");
      $("#" + inputId + "Text").addClass("text-success");
      $("#" + inputId + "Text").text("Ano válido");
      return true;
    }else{
      $("#" + inputId).removeClass("border-success");
      $("#" + inputId + "Text").removeClass("text-success");

      $("#" + inputId).addClass("border-danger");
      $("#" + inputId + "Text").addClass("text-danger");
      $("#" + inputId + "Text").text("Ano inválido");
      return false;
    }
  }
  
  function validateInputDescricao(inputId){
    let inputValue = $("#" + inputId).val().trim();
    if(inputValue.length === 0){
      $("#" + inputId).removeClass("border-success");
      $("#" + inputId + "Text").removeClass("text-success");

      $("#" + inputId).addClass("border-danger");
      $("#" + inputId + "Text").addClass("text-danger");
      $("#" + inputId + "Text").text("Descrição do veículo inválida, ela não pode estar vazia");
      return false;
    }else if(inputValue.length <= 9){
      $("#" + inputId).removeClass("border-success");
      $("#" + inputId + "Text").removeClass("text-success");

      $("#" + inputId).addClass("border-danger");
      $("#" + inputId + "Text").addClass("text-danger");
      $("#" + inputId + "Text").text("Descrição do veículo inválida, ela deve conter mais de 10 caracteres");
    }else{
      $("#" + inputId).removeClass("border-danger");
      $("#" + inputId + "Text").removeClass("text-danger");

      $("#" + inputId).addClass("border-success");
      $("#" + inputId + "Text").addClass("text-success");
      $("#" + inputId + "Text").text("Descrição válida");
      return true;
    }
  }

  $("#inputAdicionarVeiculo").on("keyup", function(){
      validateInputVeiculoMarca("inputAdicionarVeiculo");
  });

  $("#inputAdicionarVeiculo").on("focus", function(){
    validateInputVeiculoMarca("inputAdicionarVeiculo");
  });
  
  $("#inputAdicionarMarca").on("keyup", function(){
      validateInputVeiculoMarca("inputAdicionarMarca");
  });

  $("#inputAdicionarMarca").on("focus", function(){
    validateInputVeiculoMarca("inputAdicionarMarca");
  });
  
  $("#inputAdicionarAno").on("keyup", function(){
      validateInputAno("inputAdicionarAno");
  });

  $("#inputAdicionarAno").on("focus", function(){
    validateInputAno("inputAdicionarAno");
  });
  
  $("#inputAdicionarDescricao").on("keyup", function(){
      validateInputDescricao("inputAdicionarDescricao");
  });

  $("#inputAdicionarDescricao").on("focus", function(){
    validateInputDescricao("inputAdicionarDescricao");
  });

  $("#inputEditarVeiculo").on("keyup", function(){
      validateInputVeiculoMarca("inputEditarVeiculo");
  });

  $("#inputEditarVeiculo").on("focus", function(){
    validateInputVeiculoMarca("inputEditarVeiculo");
  });
  
  $("#inputEditarMarca").on("keyup", function(){
      validateInputVeiculoMarca("inputEditarMarca");
  });

  $("#inputEditarMarca").on("focus", function(){
    validateInputVeiculoMarca("inputEditarMarca");
  });
  
  $("#inputEditarAno").on("keyup", function(){
      validateInputAno("inputEditarAno");
  });

  $("#inputEditarAno").on("focus", function(){
    validateInputAno("inputEditarAno");
  });
  
  $("#inputEditarDescricao").on("keyup", function(){
      validateInputDescricao("inputEditarDescricao");
  });

  $("#inputEditarDescricao").on("focus", function(){
    validateInputDescricao("inputEditarDescricao");
  });

  function getRequestById(id){
    let response = $.ajax({
      url: "http://localhost:49152/veiculos/" + id,
      type: "GET",
    });

    function handleSuccess(){
      console.log("GET request successfully completed: STATUS 200");
    }
    
    function handleError(){
      console.log("POST request failed: STATUS 500");
    }
    
    response.done(handleSuccess).fail(handleError);

    return response;
  };

  function postRequest(obj){
    let response = $.ajax({
      url: "http://localhost:49152/veiculos/",
      type: "POST",
      data: JSON.stringify(obj),
      contentType: "application/json"
    });

    function handleSuccess(){
      console.log("POST request successfully completed: STATUS 200");
      $("#alertSuccessText").text(" O veículo foi adicionado");
      $(".alert-success").css("display", "initial");
      $(".alert-success").addClass("show");

      setTimeout(function(){
        $(".alert-success").removeClass("show");
      }, 3000);
    }
    
    function handleError(){
      console.log("POST request failed: STATUS 500");
      $("#alertDangerText").text(" O veículo não foi adicionado");
      $(".alert-danger").css("display", "initial");
      $(".alert-danger").addClass("show");
      
      setTimeout(function(){
        $(".alert-danger").removeClass("show");
      }, 3000);
    }
    
    response.done(handleSuccess).fail(handleError);

    return response;
  };

  function putRequest(obj){
    let response = $.ajax({
      url: "http://localhost:49152/veiculos/" + obj.id,
      type: "PUT",
      data: JSON.stringify(obj),
      contentType: "application/json"
    });

    function handleSuccess(){
      console.log("PUT request successfully completed: STATUS 200");
      $("#alertSuccessText").text(" O veículo foi atualizado");
      $(".alert-success").css("display", "initial");
      $(".alert-success").addClass("show");

      setTimeout(function(){
        $(".alert-success").removeClass("show");
      }, 3000);
    }
    
    function handleError(){
      console.log("PUT request failed: STATUS 500");
      $("#alertDangerText").text(" O veículo não foi atualizado");
      $(".alert-danger").css("display", "initial");
      $(".alert-danger").addClass("show");
      
      setTimeout(function(){
        $(".alert-danger").removeClass("show");
      }, 3000);
    }

    response.done(handleSuccess).fail(handleError);

    return response;
  };

  function deleteRequest(id){
    let response = $.ajax({
      url: "http://localhost:49152/veiculos/" + id,
      type: "DELETE"
    });

    function handleSuccess(data) {
      console.log("DELETE request successfully completed: STATUS 200");
      $("#alertSuccessText").text(" O veículo foi removido");
      $(".alert-success").css("display", "initial");
      $(".alert-success").addClass("show");

      setTimeout(function(){
        $(".alert-success").removeClass("show");
      }, 3000);
    }
    
    function handleError(error) {
      console.log("DELETE request failed: STATUS 500");
      $("#alertDangerText").text(" O veículo não foi removido");
      $(".alert-danger").css("display", "initial");
      $(".alert-danger").addClass("show");
      
      setTimeout(function(){
        $(".alert-danger").removeClass("show");
      }, 3000);
    }

    response.done(handleSuccess).fail(handleError);

    return response;
  };
  
  $(document).on("click", "#btnAdicionarVeiculo", function(event){
    event.preventDefault();
    if(validateInputVeiculoMarca("inputAdicionarVeiculo") && validateInputVeiculoMarca("inputAdicionarMarca") &&
    validateInputAno("inputAdicionarAno") && validateInputDescricao("inputAdicionarDescricao")){

      let veiculo = $("#inputAdicionarVeiculo").val().trim().toUpperCase();
      let marca = $("#inputAdicionarMarca").val().trim().toUpperCase();
      let ano = parseInt($("#inputAdicionarAno").val());
      let descricao = $("#inputAdicionarDescricao").val().trim().toUpperCase();
      let vendido = false;
  
      if($("#inputAdicionarVendidoSim").is(":checked")){
        vendido = true;
      }

      let created_at = new Date();
      let update_at = new Date();
  
      let obj = {
        veiculo: veiculo,
        marca: marca,
        ano: ano,
        descricao: descricao,
        vendido: vendido,
        created_at: created_at,
        update_at: update_at
      }
  
      postRequest(obj);

      $("#modalAdicionarVeiculo").modal("hide");

      $("#modalAdicionarVeiculo").on("hidden.bs.modal", function(e){
        clearInputs(["inputAdicionarVeiculo", "inputAdicionarMarca", "inputAdicionarAno", "inputAdicionarDescricao"], "Adicionar");
        refreshTable();
      });
    }
  });

  $(document).on("click", "#btnEditarVeiculo", function(event){
    event.preventDefault();
    if(validateInputVeiculoMarca("inputEditarVeiculo") && validateInputVeiculoMarca("inputEditarMarca") &&
    validateInputAno("inputEditarAno") && validateInputDescricao("inputEditarDescricao")){

      let veiculo = $("#inputEditarVeiculo").val().trim().toUpperCase();
      let marca = $("#inputEditarMarca").val().trim().toUpperCase();
      let ano = parseInt($("#inputEditarAno").val());
      let descricao = $("#inputEditarDescricao").val().trim().toUpperCase();
      let vendido = false;
  
      if($("#inputEditarVendidoSim").is(":checked")){
        vendido = true;
      }

      let created_at = getRequestById(globalVeiculoId);

      setTimeout(function(){
        created_at = new Date(created_at.responseJSON.created_at);
        let update_at = new Date();
    
        let obj = {
          id: globalVeiculoId,
          veiculo: veiculo,
          marca: marca,
          ano: ano,
          descricao: descricao,
          vendido: vendido,
          created_at: created_at,
          update_at: update_at
        }

        putRequest(obj);
        
      }, 1000);

      setTimeout(function(){
        refreshTable();
      }, 1100);

      $("#modalEditarVeiculo").modal("hide");

      $("#modalEditarVeiculo").on("hidden.bs.modal", function(e){
        clearInputs(["inputEditarVeiculo", "inputEditarMarca", "inputEditarAno", "inputEditarDescricao"]);
      });
    }
  });

  $("#btnDeletarVeiculo").on("click", function(event){
    event.preventDefault();

    deleteRequest(globalVeiculoId);

    $("#modalDeletarVeiculo").modal("hide");

    $("#modalDeletarVeiculo").on("hidden.bs.modal", function(e){
      refreshTable();
    });
  });

  setTimeout(function(){
    $("#wrapper").removeClass("d-none");
    $("#spinner").addClass("d-none");
  }, 1000);
});
