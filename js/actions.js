/**
 * Verifica se os campos estao preenchidos corretamente, pega seus valores
 * cria um objeto com as informacoes, faz uma requisicao post, recarrega
 * os dados da tablela e fecha o modal
 */

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

    refreshTable();

    $("#modalAdicionarVeiculo").on("hidden.bs.modal", function(e){
      clearInputs(["inputAdicionarVeiculo", "inputAdicionarMarca", "inputAdicionarAno", "inputAdicionarDescricao"], "Adicionar");
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

/**
 * Deleta o veiculo e recarrega o modal
 */

$("#btnDeletarVeiculo").on("click", function(event){
  event.preventDefault();

  deleteRequest(globalVeiculoId);

  refreshTable();

  $("#modalDeletarVeiculo").modal("hide");
});
