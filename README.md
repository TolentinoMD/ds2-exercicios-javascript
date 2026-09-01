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

## Exercício 7 — Classificação do voto

Página: `Exercicio7.html` (com `css/Exercicio7.css` e `js/exercicio05.js`).

O programa solicita a idade e classifica a situação eleitoral:

| Faixa | Condição | Saída |
|---|---|---|
| Entrada inválida | vazio, texto, negativo ou cancelado | `Idade inválida` |
| Menos de 16 anos | `idade < 16` | `Não pode votar` |
| 16 ou 17 anos | `idade < 18` | `Voto opcional` |
| 18 anos ou mais | demais casos | `Voto obrigatório` |

### Detalhes da implementação

**Ordem das condições.** Como cada `else if` só é avaliado quando o anterior
falha, ao chegar em `idade < 18` já se sabe que a idade é 16 ou maior. Escrever
`idade >= 16 && idade < 18` seria redundante.

**Validação em camadas.** São testados, antes da classificação: `null`
(usuário clicou em Cancelar), string vazia, texto não numérico e valor
negativo. Cada caso devolve um motivo distinto, o que facilita o diagnóstico.

Dois cuidados importantes: `trim()` é necessário porque `Number("   ")` devolve
`0`, e sem ele uma entrada só com espaços seria classificada como
`Não pode votar` em vez de `Idade inválida`. E `isNaN()` é necessário porque
`Number("abc")` devolve `NaN` — como toda comparação com `NaN` é falsa, sem essa
verificação um texto qualquer cairia no último `else` e retornaria
`Voto obrigatório`.

A página inclui uma bateria de doze testes automáticos, cobrindo os casos de
borda (15, 16, 17, 18, 0, negativo, vazio, espaços, texto e cancelamento), com
a comparação entre o resultado obtido e o esperado.

## Exercício 8 — Sistema acadêmico de notas

Página: `Exercicio8.html` (com `css/Exercicio8.css` e `js/exercicio06.js`).

O programa solicita o nome do aluno e duas notas, calcula a média e exibe uma
ficha com nome, notas, média com uma casa decimal e situação final.

| Faixa da média | Condição | Situação |
|---|---|---|
| Nota fora de 0 a 10 | `nota < 0 \|\| nota > 10` | Rejeitada |
| Menor que 5 | `media < 5` | `Reprovado` |
| De 5 a 6,9 | `media < 7` | `Recuperação` |
| De 7 a 10 | `media >= 7` | `Aprovado` |

### Detalhes da implementação

**Arredondamento só na exibição.** `toFixed(1)` é aplicado apenas na saída; a
classificação usa o valor completo da média. Isso evita um erro sutil: uma média
de 6,95 seria exibida como `7.0`, mas continua sendo menor que 7 e, portanto,
`Recuperação`. Classificar sobre o texto arredondado aprovaria o aluno
indevidamente. Vale lembrar também que `toFixed()` devolve *string*, não número
— por isso ele nunca aparece dentro de uma comparação ou de um cálculo.

**Vírgula como separador decimal.** A validação faz `replace(",", ".")` antes de
converter, porque é assim que se digita nota no Brasil. Sem isso,
`Number("7,5")` devolveria `NaN` e a nota seria rejeitada sem motivo real.

**Ordem das condições.** Ao chegar em `media >= 5`, já se sabe que a média é
menor que 7, porque a condição anterior falhou. A comparação dupla
`media >= 5 && media < 7` seria redundante.

A página inclui uma bateria de doze testes cobrindo os limites das faixas (7,0
exato, 5,0 exato, 6,9/7,1) e as rejeições (nota 11, nota negativa, texto e campo
vazio).

## Exercício 9 — Login simples

Página: `Exercicio9.html` (com `css/Exercicio9.css` e `js/exercicio07.js`).

O programa solicita usuário e senha e compara com `admin` / `1234` usando
comparação estrita. Se ambos conferirem, exibe `Acesso permitido`; caso
contrário, `Acesso negado`.

```js
if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
  console.log("Acesso permitido");
} else {
  console.log("Acesso negado");
}
```

### Diferença entre `=` e `===`

| Operador | Nome | O que faz |
|---|---|---|
| `=` | Atribuição | Coloca um valor dentro de uma variável e devolve esse valor |
| `==` | Igualdade solta | Compara apenas o valor, convertendo tipos antes (coerção) |
| `===` | Igualdade estrita | Compara valor **e** tipo, sem nenhuma conversão |

O `=` não pergunta nada, apenas grava. Como a expressão devolve o valor
atribuído, usar `=` dentro de um `if` faz a condição ser **sempre verdadeira** e
ainda sobrescreve a variável — e o pior é que isso não gera erro algum: o
programa roda e entrega o resultado errado em silêncio. A página traz um botão
que demonstra exatamente esse bug, mostrando a variável sendo sobrescrita pela
própria condição.

