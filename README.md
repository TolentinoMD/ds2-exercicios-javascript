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