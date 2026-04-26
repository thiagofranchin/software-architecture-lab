# Glossário

Termos chave da arquitetura de software, com definições curtas e exemplos rápidos.

## Adapter (Adaptador)

Design pattern estrutural que converte a interface de uma classe em outra que o cliente espera. Funciona como um tradutor: permite que dois módulos incompatíveis colaborem sem que nenhum deles precise mudar.

## Acoplamento

Medida do quanto dois módulos dependem um do outro. Acoplamento alto significa que mudar um obriga a mudar o outro. **Reduzir** acoplamento normalmente custa indireção; vale a pena onde mudanças são frequentes.

## Camada

Conjunto de módulos que compartilham um mesmo propósito (ex.: apresentação, aplicação, domínio, infraestrutura). Camadas devem fluir em uma direção: cada uma depende apenas das que estão "abaixo".

## Code Smell

Sinal no código que indica um problema potencial — não um bug, mas algo que dificulta leitura, manutenção ou evolução. Exemplos: método longo, classe gigante, código duplicado, variável com nome vago. Code smells guiam a refatoração.

## Coesão

Medida do quanto os elementos dentro de um módulo pertencem juntos. **Alta coesão** significa que tudo dentro do módulo serve à mesma finalidade. Coesão alta + acoplamento baixo é o ideal de qualquer arquitetura.

## Design Pattern (Padrão de Projeto)

Solução reutilizável e nomeada para um problema recorrente de design. Não é código copiável, é um vocabulário compartilhado: quando alguém fala "Strategy", toda a equipe entende a estrutura sem precisar explicar do zero.

## Dependency Injection (Injeção de Dependência)

Técnica em que um módulo recebe suas dependências de fora em vez de criá-las internamente. Quem instancia decide qual implementação entregar — o módulo só declara o que precisa. Resultado: código mais testável e menos acoplado a implementações concretas.

## DTO (Data Transfer Object)

Objeto cuja única função é transportar dados entre fronteiras (API, banco, UI). Não tem comportamento, não tem regra. Ajuda a evitar que detalhes de uma fronteira vazem para a outra.

## Factory (Fábrica)

Design pattern criacional que centraliza a lógica de instanciação. Em vez de usar `new` espalhado pelo código, você chama uma função ou método fábrica que decide qual objeto criar. Facilita troca de implementações e torna os pontos de criação explícitos.

## Mapper

Função que converte um formato em outro: DTO em entidade de domínio, resposta da API em modelo da UI, etc. Concentra a tradução em um único lugar testável.

## Observer (Observador)

Design pattern comportamental que define uma relação 1-N entre objetos: quando um objeto (o sujeito) muda de estado, todos os seus observadores são notificados automaticamente. Base de sistemas de eventos, reactive programming e gerenciadores de estado.

## Repository (Repository Pattern)

Abstração que esconde **como** os dados são persistidos por trás de uma interface (`save`, `findById`, `delete`). O resto do código fala com o repositório, não com o banco diretamente — assim trocar o banco não quebra o domínio.

## Refatoração

Processo de reestruturar código existente sem alterar seu comportamento externo. O objetivo é melhorar legibilidade, reduzir duplicação e facilitar futuras mudanças — não adicionar funcionalidade. Refatoração segura exige testes que provem que o comportamento não mudou.

## Schema (de validação)

Definição declarativa do formato esperado de um dado (ex.: Zod, Yup). Ao validar entrada de usuário ou resposta de API contra um schema, você ganha uma fronteira segura entre o mundo externo e o seu domínio.

## Separação de Responsabilidades (SoC)

Princípio que determina que cada módulo deve ter uma razão clara e única para existir. Quando um componente mistura lógica de negócio, acesso a dados e apresentação, qualquer mudança afeta os três — SoC resolve isso dividindo essas preocupações em módulos distintos.

## Service Layer (Camada de Serviço)

Camada que coordena operações de aplicação: recebe comandos, orquestra repositórios e outros serviços, e devolve resultados. Mantém as regras de negócio isoladas de detalhes de entrega (HTTP, fila, CLI) e de infraestrutura (banco, e-mail).

## Service

Módulo que orquestra operações específicas — geralmente comunicação com o mundo externo (HTTP, fila, e-mail). Não contém regra de negócio: chama, transforma, devolve.

## Strategy (Estratégia)

Design pattern comportamental que encapsula uma família de algoritmos intercambiáveis por trás de uma interface comum. Em vez de usar `if/else` ou `switch` para escolher comportamentos, você troca o objeto strategy em runtime — mantendo o código aberto para extensão e fechado para modificação.

## Use Case

Função (ou classe) que representa **uma ação significativa do sistema** ("EnviarProposta", "CalcularFrete"). É onde a regra de negócio vive, isolada de UI e de infraestrutura, e por isso testável sem mocks pesados.
