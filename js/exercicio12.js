const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";
const MAX_TENTATIVAS = 3;

let bloqueado = false;   // impede novo login após o bloqueio

// ---------- Programa principal ----------

function fazerLogin() {
  if (bloqueado) {
    alert("Acesso bloqueado. Clique em Reiniciar para tentar novamente.");
    return;
  }

  let tentativa = 1;
  let autenticado = false;      // sinalizador: por que o laço terminou
  const historico = [];

  console.log("===== LOGIN COM LIMITE DE TENTATIVAS =====");

  // ESTRUTURA DE REPETIÇÃO: repete enquanto houver tentativas
  while (tentativa <= MAX_TENTATIVAS) {

    const usuario = prompt(`Usuário (tentativa ${tentativa} de ${MAX_TENTATIVAS}):`);
    const senha = prompt("Senha:");

    // ESTRUTURA CONDICIONAL: decide entre acertar e errar
    if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
      autenticado = true;
      historico.push({ tentativa: tentativa, tipo: "sucesso", texto: "Acesso permitido" });
      console.log("Acesso permitido");
      break;                    // encerra o laço imediatamente
    }

    // Errou: calcula quantas tentativas ainda restam
    const restantes = MAX_TENTATIVAS - tentativa;

    if (restantes > 0) {
      const aviso = `Dados incorretos. Tentativas restantes: ${restantes}`;
      historico.push({ tentativa: tentativa, tipo: "falha", texto: aviso });
      console.log(aviso);
      alert(aviso);
    } else {
      historico.push({ tentativa: tentativa, tipo: "falha", texto: "Dados incorretos. Nenhuma tentativa restante." });
      console.log("Dados incorretos. Nenhuma tentativa restante.");
    }

    tentativa++;                // avança o contador
  }

  // Após o laço: o sinalizador diz qual foi o desfecho
  if (autenticado) {
    exibirResultado("permitido", "Acesso permitido", `Autenticado na tentativa ${tentativa} de ${MAX_TENTATIVAS}.`, tentativa, true);
  } else {
    bloqueado = true;
    historico.push({ tentativa: "--", tipo: "bloqueio", texto: "Acesso bloqueado" });
    console.log("Acesso bloqueado");
    exibirResultado("bloqueado", "Acesso bloqueado", `As ${MAX_TENTATIVAS} tentativas foram esgotadas.`, MAX_TENTATIVAS, false);
  }

  exibirHistorico(historico);
}

// ---------- Saída na página ----------

function exibirResultado(estado, mensagem, detalhe, tentativasUsadas, sucesso) {
  const painel = document.getElementById("painel");
  painel.setAttribute("data-estado", estado);

  const icones = { permitido: "✓", bloqueado: "✕", erro: "!" };
  document.getElementById("icone").textContent = icones[estado] || "?";
  document.getElementById("mensagem").textContent = mensagem;
  document.getElementById("detalhe").textContent = detalhe;

  // Pinta os marcadores conforme as tentativas consumidas
  const marcadores = document.querySelectorAll(".marcador");

  marcadores.forEach(function (marcador, indice) {
    marcador.className = "marcador";
    const numero = indice + 1;

    if (numero < tentativasUsadas) {
      marcador.classList.add("gasta");
    } else if (numero === tentativasUsadas) {
      marcador.classList.add(sucesso ? "sucesso" : "bloqueio");
    }
  });

  document.getElementById("btnIniciar").disabled = (estado === "bloqueado" || estado === "permitido");
}

function exibirHistorico(historico) {
  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";

  historico.forEach(function (item) {
    const paragrafo = document.createElement("p");
    paragrafo.className = item.tipo;

    const indice = document.createElement("span");
    indice.className = "indice";
    indice.textContent = item.tentativa === "--" ? "--" : String(item.tentativa).padStart(2, "0");

    paragrafo.appendChild(indice);
    paragrafo.appendChild(document.createTextNode(item.texto));
    terminal.appendChild(paragrafo);
  });
}

// ---------- Reinício ----------

function reiniciar() {
  bloqueado = false;

  const painel = document.getElementById("painel");
  painel.setAttribute("data-estado", "aguardando");

  document.getElementById("icone").textContent = "?";
  document.getElementById("mensagem").textContent = "Aguardando tentativa de login…";
  document.getElementById("detalhe").textContent = "O resultado aparece aqui e também no console.";

  document.querySelectorAll(".marcador").forEach(function (marcador) {
    marcador.className = "marcador";
  });

  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";
  const vazio = document.createElement("p");
  vazio.className = "aguardando";
  vazio.textContent = "Nenhuma tentativa registrada ainda.";
  terminal.appendChild(vazio);

  document.getElementById("btnIniciar").disabled = false;
  console.log("Contador de tentativas reiniciado.");
}

document.getElementById("btnIniciar").addEventListener("click", fazerLogin);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);