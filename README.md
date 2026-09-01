# ds2-exercicios-javascript

Exercícios práticos da disciplina **Desenvolvimento para Servidores II**
(seção 6.17.4 das notas de aula — Professor Marcos Costa).

---

## Exercício 1 — Página estática e fluxo de uma requisição

O conteúdo pedido (definições, exemplos reais e a lista ordenada do caminho
entre navegador, servidor e resposta) está na página `index.html`.

### Em qual momento uma página dinâmica é processada?

A página dinâmica é processada **no servidor, depois que a requisição HTTP
chega e antes de a resposta ser enviada** ao navegador. O servidor web
identifica que o recurso não é um arquivo pronto, aciona o interpretador da
linguagem (PHP, Node.js, Python, Java), esse código executa a lógica da
aplicação, busca os dados necessários, monta o HTML final e só então devolve
tudo dentro do corpo da resposta. O navegador recebe HTML comum e não tem como
saber se ele foi lido de um arquivo ou gerado naquele instante.

Existe ainda um segundo momento de processamento dinâmico, já **no cliente**:
após a renderização inicial, o JavaScript pode alterar o DOM e buscar novos
dados via `fetch`/AJAX, atualizando trechos da página sem recarregá-la.

### Por que um banco de dados pode ser necessário?

Porque o conteúdo que varia precisa ficar guardado em algum lugar organizado e
persistente. O banco de dados é o que permite:

- **Persistência** — os dados sobrevivem ao fim da requisição e ao reinício do servidor;
- **Personalização** — cada usuário recebe uma página montada com os próprios dados;
- **Atualização sem reprogramação** — alterar um preço muda a página para todos, sem editar HTML;
- **Consulta eficiente** — filtros, ordenações e buscas em grandes volumes de registros;
- **Integridade e concorrência** — vários usuários gravando ao mesmo tempo sem corromper os dados;
- **Segurança e controle de acesso** — credenciais, permissões e sessões ficam separadas da camada de apresentação.

Sem banco de dados, cada mudança de conteúdo exigiria editar arquivos
manualmente — que é justamente a limitação da página estática.

## Exercício 2 — Client-side e server-side

Página: `Exercicio2.html` (com `css/Exercicio2.css` e `js/Exercicio2.js`).

### Tabela comparativa

| Critério | Client-side (lado do cliente) | Server-side (lado do servidor) |
|---|---|---|
| **Local de execução** | No navegador do usuário, na máquina dele (motor JavaScript: V8, SpiderMonkey) | Em um servidor remoto, sob controle do desenvolvedor/empresa |
| **Tecnologias de exemplo** | HTML, CSS, JavaScript, TypeScript, React, Vue, Angular | Node.js, PHP, Python (Django/Flask), Java (Spring), C# (.NET), Ruby on Rails, SQL |
| **Responsabilidades** | Interface, interatividade, manipulação do DOM, validação preliminar de formulários, animações, feedback imediato | Regras de negócio, autenticação e autorização, acesso ao banco de dados, validação definitiva, processamento de pagamentos, geração de relatórios, integração com APIs |
| **Vantagens** | Resposta instantânea sem esperar a rede; reduz o número de requisições; alivia a carga do servidor; melhora a experiência de uso | Código e dados ficam ocultos do usuário; segurança e confiabilidade; acesso direto ao banco; resultado independe do dispositivo; centraliza a lógica |
| **Limitações** | Todo o código é visível e alterável pelo usuário (basta abrir o DevTools); depende do hardware e do navegador; não deve tratar dados sigilosos; pode ser desativado | Cada operação consome recursos do servidor e gera latência de rede; custo de infraestrutura; precisa escalar conforme o número de usuários |
| **Tarefas adequadas** | Máscara de CPF/telefone, mostrar e ocultar campos, validar formato de e-mail antes do envio, carrossel de imagens, tema claro/escuro, contador de caracteres | Conferir senha, emitir nota fiscal, salvar pedido, calcular frete com base em tabela oficial, enviar e-mail, gerar token de sessão, consultar histórico do cliente |

### Classificação das operações

