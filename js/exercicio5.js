/* =========================================================
   Exercício 5 — Entrada de dados e concatenação
   Arquivo: js/exercicio03.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

function coletarDados() {

  // ---------- Entrada de dados via prompt() ----------

  const nome   = prompt("Digite o seu nome:");
  const idade  = prompt("Digite a sua idade:");
  const curso  = prompt("Digite o seu curso:");
  const cidade = prompt("Digite a sua cidade:");

  // Se o usuário clicar em Cancelar, prompt() devolve null
  if (nome === null || idade === null || curso === null || cidade === null) {
    console.log("Coleta cancelada pelo usuário.");
    return null;
  }

  // ---------- SOLUÇÃO 1: concatenação com o operador + ----------

  const apresentacaoConcatenada =
    "Olá, meu nome é " + nome +
    ", tenho " + idade +
    " anos, moro em " + cidade +
    " e estou cursando " + curso + ".";

  // ---------- SOLUÇÃO 2: template string ----------

  const apresentacaoTemplate =
    `Olá, meu nome é ${nome}, tenho ${idade} anos, moro em ${cidade} e estou cursando ${curso}.`;

  // ---------- Saída no console ----------

  console.log("===== SOLUÇÃO 1: concatenação com + =====");
  console.log(apresentacaoConcatenada);

  console.log("===== SOLUÇÃO 2: template string =====");
  console.log(apresentacaoTemplate);

  // As duas produzem exatamente o mesmo texto
  console.log("Os dois resultados são idênticos?", apresentacaoConcatenada === apresentacaoTemplate);

  return {
    campos: { nome, idade, curso, cidade },
    concatenada: apresentacaoConcatenada,
    template: apresentacaoTemplate
  };
}

// ---------- Exibição na página ----------

function preencherTabela(campos) {
  const corpo = document.getElementById("corpoDados");
  corpo.innerHTML = "";

  const rotulos = {
    nome:   "Nome",
    idade:  "Idade",
    curso:  "Curso",
    cidade: "Cidade"
  };

  Object.keys(rotulos).forEach(function (chave) {
    const valor = campos[chave];
    const linha = document.createElement("tr");

    const colCampo = document.createElement("th");
    colCampo.setAttribute("scope", "row");
    colCampo.textContent = rotulos[chave];

    const colValor = document.createElement("td");
    colValor.className = "valor";
    colValor.textContent = `"${valor}"`;

    const colTipo = document.createElement("td");
    const etiqueta = document.createElement("span");
    etiqueta.className = "tipo";
    etiqueta.textContent = typeof valor;
    colTipo.appendChild(etiqueta);

    linha.appendChild(colCampo);
    linha.appendChild(colValor);
    linha.appendChild(colTipo);
    corpo.appendChild(linha);
  });
}

function exibirResultado(elementoId, texto) {
  const bloco = document.getElementById(elementoId);
  bloco.innerHTML = "";

  const linha = document.createElement("p");
  const marcador = document.createElement("span");
  marcador.className = "prompt";
  marcador.textContent = ">";

  linha.appendChild(marcador);
  linha.appendChild(document.createTextNode(texto));
  bloco.appendChild(linha);
}

// ---------- Ligação com o botão ----------

document.getElementById("btnIniciar").addEventListener("click", function () {
  const resultado = coletarDados();
  if (resultado === null) { return; }

  preencherTabela(resultado.campos);
  exibirResultado("saidaConcatenacao", resultado.concatenada);
  exibirResultado("saidaTemplate", resultado.template);
});