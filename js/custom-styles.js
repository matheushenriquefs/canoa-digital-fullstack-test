/**
 * Esta funcao realiza uma serie de modificacoes no layout da pagina incluindo
 * a criacao do botão adicionar veiculos e aprimoramento da responsividade
 * em diversos dispositivos
 */

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
    const dataTableRow = document.getElementById("dataTable_wrapper").children[0];

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
