/**
 * Recebe o id do campo do formulario e valida o mesmo
 * @param {String} inputId - id do campo a ser validado
 * @returns {Boolean} - retorna true caso o usuario preencheu corretamente o
 * corretamente o campo e false caso nao
 */

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

/**
 * Recebe o id do campo do formulario e valida o mesmo
 * @param {String} inputId - id do campo a ser validado
 * @returns {Boolean} - retorna true caso o usuario preencheu corretamente o
 * corretamente o campo e false caso nao
 */

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

/**
 * Recebe o id do campo do formulario e valida o mesmo
 * @param {String} inputId - id do campo a ser validado
 * @returns {Boolean} - retorna true caso o usuario preencheu corretamente o
 * corretamente o campo e false caso nao
 */

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