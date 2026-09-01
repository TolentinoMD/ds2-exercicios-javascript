/* =========================================================
   Desafio final integrador — Sistema acadêmico
   Arquivo: js/desafio-final.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

const NOTA_MINIMA = 0;
const NOTA_MAXIMA = 10;
const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;

// Lista que acumula os alunos entre as repetições do laço
const alunos = [];

/* =========================================================
   FUNÇÕES DE ENTRADA E VALIDAÇÃO
   ========================================================= */

/* Pede um texto e insiste enquanto vier vazio.
   Devolve null se o usuário cancelar, o que encerra o cadastro. */
function lerTexto(mensagem) {
  let valor = prompt(mensagem);

  while (valor !== null && valor.trim() === "") {
    valor = prompt(`O campo não pode ficar vazio.\n${mensagem}`);
  }

  return valor === null ? null : valor.trim();
}

/* Pede uma nota e insiste enquanto não for um número entre 0 e 10.
   Aceita vírgula como separador decimal. */
function lerNota(mensagem) {
  let entrada = prompt(mensagem);

  while (entrada !== null) {
    const texto = entrada.trim().replace(",", ".");
    const nota = Number(texto);

    if (texto === "" || isNaN(nota)) {
      entrada = prompt(`Valor inválido: informe um número.\n${mensagem}`);
      continue;
    }

    if (nota < NOTA_MINIMA || nota > NOTA_MAXIMA) {
      entrada = prompt(`A nota deve estar entre ${NOTA_MINIMA} e ${NOTA_MAXIMA}.\n${mensagem}`);
      continue;
    }

    return nota;
  }

  return null;   // usuário cancelou
}

/* Pergunta se há outro aluno e interpreta a resposta.
   Qualquer coisa diferente de s/sim encerra o cadastro. */
function desejaContinuar() {
  const resposta = prompt("Deseja cadastrar outro aluno? (s/n)");

  if (resposta === null) { return false; }

  const escolha = resposta.trim().toLowerCase();
  return escolha === "s" || escolha === "sim";
}

/* =========================================================
   FUNÇÕES DE CÁLCULO E CLASSIFICAÇÃO
   (as mesmas do Exercício 13, reaproveitadas sem alteração)
   ========================================================= */

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

function classificarSituacao(media) {
  if (media >= MEDIA_APROVACAO) {
    return "Aprovado";
  }

  if (media >= MEDIA_RECUPERACAO) {
    return "Recuperação";
  }

  return "Reprovado";
}

/* =========================================================
   SAÍDA NO CONSOLE
   ========================================================= */

function exibirFicha(aluno, posicao) {
  console.log("==========================================");
  console.log(`            FICHA DO ALUNO ${posicao}`);
  console.log("==========================================");
  console.log(`Nome ......: ${aluno.nome}`);
  console.log(`Curso .....: ${aluno.curso}`);
  console.log(`Nota 1 ....: ${aluno.nota1.toFixed(1)}`);
  console.log(`Nota 2 ....: ${aluno.nota2.toFixed(1)}`);
  console.log(`Média .....: ${aluno.media.toFixed(1)}`);
  console.log(`Situação ..: ${aluno.situacao}`);
  console.log("==========================================");
}

function exibirResumoFinal() {
  console.log("### FIM DO CADASTRO ###");
  console.log(`Total de alunos cadastrados: ${alunos.length}`);

  if (alunos.length === 0) {
    console.log("Nenhum aluno foi cadastrado nesta sessão.");
    return;
  }

  console.log("--- Resumo da turma ---");

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    console.log(
      `${i + 1}. ${aluno.nome} | ${aluno.curso} | ` +
      `Média ${aluno.media.toFixed(1)} | ${aluno.situacao}`
    );
  }

  const estatisticas = calcularEstatisticas();
  console.log(`Aprovados: ${estatisticas.aprovados} | ` +
              `Recuperação: ${estatisticas.recuperacao} | ` +
              `Reprovados: ${estatisticas.reprovados}`);
  console.log(`Média geral da turma: ${estatisticas.mediaTurma.toFixed(1)}`);
}

/* =========================================================
   PROGRAMA PRINCIPAL
   ========================================================= */

function iniciarCadastro() {
  let continuar = true;

  console.log("### SISTEMA ACADÊMICO — INÍCIO DO CADASTRO ###");

  // Laço principal: repete enquanto a resposta for afirmativa
  while (continuar) {

    const nome = lerTexto("Digite o nome do aluno:");
    if (nome === null) { break; }          // cancelou

    const curso = lerTexto("Digite o nome do curso:");
    if (curso === null) { break; }

    const nota1 = lerNota(`Digite a primeira nota de ${nome} (${NOTA_MINIMA} a ${NOTA_MAXIMA}):`);
    if (nota1 === null) { break; }

    const nota2 = lerNota(`Digite a segunda nota de ${nome} (${NOTA_MINIMA} a ${NOTA_MAXIMA}):`);
    if (nota2 === null) { break; }

    // Cálculo e classificação por meio de funções
    const media = calcularMedia(nota1, nota2);
    const situacao = classificarSituacao(media);

    const aluno = {
      nome: nome,
      curso: curso,
      nota1: nota1,
      nota2: nota2,
      media: media,
      situacao: situacao
    };

    alunos.push(aluno);
    exibirFicha(aluno, alunos.length);
    atualizarPagina();

    continuar = desejaContinuar();
  }

  exibirResumoFinal();
  atualizarPagina();

  alert(`Cadastro encerrado.\nTotal de alunos cadastrados: ${alunos.length}`);
}

