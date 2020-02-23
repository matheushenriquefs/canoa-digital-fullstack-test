/**
 * Limpa os campos do formulario e define o valor padrao para o input radio do form
 * 
 * @param {Array} inputs - Um array com os inputs que deseja limpar
 * @param {String} action - Uma string com a a primeira letra maiuscula,
 * serve para indicar qual input vendido a funcao ira alterar
 */

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

/**
 * @param {Array} inputs - um array com os inputs que deseja popular
 * @param {Object} obj - objeto contendo as informacoes necessarias para
 * preencher os campos
 * @param {String} action - Uma string com a a primeira letra maiuscula,
 * serve para indicar qual input vendido a funcao ira alterar
 */

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

/**
 * Recarrega a tabela mantendo a mesma pagina de visualizacao do usuario
 */

function refreshTable(){
    $("#dataTable").DataTable().ajax.reload(null, false);
};
