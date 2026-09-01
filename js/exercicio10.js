/* =========================================================
   Exercício 10 — Tabuada com for
   Arquivo: js/exercicio08.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

const INICIO = 1;
const FIM = 10;

// ---------- Validação da entrada ----------

function validarNumero(entrada) {
  if (entrada === null) {
    return { valido: false, motivo: "Operação cancelada pelo usuário." };
  }

  if (String(entrada).trim() === "") {
    return { valido: false, motivo: "Nenhum valor foi informado." };
  }

  const numero = Number(String(entrada).trim());

  if (isNaN(numero)) {
    return { valido: false, motivo: `O valor "${entrada}" não é um número.` };
  }

  if (!Number.isInteger(numero)) {
    return { valido: false, motivo: `O valor ${numero} não é um número inteiro.` };
  }

  return { valido: true, numero: numero };
}

// ---------- Programa principal ----------

function gerarTabuada() {
  const entrada = prompt("Digite um número inteiro para ver a tabuada:");
  const teste = validarNumero(entrada);

  if (!teste.valido) {
    console.log("Erro:", teste.motivo);
    exibirErro(teste.motivo);
    return;
  }

  const numero = teste.numero;
  const linhas = [];

  console.log(`===== TABUADA DO ${numero} =====`);

  // Laço for: inicialização, condição e incremento na mesma linha
  for (let i = INICIO; i <= FIM; i++) {
    const resultado = numero * i;
    const linha = `${numero} x ${i} = ${resultado}`;

    console.log(linha);
    linhas.push({ multiplicador: i, texto: linha });
  }

  console.log("=============================");

  exibirTabuada(numero, linhas);
}

// ---------- Saída na página ----------

function exibirTabuada(numero, linhas) {
  const painel = document.getElementById("painel");
  painel.setAttribute("data-estado", "ok");

  document.getElementById("tituloTabuada").textContent = `Tabuada do ${numero}`;

  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";

  linhas.forEach(function (item) {
    const paragrafo = document.createElement("p");

    const indice = document.createElement("span");
    indice.className = "indice";
    indice.textContent = String(item.multiplicador).padStart(2, "0");

    paragrafo.appendChild(indice);
    paragrafo.appendChild(document.createTextNode(item.texto));
    terminal.appendChild(paragrafo);
  });
}

function exibirErro(motivo) {
  const painel = document.getElementById("painel");
  painel.setAttribute("data-estado", "erro");

  document.getElementById("tituloTabuada").textContent = "Número inválido";

  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";

  const paragrafo = document.createElement("p");
  paragrafo.className = "erro";
  paragrafo.textContent = `Erro: ${motivo}`;
  terminal.appendChild(paragrafo);

  const dica = document.createElement("p");
  dica.className = "erro";
  dica.textContent = "Informe um número inteiro, como 5, 12 ou -3.";
  terminal.appendChild(dica);

  alert(`Erro: ${motivo}`);
}

document.getElementById("btnIniciar").addEventListener("click", gerarTabuada);

// ---------- Bateria de testes ----------

const casosDeTeste = [
  { entrada: "5",    esperado: "Válido"   },
  { entrada: "0",    esperado: "Válido"   },
  { entrada: "-3",   esperado: "Válido"   },
  { entrada: "100",  esperado: "Válido"   },
  { entrada: " 7 ",  esperado: "Válido"   },
  { entrada: "7.5",  esperado: "Inválido" },
  { entrada: "abc",  esperado: "Inválido" },
  { entrada: "5x",   esperado: "Inválido" },
  { entrada: "",     esperado: "Inválido" },
  { entrada: "   ",  esperado: "Inválido" },
  { entrada: null,   esperado: "Inválido" }
];

document.getElementById("btnTestes").addEventListener("click", function () {
  const corpo = document.getElementById("corpoTestes");
  corpo.innerHTML = "";

  console.log("===== BATERIA DE TESTES =====");
  let aprovados = 0;

  casosDeTeste.forEach(function (caso) {
    const teste = validarNumero(caso.entrada);
    const obtido = teste.valido ? "Válido" : "Inválido";
    const passou = obtido === caso.esperado;
    if (passou) { aprovados++; }

    const linha = document.createElement("tr");

    const colEntrada = document.createElement("td");
    colEntrada.className = "mono";
    colEntrada.textContent = caso.entrada === null ? "null (cancelado)" : `"${caso.entrada}"`;

    const colResultado = document.createElement("td");
    const etiqueta = document.createElement("span");
    etiqueta.className = `etiqueta ${teste.valido ? "valido" : "invalido"}`;
    etiqueta.textContent = obtido;
    colResultado.appendChild(etiqueta);
    if (!teste.valido) {
      const motivo = document.createElement("div");
      motivo.className = "apoio";
      motivo.textContent = teste.motivo;
      colResultado.appendChild(motivo);
    }

    const colSituacao = document.createElement("td");
    colSituacao.className = passou ? "situacao-ok" : "situacao-nok";
    colSituacao.textContent = passou ? "OK" : `Falhou (esperado: ${caso.esperado})`;

    linha.appendChild(colEntrada);
    linha.appendChild(colResultado);
    linha.appendChild(colSituacao);
    corpo.appendChild(linha);

    console.log(`${passou ? "OK  " : "FALHA"} | ${JSON.stringify(caso.entrada)} => ${obtido}`);
  });

  console.log(`Resultado: ${aprovados} de ${casosDeTeste.length} testes aprovados.`);
});