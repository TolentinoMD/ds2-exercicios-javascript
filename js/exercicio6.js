/* =========================================================
   Exercício 6 — Conversão de dados e cálculo de idade
   Arquivo: js/exercicio04.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

const ANOS_A_FRENTE = 5;

function processarIdade() {

  // ---------- 1. Entrada de dados ----------

  const entrada = prompt("Digite a sua idade:");

  if (entrada === null) {
    console.log("Operação cancelada pelo usuário.");
    return;
  }

  // ---------- 2. Valor original e seu tipo ----------

  console.log("===== ETAPAS DA CONVERSÃO =====");
  console.log("1. Valor original retornado pelo prompt():", entrada);
  console.log("2. Tipo do valor original:", typeof entrada);

  // ---------- 3. Conversão para número ----------

  const idade = Number(entrada);

  // Validação: vazio ou texto não numérico
  if (entrada.trim() === "" || isNaN(idade)) {
    console.log("Idade inválida. Digite apenas números.");
    alert("Idade inválida. Digite apenas números.");
    return;
  }

  console.log("3. Valor após Number():", idade);
  console.log("4. Tipo após a conversão:", typeof idade);

  // ---------- 4. Soma correta ----------

  const idadeFutura = idade + ANOS_A_FRENTE;

  // ---------- 5. Resultado final ----------

  console.log(`5. Daqui a ${ANOS_A_FRENTE} anos você terá ${idadeFutura} anos.`);

  // Demonstração do erro clássico, sem conversão
  const semConversao = entrada + ANOS_A_FRENTE;
  console.log("--- Comparação ---");
  console.log(`Com conversão:  Number("${entrada}") + ${ANOS_A_FRENTE} =`, idadeFutura, `(${typeof idadeFutura})`);
  console.log(`Sem conversão:  "${entrada}" + ${ANOS_A_FRENTE} =`, semConversao, `(${typeof semConversao})`);

  atualizarPagina(entrada, idade, idadeFutura, semConversao);
}

// ---------- Atualização da página ----------

function atualizarPagina(entrada, idade, idadeFutura, semConversao) {
  document.getElementById("valorOriginal").textContent = `"${entrada}"`;
  document.getElementById("tipoOriginal").textContent = typeof entrada;
  document.getElementById("valorConvertido").textContent = idade;
  document.getElementById("tipoConvertido").textContent = typeof idade;
  document.getElementById("resultadoFinal").textContent =
    `Daqui a ${ANOS_A_FRENTE} anos você terá ${idadeFutura} anos.`;

  document.getElementById("expressaoCerta").textContent =
    `Number("${entrada}") + ${ANOS_A_FRENTE}`;
  document.getElementById("resultadoCerto").textContent = idadeFutura;

  document.getElementById("expressaoErrada").textContent =
    `"${entrada}" + ${ANOS_A_FRENTE}`;
  document.getElementById("resultadoErrado").textContent = semConversao;
}

// ---------- Tabela: comportamento dos operadores ----------

const exemplos = [
  { expressao: '"20" + 5',          valor: "20" + 5,          explicacao: "Um dos operandos é string, então o + concatena os textos." },
  { expressao: 'Number("20") + 5',  valor: Number("20") + 5,  explicacao: "Ambos são números, então o + soma normalmente." },
  { expressao: '"20" - 5',          valor: "20" - 5,          explicacao: "O operador - não concatena: converte a string para número." },
  { expressao: '"20" * 2',          valor: "20" * 2,          explicacao: "O * também converte automaticamente antes de calcular." },
  { expressao: '+"20" + 5',         valor: +"20" + 5,         explicacao: "O + unário converte a string para número antes da soma." },
  { expressao: 'parseInt("20a")',   valor: parseInt("20a"),   explicacao: "parseInt lê os dígitos iniciais e ignora o resto." },
  { expressao: 'Number("20a")',     valor: Number("20a"),     explicacao: "Number exige a string inteira válida; caso contrário devolve NaN." }
];

const corpoOperadores = document.getElementById("corpoOperadores");

exemplos.forEach(function (exemplo) {
  const linha = document.createElement("tr");

  const colExpressao = document.createElement("td");
  colExpressao.className = "mono";
  colExpressao.textContent = exemplo.expressao;

  const colValor = document.createElement("td");
  colValor.className = "mono";
  colValor.textContent = typeof exemplo.valor === "string"
    ? `"${exemplo.valor}"`
    : String(exemplo.valor);

  const colTipo = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.className = "tipo";
  etiqueta.setAttribute("data-tipo", typeof exemplo.valor);
  etiqueta.textContent = typeof exemplo.valor;
  colTipo.appendChild(etiqueta);

  const colExplicacao = document.createElement("td");
  colExplicacao.textContent = exemplo.explicacao;

  linha.appendChild(colExpressao);
  linha.appendChild(colValor);
  linha.appendChild(colTipo);
  linha.appendChild(colExplicacao);
  corpoOperadores.appendChild(linha);
});

// ---------- Ligação com o botão ----------

document.getElementById("btnIniciar").addEventListener("click", processarIdade);