| # | Operação | Classificação | Justificativa |
|---|---|---|---|
| 1 | Validar se um campo obrigatório foi preenchido | **Ambos** | No cliente, para dar retorno imediato e evitar uma ida ao servidor. No servidor, obrigatoriamente, porque a validação do cliente pode ser burlada (DevTools, JavaScript desativado, requisição enviada por Postman/cURL). O cliente valida por conveniência; o servidor valida por segurança. |
| 2 | Consultar dados sigilosos de um cliente | **Server-side** | Os dados estão no banco, ao qual o navegador não tem — e não deve ter — acesso direto. O servidor precisa verificar quem está pedindo, se essa pessoa tem permissão e devolver somente o que ela pode ver. Fazer isso no cliente exporia credenciais de banco e permitiria que qualquer usuário lesse dados alheios. |
| 3 | Alterar a cor de um botão após um clique | **Client-side** | É uma mudança puramente visual no DOM da página já carregada. Não envolve dados persistentes nem regras de negócio, e enviá-la ao servidor causaria atraso desnecessário. |
| 4 | Verificar login e senha em um banco de dados | **Server-side** | Envolve consulta ao banco e comparação de hash de senha. As credenciais válidas nunca podem ser enviadas ao navegador — se a comparação ocorresse no cliente, bastaria ler o código-fonte para descobrir a senha. O cliente apenas coleta e envia os dados por HTTPS. |
| 5 | Calcular o total de uma compra | **Ambos** | No cliente, para exibir o subtotal em tempo real conforme o carrinho muda. No servidor, o cálculo é refeito de forma autoritativa antes de fechar o pedido, com os preços reais do banco, porque o usuário pode adulterar valores enviados pelo navegador. O valor cobrado é sempre o calculado no servidor. |
| 6 | Controlar uma sessão de usuário | **Server-side** | A sessão é criada, armazenada, validada e expirada no servidor, que gera o identificador ou token. O cliente participa apenas guardando o cookie/token e reenviando a cada requisição, mas não decide se a sessão é válida — caso contrário, qualquer um poderia forjar uma sessão de administrador. |

**Regra prática:** o que serve à experiência de uso pode ficar no cliente; o que
envolve segurança, dinheiro ou dados persistentes precisa ficar no servidor.
Nunca confie em nada que venha do navegador.

## Exercício 3 — Primeiro script e diagnóstico pelo console

Página: `Exercicio3.html` (com `css/Exercicio3.css` e `js/exercicio01.js`).

O script exibe no console, em chamadas separadas:

- o nome completo do aluno;
- o nome do curso;
- uma funcionalidade que o aluno gostaria de desenvolver com JavaScript;
- a mensagem `JavaScript carregado com sucesso!`.

### Erro provocado intencionalmente

Após trocar `console.log` por `Console.log`, a mensagem exibida no console foi:

Uncaught TypeError: Console.log is not a function
at exercicio01.js:24

> Em alguns navegadores, quando o identificador não existe no contexto, o erro
> aparece como `Uncaught ReferenceError: Console is not defined`.

**Motivo do erro:** o JavaScript é *case sensitive*, ou seja, diferencia letras
maiúsculas de minúsculas. O objeto global disponibilizado pelo navegador para
escrever mensagens de diagnóstico chama-se `console`, com "c" minúsculo. Ao
escrever `Console`, o interpretador procura por um identificador diferente:
encontra a interface `Console` (o construtor), que não possui o método `log`
acessível dessa forma, e a chamada falha com `TypeError`. Como o erro é
lançado em tempo de execução, ele interrompe o script naquele ponto — por isso
nenhuma linha posterior seria executada, caso houvesse.

O código foi corrigido de volta para `console.log`. A linha com erro permanece
comentada no arquivo, apenas para registro.

### Evidências

Capturas salvas na pasta `evidencias/`:

- `exercicio01-execucao.png` — console exibindo as quatro mensagens corretamente;
- `exercicio01-erro.png` — console exibindo o `TypeError` após a troca por `Console.log`.

## Exercício 4 — Variáveis e tipos de dados

Página: `Exercicio4.html` (com `css/Exercicio4.css` e `js/exercicio02.js`).

| Declaração | Variável | Valor | `typeof` |
|---|---|---|---|
| `const` | `nome` | `"Michael Douglas Alves Tolentino"` | `string` |
| `let` | `idade` | `22` | `number` |
| `const` | `cidade` | `"São Roque"` | `string` |
| `const` | `matriculado` | `true` | `boolean` |
| `const` | `nota` | `8.5` | `number` |

