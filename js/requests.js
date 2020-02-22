/**
 * Recebe o id a ser buscado e fez uma requisicao ajax com o mesmo e retorna
 * um objeto jquery. Trata o erro/sucesso da requisicao e exibe uma notificao
 * de acordo
 * @param {String} id - id a ser buscado na API
 * @returns {Object} response - objeto jquery
 */

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

/**
 * Recebe um objeto e o insere na base de dados da API. Trata o erro/sucesso da
 * requisicao e exibe uma notificao de acordo
 * @param {Objetct} obj - objeto com dados a serem inseridos
 * @returns {Object} response - objeto jquery
 */

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

/**
 * Recebe um objeto e o atualiza na base de dados da API. Trata o erro/sucesso 
 * da requisicao e exibe uma notificao de acordo
 * @param {Objetct} obj - objeto com dados a serem inseridos
 * @returns {Object} response - objeto jquery
 */

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

/**
 * Recebe um id e o deleta da base de dados da API. Trata o erro/sucesso da
 * requisicao e exibe uma notificao de acordo
 * @param {Objetct} obj - objeto com dados a serem inseridos
 * @returns {Object} response - objeto jquery
 */

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