/**
 * Limpa os campos do formulario e define o valor padrao para o input radio do form
 * 
 * @param {Array} inputs - Um array com os inputs que deseja limpar
 */

function clearInputs(inputs){
    for(let val of inputs){
      $(`#${val}`).removeClass("border-success");
      $(`#${val}`).removeClass("border-danger");
      $(`#${val}`).removeClass("bg-white");
      $(`#${val}`).removeAttr("placeholder");
      $(`#${val}`).removeAttr("disabled");
      $(`#${val}`).val("");
      $(`#${val}Text`).removeClass("text-success");
      $(`#${val}Text`).removeClass("text-danger");
      $(`#${val}Text`).text("");
    }
    $("#inputVendidoNao").removeAttr("disabled");
    $("#inputVendidoSim").removeAttr("disabled");
    $("#inputVendidoNao").prop("checked", true);
}

/**
 * @param {Array} inputs - um array com os inputs que deseja popular
 * @param {Object} obj - objeto contendo as informacoes necessarias para
 * preencher os campos
 * @param {String} btnAction - uma string com a nome da classe do botao
 */

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
        $(`#${inputs[i]}`).attr("placeholder", array[i]);
        $(`#${inputs[i]}`).attr("disabled", "");
        $(`#${inputs[i]}`).addClass("bg-white");
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
        $(`#${inputs[i]}`).val(array[i]);
      }
    }
}

/**
 * Recarrega a tabela mantendo a mesma pagina de visualizacao do usuario
 */

function refreshTable(){
    $("#dataTable").DataTable().ajax.reload(null, false);
};