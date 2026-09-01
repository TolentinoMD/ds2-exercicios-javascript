const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;


function somar(numero1, numero2) {
  return numero1 + numero2;
}

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

function classificarMedia(media) {
  if (media >= MEDIA_APROVACAO) {
    return "Aprovado";
  }

  if (media >= MEDIA_RECUPERACAO) {
    // Só chega aqui quem ficou abaixo de 7
    return "Recuperação";
  }

  return "Reprovado";
}

function criarSaudacao(nome) {
  return `Olá, ${nome}! Seja bem-vindo(a) ao sistema acadêmico.`;
}

/* ---------------------------------------------------------
   USO DAS FUNÇÕES: os retornos são guardados em variáveis
   antes de serem exibidos.
   --------------------------------------------------------- */

const soma = somar(7, 3);
const media = calcularMedia(8, 6);
const situacao = classificarMedia(media);
const saudacao = criarSaudacao("Michael Douglas");

console.log("===== EXERCÍCIO 13 — FUNÇÕES =====");
console.log("somar(7, 3) =", soma);
console.log("calcularMedia(8, 6) =", media);
console.log("classificarMedia(" + media + ") =", situacao);
console.log("criarSaudacao('Michael Douglas') =", saudacao);

// Teste rápido das três faixas de classificação
console.log("--- Faixas de classificação ---");
console.log("Média 9.0 =>", classificarMedia(9));
console.log("Média 6.0 =>", classificarMedia(6));
console.log("Média 3.0 =>", classificarMedia(3));

// Composição: o retorno de uma função alimenta a outra
console.log("--- Composição ---");
console.log("Situação direta:", classificarMedia(calcularMedia(8, 6)));

/* =========================================================
   PAINEL INTERATIVO
   ========================================================= */

function lerNumero(id) {
  const valor = document.getElementById(id).value;
  if (String(valor).trim() === "") { return NaN; }
  return Number(valor);
}

function mostrar(idChamada, idRetorno, chamada, retorno, classe) {
  document.getElementById(idChamada).textContent = chamada;

  const elemento = document.getElementById(idRetorno);
  elemento.className = `retorno ${classe || ""}`;
  elemento.textContent = retorno;
}

// ---------- somar ----------

document.getElementById("btnSomar").addEventListener("click", function () {
  const a = lerNumero("somaA");
  const b = lerNumero("somaB");

  if (isNaN(a) || isNaN(b)) {
    mostrar("chamadaSoma", "retornoSoma", "—", "Informe dois números válidos.", "invalido");
    return;
  }

  const resultado = somar(a, b);
  mostrar("chamadaSoma", "retornoSoma", `somar(${a}, ${b})`, resultado);
  console.log(`somar(${a}, ${b}) =`, resultado);
});

// ---------- calcularMedia ----------

document.getElementById("btnMedia").addEventListener("click", function () {
  const n1 = lerNumero("mediaA");
  const n2 = lerNumero("mediaB");

  if (isNaN(n1) || isNaN(n2)) {
    mostrar("chamadaMedia", "retornoMedia", "—", "Informe duas notas válidas.", "invalido");
    return;
  }

  const resultado = calcularMedia(n1, n2);
  mostrar("chamadaMedia", "retornoMedia", `calcularMedia(${n1}, ${n2})`, resultado.toFixed(1));
  console.log(`calcularMedia(${n1}, ${n2}) =`, resultado);
});

// ---------- classificarMedia ----------

const classePorSituacao = {
  "Aprovado": "aprovado",
  "Recuperação": "recuperacao",
  "Reprovado": "reprovado"
};

document.getElementById("btnClassificar").addEventListener("click", function () {
  const valor = lerNumero("classificarValor");

  if (isNaN(valor)) {
    mostrar("chamadaClassificar", "retornoClassificar", "—", "Informe uma média válida.", "invalido");
    return;
  }

  const resultado = classificarMedia(valor);
  mostrar(
    "chamadaClassificar",
    "retornoClassificar",
    `classificarMedia(${valor})`,
    resultado,
    classePorSituacao[resultado]
  );
  console.log(`classificarMedia(${valor}) =`, resultado);
});

// ---------- criarSaudacao ----------

document.getElementById("btnSaudacao").addEventListener("click", function () {
  const nome = document.getElementById("saudacaoNome").value.trim();

  if (nome === "") {
    mostrar("chamadaSaudacao", "retornoSaudacao", "—", "Informe um nome.", "invalido");
    return;
  }

  const resultado = criarSaudacao(nome);
  mostrar("chamadaSaudacao", "retornoSaudacao", `criarSaudacao("${nome}")`, resultado);
  console.log(`criarSaudacao("${nome}") =`, resultado);
});

// ---------- Composição das funções ----------

document.getElementById("btnComposicao").addEventListener("click", function () {
  const nome = document.getElementById("saudacaoNome").value.trim() || "Michael Douglas";
  const nota1 = lerNumero("mediaA");
  const nota2 = lerNumero("mediaB");

  const notaA = isNaN(nota1) ? 8 : nota1;
  const notaB = isNaN(nota2) ? 6 : nota2;

  // Cada retorno é guardado em uma variável e reaproveitado
  const saudacaoTexto = criarSaudacao(nome);
  const somaNotas = somar(notaA, notaB);
  const mediaCalculada = calcularMedia(notaA, notaB);
  const situacaoFinal = classificarMedia(mediaCalculada);

  const linhas = [
    { texto: saudacaoTexto, classe: "titulo" },
    { texto: `somar(${notaA}, ${notaB}) = ${somaNotas}` },
    { texto: `calcularMedia(${notaA}, ${notaB}) = ${mediaCalculada.toFixed(1)}` },
    { texto: `classificarMedia(${mediaCalculada.toFixed(1)}) = ${situacaoFinal}`, classe: "destaque" }
  ];

  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";

  console.log("===== FLUXO COMPLETO =====");

  linhas.forEach(function (linha, indice) {
    const paragrafo = document.createElement("p");
    if (linha.classe) { paragrafo.className = linha.classe; }

    const marcador = document.createElement("span");
    marcador.className = "indice";
    marcador.textContent = String(indice + 1).padStart(2, "0");

    paragrafo.appendChild(marcador);
    paragrafo.appendChild(document.createTextNode(linha.texto));
    terminal.appendChild(paragrafo);

    console.log(linha.texto);
  });
});