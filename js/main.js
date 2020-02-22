$(document).ready(function(){
  let globalVeiculoId;

  function clearInputs(inputs){
    for(let val of inputs){
      $("#" + val).removeClass("border-success");
      $("#" + val).removeClass("border-danger");
      $("#" + val).removeClass("bg-white");
      $("#" + val).removeAttr("placeholder");
      $("#" + val).removeAttr("disabled");
      $("#" + val).val("");
      $("#" + val + "Text").removeClass("text-success");
      $("#" + val + "Text").removeClass("text-danger");
      $("#" + val + "Text").text("");
    }
    $("#inputVendidoNao").removeAttr("disabled");
    $("#inputVendidoSim").removeAttr("disabled");
    $("#inputVendidoNao").prop("checked", true);
  }

  function populateInputs(inputs, obj, btnAction){
    let array = [];
    if(btnAction === "btnModalInfo"){
      for(let val in obj){
        if(val !== "id"){
          array.push(obj[val]);
        }
      }
      for(let i = 0; i <= inputs.length; i++){
        if(array[i] === "Sim"){
          $("#inputVendidoSim").removeAttr("disabled");
          $("#inputVendidoSim").prop("checked", true);
          $("#inputVendidoNao").attr("disabled", "");
        }else{
          $("#inputVendidoNao").removeAttr("disabled");
          $("#inputVendidoNao").prop("checked", true);
          $("#inputVendidoSim").attr("disabled", "");
        }
        $("#" + inputs[i]).attr("placeholder", array[i]);
        $("#" + inputs[i]).attr("disabled", "");
        $("#" + inputs[i]).addClass("bg-white");
      }
    }else if(btnAction === "btnModalEditar"){
      let array = [];
      for(let val in obj){
        if(val !== "id" && val !== "update_at"){
          array.push(obj[val]);
        }
      }
      for(let i = 0; i <= inputs.length; i++){
        if(array[i] === "Sim"){
          $("#inputVendidoSim").prop("checked", true);
        }else{
          $("#inputVendidoNao").prop("checked", true);
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
          }, 500);

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
          targets: 8,
          className: "acoes text-center",
          render: function (data, type, full, meta){
            return '<button class="btn btn-info btn-icon-split btn-acoes mb-2 btnModalInfo" data-toggle="modal" data-target="#modalVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-info"></i></span><span class="text text-white">Info</span></button>' + 
            '<button class="btn btn-warning btn-icon-split btn-acoes mb-2 btnModalEditar" data-toggle="modal" data-target="#modalVeiculo"><span style="width: 2.5rem;" class="icon text-white"><i class="fas fa-edit"></i></span><span class="text text-white">Editar</span></button>' +
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
      let idTableHeader = document.getElementsByTagName("th");
      let searchDiv = document.getElementById("dataTable_filter");
      let lengthDiv = document.getElementById("dataTable_length");
      let searchInputText = searchDiv.children;
      let searchInput = document.getElementsByClassName("form-control")[1];
      const dataTableRow = document.getElementById("dataTable_wrapper").children[0];
  
      idTableHeader[0].style.display = "none";
      idTableHeader[9].style.display = "none";
  
      btn.classList.add("btn", "btn-success", "btn-icon-split", "mb-2");
      btn.style.height = "2rem";
      btn.setAttribute("id", "btnModalAdicionar");
      btn.setAttribute("data-toggle", "modal");
      btn.setAttribute("data-target", "#modalVeiculo");
  
      btnIconColor.classList.add("icon", "text-white");
  
      btnText.classList.add("text", "text-white");
      btnText.innerText = "Adicionar veículo";
  
      icon.classList.add("fas", "fa-plus");
  
      column.classList.add("col-sm-12", "col-md-4", "pl-0", "pr-0");
      column.style.display = "flex";
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
      dataTableRow.style.alignItems = "center";
      dataTableRow.insertBefore(column, dataTableRow.children[1]);
      column.appendChild(btn);
  
      if(screen.width >= 768){
        searchDiv.parentElement.classList.remove("pl-0");
        column.style.display = "flex";
        column.style.justifyContent = "center";
      }
    }, 500);
  };

  customStyles();

  $("#inputVeiculo").tooltip({"trigger": "focus", "title": "Um veículo válido NÃO deve conter caracteres especiais"});

  $("#inputMarca").tooltip({"trigger": "focus", "title": "Uma marca válida NÃO deve conter caracteres especiais"});

  $("#inputAno").tooltip({"trigger": "focus", "title": "Um ano válido NÃO deve conter letras, caracteres especiais ou números negativos"});

  $("#inputDescricao").tooltip({"trigger": "focus", "title": "Faça uma breve descrição do veículo"});
  
  setTimeout(function(){
    $("#btnModalAdicionar").on("click", function(){
      $("#modalVeiculoLabel").text("Adicionar veículo");
      $("#btnAdicionarVeiculo").removeClass("d-none");
    });

    $(".btnModalEditar").on("click", function(){
      $("#modalVeiculoLabel").text("Editar veículo");
      $("#btnEditarVeiculo").removeClass("d-none");
    });
  }, 500);

  $("#btnDeletarVeiculo").on("click", function(event){
    event.preventDefault();

    deleteRequest(globalVeiculoId);

    $("#modalDeletarVeiculo").modal("hide");
    $("#modalDeletarVeiculo").on("hidden.bs.modal", function(e){
      refreshTable();
    });
  });

  $("#modalVeiculo").on("hidden.bs.modal", function(e){
    $("#btnAdicionarVeiculo").addClass("d-none");
    $("#btnEditarVeiculo").addClass("d-none");

    clearInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"]);
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

  $("#inputVeiculo").on("keyup", function(){
      validateInputVeiculoMarca("inputVeiculo");
  });

  $("#inputVeiculo").on("focus", function(){
    validateInputVeiculoMarca("inputVeiculo");
  });
  
  $("#inputMarca").on("keyup", function(){
      validateInputVeiculoMarca("inputMarca");
  });

  $("#inputMarca").on("focus", function(){
    validateInputVeiculoMarca("inputMarca");
  });
  
  $("#inputAno").on("keyup", function(){
      validateInputAno("inputAno");
  });

  $("#inputAno").on("focus", function(){
    validateInputAno("inputAno");
  });
  
  $("#inputDescricao").on("keyup", function(){
      validateInputDescricao("inputDescricao");
  });

  $("#inputDescricao").on("focus", function(){
    validateInputDescricao("inputDescricao");
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
    if(validateInputVeiculoMarca("inputVeiculo") && validateInputVeiculoMarca("inputMarca") &&
    validateInputAno("inputAno") && validateInputDescricao("inputDescricao")){

      let veiculo = $("#inputVeiculo").val().toUpperCase();
      let marca = $("#inputMarca").val().toUpperCase();
      let ano = parseInt($("#inputAno").val());
      let descricao = $("#inputDescricao").val().toUpperCase();
      let vendido = false;
  
      if($("#inputVendidoSim").is(":checked")){
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

      $("#modalVeiculo").modal("hide");

      $("#modalVeiculo").on("hidden.bs.modal", function(e){
        clearInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"]);
        refreshTable();
      });
    }
  });

  $(document).on("click", "#btnEditarVeiculo", function(event){
    event.preventDefault();
    if(validateInputVeiculoMarca("inputVeiculo") && validateInputVeiculoMarca("inputMarca") &&
    validateInputAno("inputAno") && validateInputDescricao("inputDescricao")){

      let veiculo = $("#inputVeiculo").val().toUpperCase();
      let marca = $("#inputMarca").val().toUpperCase();
      let ano = parseInt($("#inputAno").val());
      let descricao = $("#inputDescricao").val().toUpperCase();
      let vendido = false;
  
      if($("#inputVendidoSim").is(":checked")){
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

      $("#modalVeiculo").modal("hide");

      $("#modalVeiculo").on("hidden.bs.modal", function(e){
        clearInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"]);
      });
    }
  });
  setTimeout(function(){
    $("#wrapper").removeClass("d-none");
    $("#spinner").addClass("d-none");
  }, 1500);
});