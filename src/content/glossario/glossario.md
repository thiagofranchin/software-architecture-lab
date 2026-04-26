# Glossário

Termos chave da arquitetura de software, com definições curtas e exemplos rápidos.

## Acoplamento

Medida do quanto dois módulos dependem um do outro. Acoplamento alto significa que mudar um obriga a mudar o outro. **Reduzir** acoplamento normalmente custa indireção; vale a pena onde mudanças são frequentes.

## Camada

Conjunto de módulos que compartilham um mesmo propósito (ex.: apresentação, aplicação, domínio, infraestrutura). Camadas devem fluir em uma direção: cada uma depende apenas das que estão "abaixo".

## Coesão

Medida do quanto os elementos dentro de um módulo pertencem juntos. **Alta coesão** significa que tudo dentro do módulo serve à mesma finalidade. Coesão alta + acoplamento baixo é o ideal de qualquer arquitetura.

## DTO (Data Transfer Object)

Objeto cuja única função é transportar dados entre fronteiras (API, banco, UI). Não tem comportamento, não tem regra. Ajuda a evitar que detalhes de uma fronteira vazem para a outra.

## Mapper

Função que converte um formato em outro: DTO em entidade de domínio, resposta da API em modelo da UI, etc. Concentra a tradução em um único lugar testável.

## Repository (Repository Pattern)

Abstração que esconde **como** os dados são persistidos por trás de uma interface (`save`, `findById`, `delete`). O resto do código fala com o repositório, não com o banco diretamente — assim trocar o banco não quebra o domínio.

## Schema (de validação)

Definição declarativa do formato esperado de um dado (ex.: Zod, Yup). Ao validar entrada de usuário ou resposta de API contra um schema, você ganha uma fronteira segura entre o mundo externo e o seu domínio.

## Service

Módulo que orquestra operações específicas — geralmente comunicação com o mundo externo (HTTP, fila, e-mail). Não contém regra de negócio: chama, transforma, devolve.

## Use Case

Função (ou classe) que representa **uma ação significativa do sistema** ("EnviarProposta", "CalcularFrete"). É onde a regra de negócio vive, isolada de UI e de infraestrutura, e por isso testável sem mocks pesados.
