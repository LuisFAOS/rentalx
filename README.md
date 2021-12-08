# Rentalx
API developed on 'ignite' course of the rocketseat. The propose of the api is to rental cars registered on the same

## What I learn coding this project?
  - #### TypeScript
    - Em relação ao T.S. Eu já tinha uma boa noção de como utiliza-lo, acredito que o projeto só tenha me ajudado
      a praticar mais.
  ---
  - #### S.O.L.I.D and Clean Architecture
      ![solid](https://i2.wp.com/gokhan-gokalp.com/wp-content/uploads/2019/07/solid-principles.jpg?ssl=1)
    - S.O.L.I.D é um conjunto de principios que ajuda a deixar seu código mais limpo, coeso, testável<br/>
      S => O *Single responsibility principle* passa a ideia de que uma entidade (classe, método, função, etc)
      deve ter uma única razão de existir, um único propósito. Mas não leve isso ao extremo. O principio não quer
      dizer que sua classe não pode ter mais de um método, mas que tais métodos devem estar ligados diretamente em
      um único objetivo, E.X: Uma classe retangulo pode calcular sua área, ângulos dos vertices, pois todos essas
      funções estão relacionadas ao retângulo.
      <br/>
      O => *Open Close Principle* nos diz que uma entidade deve estar aberta para extenções, mas fechada para 
      modificações. Por exemplo: Um método de processamento, recebe um meio de pagamento
      e o valida, faz o pagamento e então conclui. Em um momento recebemos cartão de crédito, em outro, boleto,
      porém os dois tem processo de validações e pagamentos diferentes, como extendemos isso? Com um if novo?
      De acordo com OCP, não devemos modificar a base para extender a mesma. A solução aqui seria deixar as 
      responsabilidades de validar, fazer o pagemento e concluir na entidade de meio de pagamento(cartão, boleto, etc). 
      Com isso, para cada novo meio de pagamento, o método de processamento basta receber um instrumento e chamar seus métodos.
      Tais métodos deveram ser garantidos por um contrato/interface. Se toda vez que adicionarmos algo com intuito
      de extender a classe e ela precisa modificar o código base, algo está errado. Para resolver isso, usamos contratos/
      interfaces. Com isso, a extensão, encaixará perfeitamente sem necessidade de modificação no código base.
      <br/>
      L => *Liskov Substitution Principle* em poucas palavras, esse principio descreve que uma classe filha deve
      substituir uma classe pai<br/>
      I => *Interface Segregation Principle* também não é algo muito dificil de compreender. Uma classe não deve
      implementar interface onde há regra(s) em que a classe não pode seguir. Mais um exemplo: Uma interface Ave não 
      deve conter um método voar, pois pinguim, uma ave, não sabe voar. Para resolver tal problema, devemos "quebrar"
      a interface em vários pedaços<br/>
      D => *Dependency Inversion Principle* defende que, modules de alto nível, não devem depender de modulos de baixo
      nível, mas ambos devem depender de abstrações. Exemplo: O useCase não deve saber qual tipo de repositório ele está
      usando, mas sim que o mesmo segue um contrato
      <br/><br/>
      ![CleanArchitecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
      <br/>
      Já a Clean Architecture é um padrão arquitetural que visa a coesão, desacoplamento, facilidade na testabilidade, 
      facilidade na manutenção, reusabilidade e independência de frameworks/libs.<br/>
      **Entities:** Uma entidade, neste caso, seria uma classe, um objeto que representa um "ser" no seu projeto.
      Um usuário pode ser uma entidade (com seus atributos e seus métodos);
      Um carro, caso seu software trabalhe de alguma forma com carros. Todos esses são Entidades,
      todos tem atributos(caracteristicas do objeto) e métodos(regras, funções próprias do objeto).
      A Entity, junto com UseCase, faz parte do core da aplicação.
      <br/>
      **UseCases:** Nos casos de usos podemos encontrar as funcionalidades da aplicação assim como suas regras.
      São eles, useCases, que lançam exceções. Eles podem ser entendidos como orquestadores do fluxo de dados das entidades
      assim como utilizam das regras dessas entidades para seus objetivos.
      <br/>
      **(Controllers, Presenters and Gateways)/Interface Adapters:** O motivo dessa camada ter interface adapters é simples.
      Essa camada converte/transporta os dados do mundo externo(Frameworks, Drivers, UI, etc) pro mundo interno(useCase) e 
      vice-versa, ou seja, ele adapta dados.
      <br/>
      **(Devices, web, UI, DB and External Interfaces)/Frameworks & Drivers:** Pode-se dizer que a camada mais dependente 
      é essa, pois é aqui que estão os frameworks, libs, dependencias, etc<br/>
  ---
  - #### Folder structures
  - #### File Upload (Multer, Stream and CSV parser)
  - #### Documentation (Swagger)
  - #### Containerization (Docker)
  - #### Dependency injection (TSyringe)
  - #### ORM (TypeORM)
  - #### Test and TDD (Jest)

  - #### _REFERENCIAS:_<br/>
    - SOLID: <br/>
      -1. https://betterprogramming.pub/solid-principles-simple-and-easy-explanation-f57d86c47a7f <br/>
      -2. Rocketseat ignite, trilha Node.js <br/>
      -3. https://er-kalpanasharma.medium.com/solid-principles-4698765aefd1 <br/>
      -4. https://www.youtube.com/watch?v=6SfrO3D4dHM<br/>
    - C.A: <br/> 
      -5. https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html <br/>
      -6. https://engsoftmoderna.info/artigos/arquitetura-limpa.html
