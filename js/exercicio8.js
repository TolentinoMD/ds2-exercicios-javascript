const NOTA_MINIMA = 0;
const NOTA_MAXIMA = 10;
const MEDIA_APROVACAO = 7;
const MEDIA_RECUPERACAO = 5;

// ---------- Validação ----------

function validarNota(entrada) {
  if (entrada === null) {
    return { valida: false, motivo: "Operação cancelada pelo usuário." };
  }

  if (String(entrada).trim() === "") {
    return { valida: false, motivo: "Nenhuma nota foi informada." };
  }

  // Aceita vírgula como separador decimal: 7,5 vira 7.5
  const texto = String(entrada).trim().replace(",", ".");
  const nota = Number(texto);

  if (isNaN(nota)) {
    return { valida: false, motivo: `O valor "${entrada}" não é numérico.` };
  }

  if (nota < NOTA_MINIMA || nota > NOTA_MAXIMA) {
    return { valida: false, motivo: `A nota ${nota} está fora do intervalo de ${NOTA_MINIMA} a ${NOTA_MAXIMA}.` };
  }

  return { valida: true, nota: nota };
}

// ---------- Cálculo e classificação ----------

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

function classificarMedia(media) {
  if (media >= MEDIA_APROVACAO) {
    return { situacao: "Aprovado", estado: "aprovado" };
  }

  if (media >= MEDIA_RECUPERACAO) {
    // Só chega aqui quem ficou abaixo de 7, então a faixa é 5 a 6,9
    return { situacao: "Recuperação", estado: "recuperacao" };
  }

  return { situacao: "Reprovado", estado: "reprovado" };
}

// ---------- Programa principal ----------

function lancarNotas() {

  // Nome do aluno
  const nome = prompt("Digite o nome do aluno:");

  if (nome === null || nome.trim() === "") {
    console.log("Nome inválido. Cadastro cancelado.");
    exibirErro("Nome inválido", "É necessário informar o nome do aluno.");
    return;
  }

  // Primeira nota
  const entradaNota1 = prompt(`Digite a primeira nota de ${nome.trim()} (${NOTA_MINIMA} a ${NOTA_MAXIMA}):`);
  const teste1 = validarNota(entradaNota1);

  if (!teste1.valida) {
    console.log("Nota rejeitada:", teste1.motivo);
    exibirErro("Nota rejeitada", teste1.motivo);
    return;
  }

  // Segunda nota
  const entradaNota2 = prompt(`Digite a segunda nota de ${nome.trim()} (${NOTA_MINIMA} a ${NOTA_MAXIMA}):`);
  const teste2 = validarNota(entradaNota2);

  if (!teste2.valida) {
    console.log("Nota rejeitada:", teste2.motivo);
    exibirErro("Nota rejeitada", teste2.motivo);
    return;
  }

  // Cálculo
  const nota1 = teste1.nota;
  const nota2 = teste2.nota;
  const media = calcularMedia(nota1, nota2);
  const resultado = classificarMedia(media);

  // ---------- Saída no console ----------

  console.log("========================================");
  console.log("            FICHA DO ALUNO");
  console.log("========================================");
  console.log(`Nome ......: ${nome.trim()}`);
  console.log(`Nota 1 ....: ${nota1.toFixed(1)}`);
  console.log(`Nota 2 ....: ${nota2.toFixed(1)}`);
  console.log(`Média .....: ${media.toFixed(1)}`);
  console.log(`Situação ..: ${resultado.situacao}`);
  console.log("========================================");

  exibirFicha(nome.trim(), nota1, nota2, media, resultado);
}

// ---------- Saída na página ----------

function exibirFicha(nome, nota1, nota2, media, resultado) {
  const ficha = document.getElementById("ficha");
  ficha.setAttribute("data-situacao", resultado.estado);

  document.getElementById("fichaNome").textContent = nome;
  document.getElementById("fichaSituacao").textContent = resultado.situacao;
  document.getElementById("fichaNota1").textContent = nota1.toFixed(1);
  document.getElementById("fichaNota2").textContent = nota2.toFixed(1);
  document.getElementById("fichaMedia").textContent = media.toFixed(1);

  document.getElementById("fichaDetalhe").textContent =
    `Média calculada: (${nota1.toFixed(1)} + ${nota2.toFixed(1)}) / 2 = ${media.toFixed(1)}`;
}

