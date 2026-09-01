function classificarVoto(entrada) {

  // ---------- Validação da entrada ----------

  if (entrada === null) {
    return { mensagem: "Idade inválida", estado: "invalida", motivo: "Operação cancelada pelo usuário." };
  }

  if (String(entrada).trim() === "") {
    return { mensagem: "Idade inválida", estado: "invalida", motivo: "Nenhum valor foi informado." };
  }

  const idade = Number(entrada);

  if (isNaN(idade)) {
    return { mensagem: "Idade inválida", estado: "invalida", motivo: "O valor informado não é numérico." };
  }

  if (idade < 0) {
    return { mensagem: "Idade inválida", estado: "invalida", motivo: "A idade não pode ser negativa." };
  }

  // ---------- Classificação por faixa etária ----------

  if (idade < 16) {
    return { mensagem: "Não pode votar", estado: "nao-vota", idade: idade, motivo: "Menor de 16 anos." };
  }

  if (idade < 18) {
    // Só chega aqui quem tem 16 ou mais, porque a condição anterior falhou
    return { mensagem: "Voto opcional", estado: "opcional", idade: idade, motivo: "Idade de 16 ou 17 anos." };
  }

  return { mensagem: "Voto obrigatório", estado: "obrigatorio", idade: idade, motivo: "18 anos ou mais." };
}

// ---------- Programa principal ----------

function executar() {
  const entrada = prompt("Digite a sua idade:");
  const resultado = classificarVoto(entrada);

  console.log("===== CLASSIFICAÇÃO DO VOTO =====");
  console.log("Valor informado:", entrada);
  console.log("Resultado:", resultado.mensagem);
  console.log("Motivo:", resultado.motivo);

  atualizarPainel(entrada, resultado);
}

function atualizarPainel(entrada, resultado) {
  const painel = document.getElementById("painelResultado");
  painel.setAttribute("data-estado", resultado.estado);

  document.getElementById("idadeLida").textContent =
    resultado.estado === "invalida" ? "!" : `${resultado.idade} anos`;

  document.getElementById("classificacao").textContent = resultado.mensagem;
  document.getElementById("detalhe").textContent = resultado.motivo;
}

document.getElementById("btnIniciar").addEventListener("click", executar);

// ---------- Bateria de testes ----------

const casosDeTeste = [
  { entrada: "15",     esperado: "Não pode votar"   },
  { entrada: "16",     esperado: "Voto opcional"    },
  { entrada: "17",     esperado: "Voto opcional"    },
  { entrada: "18",     esperado: "Voto obrigatório" },
  { entrada: "45",     esperado: "Voto obrigatório" },
  { entrada: "0",      esperado: "Não pode votar"   },
  { entrada: "-5",     esperado: "Idade inválida"   },
  { entrada: "",       esperado: "Idade inválida"   },
  { entrada: "   ",    esperado: "Idade inválida"   },
  { entrada: "abc",    esperado: "Idade inválida"   },
  { entrada: "18anos", esperado: "Idade inválida"   },
  { entrada: null,     esperado: "Idade inválida"   }
];

const classePorEstado = {
  "invalida":    "invalida",
  "nao-vota":    "nao-vota",
  "opcional":    "opcional",
  "obrigatorio": "obrigatorio"
};

document.getElementById("btnTestes").addEventListener("click", function () {
  const corpo = document.getElementById("corpoTestes");
  corpo.innerHTML = "";

  console.log("===== BATERIA DE TESTES =====");
  let aprovados = 0;

  casosDeTeste.forEach(function (caso) {
    const resultado = classificarVoto(caso.entrada);
    const passou = resultado.mensagem === caso.esperado;
    if (passou) { aprovados++; }

    const linha = document.createElement("tr");

    const colEntrada = document.createElement("td");
    colEntrada.className = "mono";
    colEntrada.textContent = caso.entrada === null ? "null (cancelado)" : `"${caso.entrada}"`;

    const colSaida = document.createElement("td");
    const etiqueta = document.createElement("span");
    etiqueta.className = `etiqueta ${classePorEstado[resultado.estado]}`;
    etiqueta.textContent = resultado.mensagem;
    colSaida.appendChild(etiqueta);

    const colSituacao = document.createElement("td");
    colSituacao.className = passou ? "situacao-ok" : "situacao-nok";
    colSituacao.textContent = passou ? "OK" : `Falhou (esperado: ${caso.esperado})`;

    linha.appendChild(colEntrada);
    linha.appendChild(colSaida);
    linha.appendChild(colSituacao);
    corpo.appendChild(linha);

    console.log(`${passou ? "OK  " : "FALHA"} | entrada: ${JSON.stringify(caso.entrada)} => ${resultado.mensagem}`);
  });

  console.log(`Resultado: ${aprovados} de ${casosDeTeste.length} testes aprovados.`);
});