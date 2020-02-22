/**
 * Verifica se os campos estao preenchidos corretamente, pega seus valores
 * cria um objeto com as informacoes, faz uma requisicao post, recarrega
 * os dados da tablela e fecha o modal
 */

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

      refreshTable();

      $("#modalVeiculo").modal("hide");

      $("#modalVeiculo").on("hidden.bs.modal", function(e){
        clearInputs(["inputVeiculo", "inputMarca", "inputAno", "inputDescricao"]);
      });
    }
});

/**
 * Verifica se os campos estao preenchidos corretamente, pega seus valores
 * cria um objeto com as informacoes, faz uma requisicao put, recarrega
 * os dados da tablela e fecha o modal
 */

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

      // Faz uma requisicao com o id do veiculo

      let created_at = getRequestById(globalVeiculoId);

      setTimeout(function(){
        // Salva a data de criacao do veiculo

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
}, 1750);

/**
 * Deleta o veiculo e recarrega o modal
 */

$("#btnDeletarVeiculo").on("click", function(event){
    event.preventDefault();

    deleteRequest(globalVeiculoId);

    $("#modalDeletarVeiculo").modal("hide");
    $("#modalDeletarVeiculo").on("hidden.bs.modal", function(e){
      refreshTable();
    });
});