O `===` compara sem converter: `"1234" === 1234` é `false`, porque um é string e
o outro é número. Já o `==` converte antes, então `"1234" == 1234` é `true` —
e também `"" == 0` é `true`, um dos casos mais confusos da linguagem. Por isso a
recomendação é usar sempre `===`.

Aqui o `===` é essencial: `prompt()` sempre devolve string, e a comparação
estrita garante que a senha seja exatamente o texto `"1234"`.

### Observação de segurança

Este login é **client-side** e serve apenas para praticar condicionais: as
credenciais estão no código-fonte, visíveis para qualquer pessoa que abra o
DevTools. Em um sistema real a verificação ocorre no servidor, a senha é
armazenada como *hash* e nunca chega ao navegador — como discutido no
Exercício 2. Outro detalhe: a mensagem de erro não deve informar qual dos dois
campos está errado, pois isso ajudaria um atacante a descobrir usuários válidos.
O diagnóstico campo a campo aparece no console apenas por ser um exercício.

## Exercício 10 — Tabuada com `for`

Página: `Exercicio10.html` (com `css/Exercicio10.css` e `js/exercicio08.js`).

O programa solicita um número inteiro e usa um laço `for` para exibir a tabuada
de 1 a 10:

```js
for (let i = 1; i <= 10; i++) {
  console.log(`${numero} x ${i} = ${numero * i}`);
}
```

Saída para o número 5:

## Exercício 11 — Entrada contínua com `while`

Página: `Exercicio11.html` (com `css/Exercicio11.css` e `js/exercicio09.js`).

O programa solicita números continuamente até que o usuário digite `0` e, ao
final, exibe quantidade, soma, média, maior e menor valor.

### Por que `while` e não `for`

| Aspecto | `for` | `while` |
|---|---|---|
| Nº de repetições | Conhecido antes de começar | Desconhecido: depende da execução |
| Critério de parada | Um contador atinge o limite | Um evento ocorre (digitar `0`) |
| Neste exercício | Não serve | Adequado |

O valor `0` é uma **sentinela**: um marcador que sinaliza o fim da entrada. Como
é controle e não dado, ele encerra o laço com `break` **antes** de ser somado ou
contado, e por isso não aparece nas estatísticas.

### Tratamento do primeiro valor igual a zero

Se o usuário digitar `0` logo de início, o array de números fica vazio. Sem
tratamento, a média seria `0 / 0`, que resulta em `NaN`, e maior e menor ficariam
indefinidos. A função `calcularEstatisticas()` verifica `length === 0` antes de
qualquer cálculo e devolve um resultado próprio para esse caso, exibindo
"Nenhum número foi digitado além do zero" e quantidade `0`.

### Inicialização de maior e menor

`maior` e `menor` partem de `numeros[0]`, e não de `0`:

```js
let maior = numeros[0];
let menor = numeros[0];
```

Se partissem de zero, uma sequência só com negativos (`-8, -2, -15`) devolveria
`0` como maior — valor que o usuário nunca digitou. A página tem um botão de
simulação com essa sequência exatamente para demonstrar o problema.

### `continue` e `break`

`continue` volta ao início do laço sem executar o resto do corpo, usado para
descartar entradas inválidas sem contá-las. `break` sai do laço de vez, usado
quando a sentinela aparece.

## Exercício 12 — Login com limite de tentativas

Página: `Exercicio12.html` (com `css/Exercicio12.css` e `js/exercicio10.js`).

Nova versão do login do Exercício 9, agora com no máximo três tentativas.

| Elemento | Código | Papel |
|---|---|---|
| Repetição | `while (tentativa <= 3)` | Repete enquanto houver tentativas |
| Condicional | `if (usuario === ... && senha === ...)` | Decide entre acerto e erro |
| Saída antecipada | `break` | Encerra o laço quando o acesso é permitido |
| Sinalizador | `let autenticado = false` | Guarda o motivo da saída do laço |
| Contador | `tentativa++` | Avança a contagem e garante o fim do laço |

### Por que o sinalizador é necessário

O laço pode terminar de duas formas: por `break` (o usuário acertou) ou porque a
condição ficou falsa (as tentativas se esgotaram). Depois do `while` não há como
distinguir os dois casos apenas olhando o contador — em ambos ele vale 3. A
variável `autenticado` guarda essa informação e é o que permite escolher entre
`Acesso permitido` e `Acesso bloqueado`.

### Cálculo das tentativas restantes

`MAX_TENTATIVAS - tentativa` devolve 2 na primeira tentativa, 1 na segunda e 0
na terceira. Como a mensagem "restam 0 tentativas" não faz sentido, um `if`
separa os dois textos: nas duas primeiras falhas o programa informa quantas
chances sobraram; na terceira, apenas registra o erro e o laço termina,
resultando no bloqueio.

### Observação de segurança

