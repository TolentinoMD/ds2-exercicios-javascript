/* =========================================================
   Exercício 4 — Variáveis e tipos de dados
   Arquivo: js/exercicio02.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

// ---------- Declaração das variáveis ----------

const nome = "Michael Douglas Alves Tolentino";
let idade = 22;
const cidade = "São Roque";
const matriculado = true;
const nota = 8.5;

// ---------- Exibição dos valores ----------

console.log("===== VALORES =====");
console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Cidade:", cidade);
console.log("Matriculado:", matriculado);
console.log("Nota:", nota);

// ---------- Exibição dos tipos com typeof ----------

console.log("===== TIPOS (typeof) =====");
console.log("typeof nome:", typeof nome);
console.log("typeof idade:", typeof idade);
console.log("typeof cidade:", typeof cidade);
console.log("typeof matriculado:", typeof matriculado);
console.log("typeof nota:", typeof nota);

// ---------- Tabela na página (mesmo conteúdo, versão visual) ----------

const variaveis = [
  { declaracao: "const", chave: "nome",        valor: nome },
  { declaracao: "let",   chave: "idade",       valor: idade },
  { declaracao: "const", chave: "cidade",      valor: cidade },
  { declaracao: "const", chave: "matriculado", valor: matriculado },
  { declaracao: "const", chave: "nota",        valor: nota }
];

const corpoTabela = document.getElementById("corpoTabela");

function formatarValor(valor) {
  // Strings aparecem entre aspas, para deixar o tipo evidente
  return typeof valor === "string" ? `"${valor}"` : String(valor);
}

variaveis.forEach(function (variavel) {
  const linha = document.createElement("tr");
  const tipo = typeof variavel.valor;

  const colDeclaracao = document.createElement("td");
  const marcador = document.createElement("span");
  marcador.className = `declaracao ${variavel.declaracao}`;
  marcador.textContent = variavel.declaracao;
  colDeclaracao.appendChild(marcador);

  const colChave = document.createElement("td");
  colChave.className = "chave";
  colChave.textContent = variavel.chave;

  const colValor = document.createElement("td");
  colValor.className = "valor";
  colValor.textContent = formatarValor(variavel.valor);

  const colTipo = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.className = "tipo";
  etiqueta.setAttribute("data-tipo", tipo);
  etiqueta.textContent = tipo;
  colTipo.appendChild(etiqueta);

  linha.appendChild(colDeclaracao);
  linha.appendChild(colChave);
  linha.appendChild(colValor);
  linha.appendChild(colTipo);
  corpoTabela.appendChild(linha);
});

// ---------- Demonstração: const não aceita reatribuição ----------

document.getElementById("btnConst").addEventListener("click", function () {
  const saida = document.getElementById("saidaConst");
  try {
    // eval é usado apenas para que o erro ocorra em tempo de execução;
    // escrito direto no código, seria um erro de sintaxe no carregamento.
    eval('nome = "Outro nome";');
    saida.textContent = "A reatribuição funcionou (não deveria).";
  } catch (erro) {
    console.error(erro);
    saida.textContent = `${erro.name}: ${erro.message}`;
    console.log("A const 'nome' continua valendo:", nome);
  }
});

// ---------- Demonstração: let aceita reatribuição ----------

document.getElementById("btnLet").addEventListener("click", function () {
  const anterior = idade;
  idade = idade + 1;   // permitido, porque idade foi declarada com let

  document.getElementById("saidaLet").textContent =
    `idade: ${anterior} -> ${idade} (reatribuição permitida)`;

  console.log(`Idade atualizada de ${anterior} para ${idade}.`);
});

