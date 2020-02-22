/**
 * Tooltips que ajudam o usuario a preencher os campos do formulario corretamente
 */

$("#inputVeiculo").tooltip({"trigger": "focus", "title": "Um veículo válido NÃO deve conter caracteres especiais"});

$("#inputMarca").tooltip({"trigger": "focus", "title": "Uma marca válida NÃO deve conter caracteres especiais"});

$("#inputAno").tooltip({"trigger": "focus", "title": "Um ano válido NÃO deve conter letras, caracteres especiais ou números negativos"});

$("#inputDescricao").tooltip({"trigger": "focus", "title": "Faça uma breve descrição do veículo"});