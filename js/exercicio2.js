/* =========================================================
   Exercício 2 — Client-side e server-side
   Arquivo: js/Exercicio2.js
   ========================================================= */

// ---------- Dados: classificação das seis operações ----------

const operacoes = [
  {
    titulo: "Validar se um campo obrigatório foi preenchido",
    tipo: "ambos",
    rotulo: "Ambos",
    justificativa:
      "No cliente, para dar retorno imediato e evitar uma ida desnecessária ao " +
      "servidor. No servidor, obrigatoriamente, porque a validação do cliente pode " +
      "ser burlada com o DevTools, com o JavaScript desativado ou com uma requisição " +
      "enviada por Postman/cURL. O cliente valida por conveniência; o servidor valida " +
      "por segurança."
  },
  {
    titulo: "Consultar dados sigilosos de um cliente",
    tipo: "server",
    rotulo: "Server-side",
    justificativa:
      "Os dados estão no banco, ao qual o navegador não tem — e não deve ter — acesso " +
      "direto. O servidor precisa verificar quem está pedindo, se essa pessoa tem " +
      "permissão e devolver somente o que ela pode ver. Fazer isso no cliente exporia " +
      "as credenciais do banco e permitiria que qualquer usuário lesse dados alheios."
  },
  {
    titulo: "Alterar a cor de um botão após um clique",
    tipo: "client",
    rotulo: "Client-side",
    justificativa:
      "É uma mudança puramente visual no DOM da página já carregada. Não envolve dados " +
      "persistentes nem regras de negócio, e enviá-la ao servidor causaria um atraso " +
      "perceptível e desnecessário."
  },
  {
    titulo: "Verificar login e senha em um banco de dados",
    tipo: "server",
    rotulo: "Server-side",
    justificativa:
      "Envolve consulta ao banco e comparação do hash da senha. As credenciais válidas " +
      "nunca podem ser enviadas ao navegador: se a comparação ocorresse no cliente, " +
      "bastaria ler o código-fonte para descobrir a senha. O cliente apenas coleta e " +
      "envia os dados por HTTPS."
  },
  {
    titulo: "Calcular o total de uma compra",
    tipo: "ambos",
    rotulo: "Ambos",
    justificativa:
      "No cliente, para exibir o subtotal em tempo real conforme o carrinho muda. No " +
      "servidor, o cálculo é refeito de forma autoritativa antes de fechar o pedido, " +
      "com os preços reais do banco, porque o usuário pode adulterar os valores " +
      "enviados pelo navegador. O valor cobrado é sempre o calculado no servidor."
  },
  {
    titulo: "Controlar uma sessão de usuário",
    tipo: "server",
    rotulo: "Server-side",
    justificativa:
      "A sessão é criada, armazenada, validada e expirada no servidor, que gera o " +
      "identificador ou token. O cliente participa apenas guardando o cookie e " +
      "reenviando-o a cada requisição, mas não decide se a sessão é válida — caso " +
      "contrário, qualquer um poderia forjar uma sessão de administrador."
  }
];

// ---------- Renderização da lista ----------

const listaOperacoes = document.getElementById("operacoes");

function montarLista() {
  operacoes.forEach(function (operacao) {
    const item = document.createElement("li");
    item.className = "operacao";
    item.setAttribute("data-tipo", operacao.tipo);

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.setAttribute("data-tipo", operacao.tipo);
    etiqueta.textContent = operacao.rotulo;

    const titulo = document.createElement("h3");
    titulo.textContent = operacao.titulo;

    const texto = document.createElement("p");
    texto.className = "justificativa";
    texto.textContent = operacao.justificativa;

    item.appendChild(etiqueta);
    item.appendChild(titulo);
    item.appendChild(texto);
    listaOperacoes.appendChild(item);
  });
}

// ---------- Filtros ----------

function aplicarFiltro(filtro) {
  const itens = document.querySelectorAll(".operacao");

  itens.forEach(function (item) {
    const combina = (filtro === "todos" || item.getAttribute("data-tipo") === filtro);
    item.classList.toggle("oculta", !combina);
  });

  console.log(`Filtro aplicado: ${filtro}`);
}

document.getElementById("filtros").addEventListener("click", function (evento) {
  const botao = evento.target.closest(".filtro");
  if (!botao) { return; }

  document.querySelectorAll(".filtro").forEach(function (b) {
    b.classList.remove("ativo");
  });
  botao.classList.add("ativo");

  aplicarFiltro(botao.getAttribute("data-filtro"));
});

// ---------- Demonstração: client-side ----------

const cores = ["#1d5d9b", "#2f5d50", "#8a5a1e", "#7a2e4a", "#1c1c1e"];
let indiceCor = 0;

document.getElementById("btnCor").addEventListener("click", function () {
  const inicio = performance.now();

  indiceCor = (indiceCor + 1) % cores.length;
  this.style.backgroundColor = cores[indiceCor];
  this.style.borderColor = cores[indiceCor];

  const duracao = performance.now() - inicio;
  document.getElementById("tempoCliente").textContent =
    `Executado no navegador em ${duracao.toFixed(2)} ms (sem rede).`;

  console.log(`[CLIENT-SIDE] Cor alterada em ${duracao.toFixed(2)} ms.`);
});

// ---------- Demonstração: server-side (simulado) ----------

/* Não há servidor real neste exercício. O setTimeout simula a latência
   de uma requisição HTTP: envio, processamento no servidor e retorno. */

function consultarSaldoNoServidor() {
  return new Promise(function (resolve) {
    const latencia = 600 + Math.random() * 700;   // entre 0,6 s e 1,3 s
    setTimeout(function () {
      resolve({ saldo: 2478.35, latencia: latencia });
    }, latencia);
  });
}

const botaoSaldo = document.getElementById("btnSaldo");
const tempoServidor = document.getElementById("tempoServidor");

botaoSaldo.addEventListener("click", async function () {
  botaoSaldo.disabled = true;
  tempoServidor.textContent = "Requisição enviada, aguardando o servidor…";
  console.log("[SERVER-SIDE] Requisição enviada ao servidor.");

  const inicio = performance.now();
  const resposta = await consultarSaldoNoServidor();
  const duracao = performance.now() - inicio;

  tempoServidor.textContent =
    `Resposta recebida em ${duracao.toFixed(0)} ms — saldo: R$ ${resposta.saldo.toFixed(2)}`;

  console.log(
    `[SERVER-SIDE] Resposta recebida em ${duracao.toFixed(0)} ms. ` +
    `Os dados vieram do servidor, não do navegador.`
  );

  botaoSaldo.disabled = false;
});

// ---------- Inicialização ----------

montarLista();

console.log("=== Exercício 2 — Classificação das operações ===");
operacoes.forEach(function (operacao, indice) {
  console.log(`${indice + 1}. ${operacao.titulo} => ${operacao.rotulo}`);
});
console.log("Regra prática: nunca confie em nada que venha do navegador.");