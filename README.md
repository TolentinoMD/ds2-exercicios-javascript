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