/* =========================================================
   ESTATÍSTICAS E SAÍDA NA PÁGINA
   ========================================================= */

function calcularEstatisticas() {
  let aprovados = 0;
  let recuperacao = 0;
  let reprovados = 0;
  let somaMedias = 0;

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    somaMedias += aluno.media;

    if (aluno.situacao === "Aprovado") {
      aprovados++;
    } else if (aluno.situacao === "Recuperação") {
      recuperacao++;
    } else {
      reprovados++;
    }
  }

  return {
    aprovados: aprovados,
    recuperacao: recuperacao,
    reprovados: reprovados,
    // Evita 0/0 = NaN quando a lista está vazia
    mediaTurma: alunos.length === 0 ? 0 : somaMedias / alunos.length
  };
}

const classePorSituacao = {
  "Aprovado": "aprovado",
  "Recuperação": "recuperacao",
  "Reprovado": "reprovado"
};

function atualizarPagina() {
  const painel = document.getElementById("painel");
  const estatisticas = calcularEstatisticas();

  painel.setAttribute("data-estado", alunos.length === 0 ? "vazio" : "ok");

  document.getElementById("estadoTexto").textContent = alunos.length === 0
    ? "Nenhum aluno cadastrado ainda."
    : `${alunos.length} aluno(s) cadastrado(s) nesta sessão.`;

  document.getElementById("valorTotal").textContent = alunos.length;
  document.getElementById("valorAprovados").textContent = estatisticas.aprovados;
  document.getElementById("valorRecuperacao").textContent = estatisticas.recuperacao;
  document.getElementById("valorReprovados").textContent = estatisticas.reprovados;
  document.getElementById("valorMediaTurma").textContent =
    alunos.length === 0 ? "—" : estatisticas.mediaTurma.toFixed(1);

  desenharFichas();
}

function desenharFichas() {
  const container = document.getElementById("fichas");
  container.innerHTML = "";

  if (alunos.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "vazio";
    vazio.textContent = "As fichas aparecem aqui e também no console.";
    container.appendChild(vazio);
    return;
  }

  alunos.forEach(function (aluno, indice) {
    const ficha = document.createElement("article");
    ficha.className = "ficha";
    ficha.setAttribute("data-situacao", classePorSituacao[aluno.situacao]);

    // Cabeçalho
    const topo = document.createElement("header");
    topo.className = "ficha-topo";

    const identificacao = document.createElement("div");
    identificacao.className = "ficha-identificacao";

    const nome = document.createElement("p");
    nome.className = "ficha-nome";

    const marcador = document.createElement("span");
    marcador.className = "ficha-indice";
    marcador.textContent = String(indice + 1).padStart(2, "0");

    nome.appendChild(marcador);
    nome.appendChild(document.createTextNode(aluno.nome));

    const curso = document.createElement("p");
    curso.className = "ficha-curso";
    curso.textContent = aluno.curso;

    identificacao.appendChild(nome);
    identificacao.appendChild(curso);

    const situacao = document.createElement("span");
    situacao.className = "ficha-situacao";
    situacao.textContent = aluno.situacao;

    topo.appendChild(identificacao);
    topo.appendChild(situacao);

    // Notas
    const notas = document.createElement("div");
    notas.className = "ficha-notas";

    const itens = [
      { rotulo: "Nota 1", valor: aluno.nota1.toFixed(1) },
      { rotulo: "Nota 2", valor: aluno.nota2.toFixed(1) },
      { rotulo: "Média",  valor: aluno.media.toFixed(1) }
    ];

    itens.forEach(function (item) {
      const bloco = document.createElement("div");
      const rotulo = document.createElement("span");
      rotulo.textContent = `${item.rotulo}: `;
      const valor = document.createElement("b");
      valor.textContent = item.valor;
      bloco.appendChild(rotulo);
      bloco.appendChild(valor);
      notas.appendChild(bloco);
    });

    ficha.appendChild(topo);
    ficha.appendChild(notas);
    container.appendChild(ficha);
  });
}

/* =========================================================
   LIGAÇÃO COM OS BOTÕES
   ========================================================= */

document.getElementById("btnIniciar").addEventListener("click", iniciarCadastro);

document.getElementById("btnLimpar").addEventListener("click", function () {
  alunos.length = 0;      // esvazia o array mantendo a mesma referência (const)
  atualizarPagina();
  console.log("Lista de alunos limpa.");
});

atualizarPagina();