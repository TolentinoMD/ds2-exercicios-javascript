const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "1234";

// ---------- Programa principal ----------

function fazerLogin() {
  const usuario = prompt("Usuário:");
  const senha = prompt("Senha:");

  // Comparação estrita (===): confere valor E tipo, sem conversão.
  // O && exige que as duas condições sejam verdadeiras.
  if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
    console.log("Acesso permitido");
    exibirResultado("permitido", "Acesso permitido", "Usuário e senha conferem.");
  } else {
    console.log("Acesso negado");
    exibirResultado("negado", "Acesso negado", "Usuário ou senha incorretos.");
  }

  // Diagnóstico separado, apenas para acompanhar pelo console.
  // Em um sistema real NUNCA se informa qual dos dois campos errou:
  // isso ajudaria um atacante a descobrir usuários válidos.
  console.log("--- Diagnóstico (apenas didático) ---");
  console.log(`usuario === "${USUARIO_CORRETO}" ?`, usuario === USUARIO_CORRETO);
  console.log(`senha === "${SENHA_CORRETA}" ?`, senha === SENHA_CORRETA);
}

function exibirResultado(estado, mensagem, detalhe) {
  const painel = document.getElementById("painel");
  painel.setAttribute("data-estado", estado);

  document.getElementById("icone").textContent = estado === "permitido" ? "✓" : "✕";
  document.getElementById("mensagem").textContent = mensagem;
  document.getElementById("detalhe").textContent = detalhe;
}

document.getElementById("btnIniciar").addEventListener("click", fazerLogin);

// ---------- Tabela de comparações reais ----------

const comparacoes = [
  {
    expressao: '"admin" === "admin"',
    valor: "admin" === "admin",
    porque: "Mesmo valor e mesmo tipo (string)."
  },
  {
    expressao: '"admin" === "Admin"',
    valor: "admin" === "Admin",
    porque: "Strings diferenciam maiúsculas de minúsculas."
  },
  {
    expressao: '"1234" === 1234',
    valor: "1234" === 1234,
    porque: "Mesmo valor aparente, mas tipos diferentes: string e number."
  },
  {
    expressao: '"1234" == 1234',
    valor: "1234" == 1234,
    porque: "O == converte a string para número antes de comparar."
  },
  {
    expressao: '"" == 0',
    valor: "" == 0,
    porque: "Coerção: string vazia vira 0. Um dos casos mais confusos do ==."
  },
  {
    expressao: '"" === 0',
    valor: "" === 0,
    porque: "Sem conversão, string vazia e número zero são coisas distintas."
  },
  {
    expressao: 'null == undefined',
    valor: null == undefined,
    porque: "O == trata os dois como equivalentes."
  },
  {
    expressao: 'null === undefined',
    valor: null === undefined,
    porque: "São tipos diferentes; o === separa os dois casos."
  }
];

const corpoComparacoes = document.getElementById("corpoComparacoes");

comparacoes.forEach(function (item) {
  const linha = document.createElement("tr");

  const colExpressao = document.createElement("td");
  colExpressao.className = "mono";
  colExpressao.textContent = item.expressao;

  const colValor = document.createElement("td");
  const etiqueta = document.createElement("span");
  etiqueta.className = `booleano ${item.valor}`;
  etiqueta.textContent = String(item.valor);
  colValor.appendChild(etiqueta);

  const colPorque = document.createElement("td");
  colPorque.textContent = item.porque;

  linha.appendChild(colExpressao);
  linha.appendChild(colValor);
  linha.appendChild(colPorque);
  corpoComparacoes.appendChild(linha);
});

// ---------- Demonstração do bug do "=" dentro do if ----------

document.getElementById("btnBug").addEventListener("click", function () {
  let usuarioTeste = "invasor";
  let relato = "";

  // Forma CORRETA
  if (usuarioTeste === USUARIO_CORRETO) {
    relato += 'Com ===  : entrou no if (não deveria)\n';
  } else {
    relato += 'Com ===  : não entrou no if (correto)\n';
  }

  // Forma ERRADA: atribuição no lugar da comparação.
  // A expressão devolve "admin", que é um valor truthy,
  // então o if é SEMPRE verdadeiro e a variável foi sobrescrita.
  if (usuarioTeste = USUARIO_CORRETO) {
    relato += 'Com =    : entrou no if (BUG: sempre verdadeiro)\n';
  } else {
    relato += 'Com =    : não entrou no if\n';
  }

  relato += `Valor de usuarioTeste após o "=": "${usuarioTeste}"`;

  document.getElementById("saidaBug").textContent = relato;
  console.log("===== BUG DO = DENTRO DO IF =====");
  console.log(relato);
  console.log('A variável começou como "invasor" e foi sobrescrita para "admin" pela própria condição.');
});