function exibirErro(titulo, motivo) {
  const ficha = document.getElementById("ficha");
  ficha.setAttribute("data-situacao", "invalida");

  document.getElementById("fichaNome").textContent = titulo;
  document.getElementById("fichaSituacao").textContent = "Inválido";
  document.getElementById("fichaNota1").textContent = "—";
  document.getElementById("fichaNota2").textContent = "—";
  document.getElementById("fichaMedia").textContent = "—";
  document.getElementById("fichaDetalhe").textContent = motivo;

  alert(`${titulo}: ${motivo}`);
}

document.getElementById("btnIniciar").addEventListener("click", lancarNotas);

// ---------- Bateria de testes ----------

const casosDeTeste = [
  { nota1: "10",  nota2: "10",  esperado: "Aprovado"    },
  { nota1: "8",   nota2: "6",   esperado: "Aprovado"    },
  { nota1: "7",   nota2: "7",   esperado: "Aprovado"    },
  { nota1: "6,9", nota2: "7,1", esperado: "Aprovado"    },
  { nota1: "6",   nota2: "7",   esperado: "Recuperação" },
  { nota1: "5",   nota2: "5",   esperado: "Recuperação" },
  { nota1: "4",   nota2: "5,9", esperado: "Reprovado"   },
  { nota1: "0",   nota2: "0",   esperado: "Reprovado"   },
  { nota1: "11",  nota2: "8",   esperado: "Rejeitada"   },
  { nota1: "-1",  nota2: "8",   esperado: "Rejeitada"   },
  { nota1: "abc", nota2: "8",   esperado: "Rejeitada"   },
  { nota1: "",    nota2: "8",   esperado: "Rejeitada"   }
];

document.getElementById("btnTestes").addEventListener("click", function () {
  const corpo = document.getElementById("corpoTestes");
  corpo.innerHTML = "";

  console.log("===== BATERIA DE TESTES =====");
  let aprovados = 0;

  casosDeTeste.forEach(function (caso) {
    const teste1 = validarNota(caso.nota1);
    const teste2 = validarNota(caso.nota2);

    let obtido;
    let estado;
    let mediaTexto = "—";

    if (!teste1.valida || !teste2.valida) {
      obtido = "Rejeitada";
      estado = "invalida";
    } else {
      const media = calcularMedia(teste1.nota, teste2.nota);
      const resultado = classificarMedia(media);
      obtido = resultado.situacao;
      estado = resultado.estado;
      mediaTexto = media.toFixed(1);
    }

    const passou = obtido === caso.esperado;
    if (passou) { aprovados++; }

    const linha = document.createElement("tr");

    const colNotas = document.createElement("td");
    colNotas.className = "mono";
    colNotas.textContent = `"${caso.nota1}" e "${caso.nota2}"`;

    const colMedia = document.createElement("td");
    colMedia.className = "mono";
    colMedia.textContent = mediaTexto;

    const colResultado = document.createElement("td");
    const etiqueta = document.createElement("span");
    etiqueta.className = `etiqueta ${estado}`;
    etiqueta.textContent = obtido;
    colResultado.appendChild(etiqueta);

    const colSituacao = document.createElement("td");
    colSituacao.className = passou ? "situacao-ok" : "situacao-nok";
    colSituacao.textContent = passou ? "OK" : `Falhou (esperado: ${caso.esperado})`;

    linha.appendChild(colNotas);
    linha.appendChild(colMedia);
    linha.appendChild(colResultado);
    linha.appendChild(colSituacao);
    corpo.appendChild(linha);

    console.log(`${passou ? "OK  " : "FALHA"} | ${caso.nota1} e ${caso.nota2} => ${obtido} (média ${mediaTexto})`);
  });

  console.log(`Resultado: ${aprovados} de ${casosDeTeste.length} testes aprovados.`);
});