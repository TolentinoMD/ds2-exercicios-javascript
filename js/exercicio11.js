/* =========================================================
   Exercício 11 — Entrada contínua com while
   Arquivo: js/exercicio09.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

const SENTINELA = 0;   // valor que encerra a coleta

// ---------- Coleta com laço while ----------

function coletarNumeros() {
  const numeros = [];        // guarda apenas os valores válidos, sem o zero
  const registro = [];       // histórico completo, para exibir na página
  let continuar = true;

  console.log("===== COLETA INICIADA (digite 0 para encerrar) =====");

  while (continuar) {
    const entrada = prompt(`Digite um número (${SENTINELA} para encerrar):`);

    // Cancelamento encerra a coleta como se fosse a sentinela
    if (entrada === null) {
      console.log("Coleta encerrada pelo usuário (Cancelar).");
      continuar = false;
      break;
    }

    const texto = String(entrada).trim().replace(",", ".");
    const numero = Number(texto);

    // Entrada inválida: avisa e volta ao início do laço sem contar
    if (texto === "" || isNaN(numero)) {
      console.log(`Valor inválido ignorado: "${entrada}"`);
      registro.push({ texto: entrada, tipo: "invalido" });
      alert("Valor inválido. Digite apenas números.");
      continue;
    }

    // Sentinela: encerra o laço e NÃO entra nas estatísticas
    if (numero === SENTINELA) {
      console.log("Zero digitado: encerrando a coleta.");
      registro.push({ texto: "0", tipo: "sentinela" });
      continuar = false;
      break;
    }

    numeros.push(numero);
    registro.push({ texto: String(numero), tipo: "valido" });
    console.log(`Número aceito: ${numero}`);
  }

  return { numeros: numeros, registro: registro };
}

// ---------- Cálculo das estatísticas ----------

function calcularEstatisticas(numeros) {
  // Caso especial: nenhum número válido foi digitado
  // (o usuário digitou 0 logo de início ou cancelou)
  if (numeros.length === 0) {
    return { vazio: true, quantidade: 0 };
  }

  let soma = 0;
  let maior = numeros[0];   // parte do primeiro elemento, não de 0
  let menor = numeros[0];   // usar 0 quebraria com números negativos

  for (let i = 0; i < numeros.length; i++) {
    const numero = numeros[i];

    soma += numero;

    if (numero > maior) { maior = numero; }
    if (numero < menor) { menor = numero; }
  }

  return {
    vazio: false,
    quantidade: numeros.length,
    soma: soma,
    media: soma / numeros.length,
    maior: maior,
    menor: menor
  };
}

// ---------- Saída no console ----------

function exibirNoConsole(estatisticas) {
  console.log("===== RESULTADO =====");

  if (estatisticas.vazio) {
    console.log("Nenhum número foi digitado além do zero.");
    console.log("Quantidade de números digitados: 0");
    console.log("Não há soma, média, maior ou menor a calcular.");
    console.log("=====================");
    return;
  }

  console.log(`Quantidade de números digitados: ${estatisticas.quantidade}`);
  console.log(`Soma dos números: ${estatisticas.soma}`);
  console.log(`Média dos valores: ${estatisticas.media.toFixed(2)}`);
  console.log(`Maior número digitado: ${estatisticas.maior}`);
  console.log(`Menor número digitado: ${estatisticas.menor}`);
  console.log("=====================");
}

// ---------- Saída na página ----------

function exibirNaPagina(estatisticas, registro) {
  const painel = document.getElementById("painel");

  if (estatisticas.vazio) {
    painel.setAttribute("data-estado", "vazio");
    document.getElementById("estadoTexto").textContent =
      "Nenhum número foi digitado além do zero.";

    ["valorQuantidade", "valorSoma", "valorMedia", "valorMaior", "valorMenor"]
      .forEach(function (id, indice) {
        document.getElementById(id).textContent = indice === 0 ? "0" : "—";
      });
  } else {
    painel.setAttribute("data-estado", "ok");
    document.getElementById("estadoTexto").textContent =
      `Coleta encerrada. ${estatisticas.quantidade} número(s) processado(s).`;

    document.getElementById("valorQuantidade").textContent = estatisticas.quantidade;
    document.getElementById("valorSoma").textContent = estatisticas.soma;
    document.getElementById("valorMedia").textContent = estatisticas.media.toFixed(2);
    document.getElementById("valorMaior").textContent = estatisticas.maior;
    document.getElementById("valorMenor").textContent = estatisticas.menor;
  }

  // Histórico da digitação
  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";

  if (registro.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "aguardando";
    vazio.textContent = "Nenhum valor registrado.";
    terminal.appendChild(vazio);
    return;
  }

  let contador = 0;

  registro.forEach(function (item) {
    const paragrafo = document.createElement("p");

    const indice = document.createElement("span");
    indice.className = "indice";

    if (item.tipo === "valido") {
      contador++;
      indice.textContent = String(contador).padStart(2, "0");
    } else {
      indice.textContent = "--";
      paragrafo.className = item.tipo;
    }

    paragrafo.appendChild(indice);
    paragrafo.appendChild(document.createTextNode(item.texto));

    if (item.tipo === "sentinela") {
      const marcador = document.createElement("span");
      marcador.className = "marcador";
      marcador.textContent = "sentinela: encerra o laço, não é contada";
      paragrafo.appendChild(marcador);
    }

    if (item.tipo === "invalido") {
      const marcador = document.createElement("span");
      marcador.className = "marcador";
      marcador.textContent = "valor inválido: ignorado";
      paragrafo.appendChild(marcador);
    }

    terminal.appendChild(paragrafo);
  });
}

// ---------- Programa principal ----------

function executar() {
  const coleta = coletarNumeros();
  const estatisticas = calcularEstatisticas(coleta.numeros);

  exibirNoConsole(estatisticas);
  exibirNaPagina(estatisticas, coleta.registro);
}

document.getElementById("btnIniciar").addEventListener("click", executar);

// ---------- Simulação com sequências prontas ----------

document.querySelectorAll("[data-sequencia]").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const valores = this.getAttribute("data-sequencia").split(",");
    const numeros = [];
    const registro = [];

    // Reproduz a mesma lógica do while, sem os prompts
    for (let i = 0; i < valores.length; i++) {
      const numero = Number(valores[i]);

      if (numero === SENTINELA) {
        registro.push({ texto: "0", tipo: "sentinela" });
        break;
      }

      numeros.push(numero);
      registro.push({ texto: String(numero), tipo: "valido" });
    }

    console.log(`===== SIMULAÇÃO: ${valores.join(", ")} =====`);
    const estatisticas = calcularEstatisticas(numeros);
    exibirNoConsole(estatisticas);
    exibirNaPagina(estatisticas, registro);
  });
});