Como no Exercício 9, este login é **client-side**: as credenciais estão no
código-fonte e o bloqueio existe apenas na memória da página, sumindo ao
recarregar. Em um sistema real a contagem de tentativas fica no servidor,
associada à conta ou ao IP, geralmente com espera progressiva entre as
tentativas para dificultar ataques de força bruta.

## Exercício 13 — Funções, parâmetros e retorno

Página: `Exercicio13.html` (com `css/Exercicio13.css` e `js/exercicio11.js`).

| Assinatura | Parâmetros | Retorno | Responsabilidade |
|---|---|---|---|
| `somar(numero1, numero2)` | 2 números | `number` | Devolve a soma |
| `calcularMedia(nota1, nota2)` | 2 números | `number` | Devolve a média aritmética |
| `classificarMedia(media)` | 1 número | `string` | `Aprovado`, `Recuperação` ou `Reprovado` |
| `criarSaudacao(nome)` | 1 texto | `string` | Mensagem personalizada |

Os retornos são armazenados em variáveis antes de serem exibidos:

```js
const soma = somar(7, 3);
const media = calcularMedia(8, 6);
const situacao = classificarMedia(media);
const saudacao = criarSaudacao("Michael Douglas");
```

### Decisões de implementação

**`return` em vez de `console.log` dentro da função.** Nenhuma das quatro
funções escreve no console: cada uma apenas devolve um valor, e quem chama
decide o que fazer com ele. Se a função imprimisse internamente, retornaria
`undefined` e o resultado seria impossível de reaproveitar — não daria para
guardar em variável nem passar adiante.

**Retorno antecipado.** Em `classificarMedia()`, cada `return` encerra a função
na hora. Como o fluxo não continua depois de um `return`, não é preciso escrever
`else`: ao chegar na segunda comparação já se sabe que a média é menor que 7.

**Responsabilidade única.** `calcularMedia()` calcula e não classifica;
`classificarMedia()` classifica e não calcula. É isso que permite compor as
duas: `classificarMedia(calcularMedia(8, 6))`.

**Parâmetro e argumento.** Parâmetro é o nome na declaração (`numero1`);
argumento é o valor passado na chamada (`7`). O parâmetro só existe dentro da
função.

Essas mesmas funções são reaproveitadas sem alteração no desafio final — o ganho
concreto de organizar os cálculos em funções em vez de repetir a lógica em cada
arquivo.

## Desafio final integrador — Sistema acadêmico

Página: `DesafioFinal.html` (com `css/DesafioFinal.css` e `js/desafio-final.js`).

Sistema executado no navegador que cadastra vários alunos em sequência. Para
cada um: solicita nome e curso, pede duas notas validadas entre 0 e 10, calcula
a média por meio de uma função, classifica a situação por meio de outra, exibe a
ficha completa no console e pergunta se há outro aluno. Ao encerrar, apresenta o
total cadastrado.

| Função | Retorno | Responsabilidade |
|---|---|---|
| `lerTexto(mensagem)` | `string \| null` | Pede um texto e insiste enquanto vier vazio |
| `lerNota(mensagem)` | `number \| null` | Pede uma nota e insiste enquanto não estiver entre 0 e 10 |
| `calcularMedia(n1, n2)` | `number` | Devolve a média aritmética |
| `classificarSituacao(media)` | `string` | `Aprovado`, `Recuperação` ou `Reprovado` |
| `exibirFicha(aluno)` | `undefined` | Imprime a ficha formatada no console |
| `desejaContinuar()` | `boolean` | Pergunta se há outro aluno e interpreta a resposta |

### Decisões de implementação

**Reaproveitamento.** `calcularMedia()` e `classificarSituacao()` são as mesmas
do Exercício 13, sem nenhuma alteração. Isso só foi possível porque elas apenas
recebem parâmetros e retornam valores, sem depender de `prompt`, `console` ou
DOM — o ponto discutido naquele exercício.

**Validação com laço, não com aborto.** `lerNota()` usa um `while` interno que
insiste até receber um valor válido, em vez de cancelar o cadastro. Um erro de
digitação não obriga o usuário a recomeçar tudo.

**Cancelamento.** Se o usuário clicar em Cancelar, `prompt()` devolve `null`. As
funções propagam esse `null` e o laço principal encerra com `break`, evitando
gravar um aluno pela metade.

**Estado acumulado.** O array `alunos` é declarado fora do laço, por isso
sobrevive a cada volta. É ele que permite contar o total ao final e calcular as
estatísticas da turma.

**`alunos.length = 0` em vez de `alunos = []`.** Como a lista foi declarada com
`const`, a referência não pode ser reatribuída, mas o conteúdo pode ser
alterado — exatamente o ponto levantado no Exercício 4 sobre `const` significar
"não reatribuível" e não "imutável".

**Arredondamento só na exibição.** Como no Exercício 8, `toFixed(1)` é aplicado
apenas na saída; a classificação usa o valor completo da média.