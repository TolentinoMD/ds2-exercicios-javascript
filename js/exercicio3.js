/* =========================================================
   Exercício 3 — Primeiro script e diagnóstico pelo console
   Arquivo: js/exercicio01.js
   Aluno: Michael Douglas Alves Tolentino
   ========================================================= */

// --- Saída principal: cada informação em uma chamada separada ---

console.log("Nome completo: Michael Douglas Alves Tolentino");
console.log("Curso: Sistemas para Internet");
console.log("Funcionalidade desejada: um painel de notas que calcula a média do semestre automaticamente");
console.log("JavaScript carregado com sucesso!");

/* ---------------------------------------------------------
   ERRO PROVOCADO INTENCIONALMENTE

   A linha abaixo é a versão com erro, mantida comentada para
   registro. Ela foi executada uma vez, a captura de tela foi
   salva em evidencias/ e o código foi corrigido em seguida.

   Console.log("JavaScript carregado com sucesso!");

   Mensagem exibida pelo navegador:

       Uncaught TypeError: Console.log is not a function
           at exercicio01.js:24

   Motivo: o JavaScript é case sensitive, ou seja, diferencia
   maiúsculas de minúsculas. O objeto global do navegador para
   escrever no console chama-se "console", com "c" minúsculo.
   Ao escrever "Console", o interpretador encontra outro
   identificador — a interface/construtor Console — que não
   expõe o método log dessa forma, e a chamada falha.
   --------------------------------------------------------- */

// --- Botão que reproduz o erro sob demanda, para a evidência ---

const botaoErro = document.getElementById("btnErro");
const statusErro = document.getElementById("statusErro");

botaoErro.addEventListener("click", function () {
  try {
    // Chamada incorreta, com "C" maiúsculo: dispara TypeError.
    Console.log("JavaScript carregado com sucesso!");
  } catch (erro) {
    // O try/catch impede que o script pare, mas o erro é registrado.
    console.error(erro);
    statusErro.textContent = `${erro.name}: ${erro.message}`;
    console.log(
      "Motivo: o JavaScript diferencia maiúsculas de minúsculas. " +
      "O objeto correto é 'console', com c minúsculo."
    );
  }
});