**Por que `const` e por que `let`:** `nome`, `cidade`, `matriculado` e `nota`
não mudam durante a execução, então usam `const`, que impede a reatribuição e
comunica essa intenção a quem lê o código. `idade` usa `let` porque é o único
valor sujeito a alteração (aniversário, correção de cadastro).

Vale registrar que `const` não significa valor imutável, e sim referência não
reatribuível: em arrays e objetos declarados com `const`, o conteúdo ainda pode
ser modificado, apenas a variável não pode apontar para outro valor.

A página traz dois botões que demonstram isso na prática: um tenta reatribuir a
`const` e captura o `TypeError`, o outro incrementa a `let` normalmente.

## Exercício 5 — Entrada de dados e concatenação

Página: `Exercicio5.html` (com `css/Exercicio5.css` e `js/exercicio03.js`).

O programa solicita nome, idade, curso e cidade por meio de `prompt()` e exibe a
apresentação no console em duas versões.

**Solução 1 — concatenação com `+`:**

```js
const apresentacaoConcatenada =
  "Olá, meu nome é " + nome +
  ", tenho " + idade +
  " anos, moro em " + cidade +
  " e estou cursando " + curso + ".";
```

**Solução 2 — template string:**

```js
const apresentacaoTemplate =
  `Olá, meu nome é ${nome}, tenho ${idade} anos, moro em ${cidade} e estou cursando ${curso}.`;
```

As duas produzem exatamente o mesmo texto — o script confirma isso comparando os
resultados com `===`. A diferença está na escrita: com o operador `+`, o texto é
fragmentado e cada espaço precisa ser digitado dentro das aspas (esquecer um
espaço gera `tenho22`, um erro silencioso e frequente). Com template string, o
texto fica contínuo, os espaços ficam naturalmente no lugar, é possível quebrar
linha diretamente e usar expressões dentro de `${}`.

Vale registrar que todo valor devolvido por `prompt()` é do tipo `string`,
inclusive a idade — a tabela da página mostra o `typeof` de cada campo. Aqui
isso não causa problema porque a idade apenas é exibida; no Exercício 6, em que
ela entra em um cálculo, a conversão se torna obrigatória.

## Exercício 6 — Conversão de dados e cálculo de idade

Página: `Exercicio6.html` (com `css/Exercicio6.css` e `js/exercicio04.js`).

O programa solicita a idade, exibe o valor original devolvido pelo `prompt()` e
o seu tipo, converte para número com `Number()`, soma cinco anos e apresenta o
resultado. Entradas vazias ou não numéricas são rejeitadas com `isNaN()`.

### Por que `20 + 5` pode resultar em `205`

A função `prompt()` **sempre devolve uma string**, mesmo quando o usuário digita
apenas números. Ao digitar `20`, a variável recebe o texto `"20"` e não o
número `20`.

No JavaScript o operador `+` tem dois papéis. Se os dois operandos forem
números, ele soma; se pelo menos um deles for string, ele passa a ser operador
de **concatenação** e converte o outro operando para texto:

```js
const idade = prompt("Idade:");   // usuário digita 20  ->  idade vale "20" (string)

console.log(idade + 5);           // "20" + 5  ->  "20" + "5"  ->  "205"
console.log(Number(idade) + 5);   //  20  + 5  ->  25
```

Esse comportamento se chama *coerção de tipo*. A solução é converter a entrada
antes de calcular, usando `Number(idade)`, `parseInt(idade, 10)` ou o operador
unário `+idade`, e verificar o resultado com `isNaN()` para rejeitar textos que
não representam números.

Detalhe útil na depuração: os operadores `-`, `*` e `/` não têm essa
ambiguidade e convertem para número automaticamente — `"20" - 5` resulta em
`15`. Apenas o `+` é sobrecarregado, e é por isso que só ele produz o `205`.

| Expressão | Resultado | Tipo | O que acontece |
|---|---|---|---|
| `"20" + 5` | `"205"` | string | Um operando é string, então o `+` concatena |
| `Number("20") + 5` | `25` | number | Ambos são números, o `+` soma |
| `"20" - 5` | `15` | number | O `-` converte automaticamente |
| `+"20" + 5` | `25` | number | O `+` unário converte antes da soma |
| `parseInt("20a")` | `20` | number | Lê os dígitos iniciais e ignora o resto |
| `Number("20a")` | `NaN` | number | Exige a string inteira válida |