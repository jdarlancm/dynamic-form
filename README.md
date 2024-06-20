# Dynamic Form

Um componentes React para simplificar e modularizar a criação UI que manipulam entidades, abrangendo operações como listagem, criação, atualização, exclusão e outros (CRUD). os componentes são projetados para serem configuráveis e responsivos, garantindo uma ótima experiência do usuário em diferentes dispositivos.

Foi desenvolvido utilizando Typescript e o Tailwind CSS para estilização.

O projeto nasceu da frustação de ter que reimplentar, a cada projeto e para cada entidade do sistema, interfaces e ações repetitivas e tediosas de CRUD. Esse componente que encapsula a criação dessas interfaces com base em entidades, de uma maneira simples de usar.

### Obetivos
- Configuração fácil
- Responsividade
- Reutilização de código



# Instalação

Este projeto ainda não é uma biblioteca instalável, para utilizar deve-se copiar os componentes EntityForm e Form (/app/components) para o seu projeto.

Para padronizar e tornar as cores padronizáveis, há uma constante de cores (EntityBrowser/colors.ts) que é utilizada nos componentes. Sendo que o Tailwind gera as classes durante o processo de build e remove todas as classes que não são explicitamente usadas no código para otimizar o tamanho do arquivo CSS final. Por isso, para que o tailwind renderize corretamente os componente é necessário informar as classes que deve gerar, mesmo que não esteja explicito no código. Para isso deve ser colocado esse trecho no tailwind.config.ts:

```json
safelist: [
    "bg-blue-500",
    "bg-blue-600",
    "text-blue-500",
    "bg-green-500",
    "bg-green-600",
    "text-white",
    {
      pattern: /(bg|text|border)-gray-(100|200|300|400|500|600|700|800|900)/,
      variants: ["", "hover", "dark", "dark:hover"],
    },
  ],
```

Obs.: Caso faça mudanças no esquema de cores padrão é necessário ajustar os valores.

Como ainda não é uma biblioteca é necessário que faça a instalação das dependências utilizadas pelo EntityBrowser. Pode fazer manualmente ou adicionar essas dependências ao seu package.json:

```json
"dependencies": {
    "@hookform/resolvers": "3.4.2",
    "date-fns": "3.6.0",
    "react-currency-input-field": "3.8.0",
    "react-hook-form": "7.51.5",
    "react-icons": "5.2.1",
    "react-input-mask": "2.0.4",
    "react-select": "5.8.0",
    "zod": "3.23.8"
  },
  "devDependencies": {
    "@types/react-input-mask": "3.0.5",
    "postcss": "8",
    "tailwindcss": "3.4.1",
    "typescript": "5"
  }
```

Obs.: Lembre-se de executar o `yarn install`

Feito isso o componente estará pronto para ser utilizado.

# Como Usar

## 1) Criar os EntityForms

O projeto desenvolvido para trabalhar com entidades, por isso, é necessário que o seu projeto tenham interfaces que representem essas entidades. Para tornar a parte visual customizável foi criada uma tipagem EntityForm e para cada entidade é necessário criar uma classe que implemente a EntityForm.

O EntityForm contém definições para cada entidade que permite a correta renderização do componente e suas ações. Ele encapsula a entidade, suas ações o schema que permite a deinifição dos formulários, listagem e filtros. Ele permite que o EntityBrowser possa ser usado para diferentes entidades.


```jsx
export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: Date | null;
  registrationDeadline: Date | null;
  location: string;
  price: number;
}

class EventForm implements EntityForm<Event> {
  object: Event;

  newObject = {...};

  constructor(event: Event) {
    this.object = event;
  }

  onCreate(object: Event): ActionReturn {...}

  onUpdate(object: Event): ActionReturn {...}

  onDelete(object: Event): ActionReturn {...}

  /* if necessary put other custom actions  */

  createFormSchema(action: FormAction): FormField[] {...}

  baseSchema: FormField[] = [...]

  export default EventForm;
```

**IMPORTANTE:** As tipagens utilizadas pelo componente podem ser encontradas em `Form/Form.types.ts` e `EntityBrowser/EntityBrowser.types.ts`.

## 2) Definir o metodo fetch da entidade

Para que os dados da entidade possam ser listados no componente é necessário passar, via props, um método fetch que recebe os filtros e informações para paginar os dados. E ter como retorno dados do tipo `PaginatedData<Entity>`:

```jsx
const fetchEvents = async (
  page: number,
  pageSize: number = 10,
  filters?: Filter[]
): Promise<PaginatedData<Event>> => { 
  ... 
  return { paginatedData, totalPages };
}
```

## 3) Criar o EntityBrowser

Com apenas essas duas definições já é possível criar o EntityForm que irá:
- Listar os objetos da sua entidade
- Filtrar essa listagem
- Criar uma nova entidade
- Editar uma entidade existente
- Apagar uma entidade existente

```jsx
const fetchEvent {...}
const eventForm = new EventForm({...})
<EntityBrowser<Event>
        title="Events Manager"
        fetchEntities={fetchEvents}
        entityForm={eventForm}
      />
```

![uso do EntityBrowser](/docs/images/EntityBrowser.png)

### Properties
| Nome  | Tipo | Default | Descrição |
| ------------- | ------------- | ------------- | ------------- |
| title  | string  | | Título a ser exibido no componente EntityBrowser |
| entityForm  | EntityForm  | | objeto instanciado da classe que implementa uma EntityForm |
| fetchEntities  | ( number, number, Filter[] ) => Promise<PaginatedData<T>>  | | método que realiza o fetch dos dados a serem listados no EntityBrowser |
| pageSize?  | number  | 10 | tamanho da paginação da listagem. |
| mainActions?  | MainAction[]  | | Ações que não envolva uma entidade especifica (item da listagem) e que não seja o Create. |


# Inputs de formulário
Para que o componente seja dinâmico há um mapeamento dos tipos de campos. Os tipos que atualmente estão mapeados para serem usados corretamente no formulário são:
- text
- textarea
- date
- email
- currency
- number
- int
- select

Esses tipos podem ser verificados em [FieldTypes](/src/components/Form/Form.types.ts) e o vinculo com os seus respectivos componentes em [FiledRegistry](/src/components/Form/FieldRegisty.ts)
Caso precise 

# Exemplos

Neste projeto há exemplos práticos de como utilizar os componentes usando como exemplo o [Event](/src/app/event/page.tsx) e [Participant](/src/app/participant/page.tsx).

# Screenshots

## Tela prinicipal em visualização normal
![](/docs/images/entitybrowser-normalview-dark.png)

## Tela prinicipal em visualização normal
![](/docs/images/EntityBrowser-small-dark.png)


# Próximas Features
[] Inputs autocomplete para grande volume de dados (fetch)
[] Exibicao do label dos select na listagem do EntityBrowser