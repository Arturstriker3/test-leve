# 🏥 API Serverless - Agenda Médica

Uma API serverless moderna que foi construída com **TypeScript** e **AWS Lambda**, onde foram implementados padrões arquiteturais inspirados no **NestJS**, com **injeção de dependência**, **estrutura modular**, **clean architecture** e **sistema de entities com filtros automatizados**.

## 📋 Índice

- [🏗️ Arquitetura](#-arquitetura)
- [🚀 Tecnologias](#-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚡ Início Rápido](#-início-rápido)
- [🔧 Desenvolvimento](#-desenvolvimento)
- [🧪 Testes](#-testes)
- [📡 API Endpoints](#-api-endpoints)
- [🏛️ Padrões Arquiteturais](#-padrões-arquiteturais)
- [📝 Exemplos de Código](#-exemplos-de-código)
- [🚀 Deploy](#-deploy)
- [📖 Extensão](#-extensão)

## 🏗️ Arquitetura

Foi implementada uma **arquitetura modular em camadas** com **separação de responsabilidades**, onde foram desenvolvidos **entities simplificadas** com **class-validator** e **sistema de filtros automatizado**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │────│  Lambda Handler │────│   Controller    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Inversify DI  │────│    Service      │────│   Entities      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Data Layer    │    │  Filter System  │
                       │  (Mocks/DB)     │    │ (Automated)     │
                       └─────────────────┘    └─────────────────┘
```

## 🚀 Tecnologias

### **Core**
Foram utilizadas as seguintes tecnologias principais:
- **TypeScript 5.1.6** - Foi escolhida como linguagem principal com tipagem estática
- **Node.js 18.x** - Foi utilizada como runtime JavaScript
- **AWS Lambda** - Foi implementada computação serverless
- **Serverless Framework 3.40.0** - Foi configurada infraestrutura como código

### **Dependency Injection & Validation**
Foram integradas as seguintes ferramentas:
- **Inversify 7.5.2** - Foi implementado container de injeção de dependência
- **Reflect-metadata 0.2.2** - Foi adicionado suporte a decorators
- **Class-validator 0.14.2** - Foi implementada validação declarativa com decorators
- **Class-transformer 0.5.1** - Foi desenvolvida transformação de objetos

### **Development & Testing**
Foram configuradas as seguintes ferramentas de desenvolvimento:
- **Jest 29.6.1** - Foi implementado framework de testes
- **ESLint 8.45.0** - Foi configurado linting de código
- **Serverless-offline 13.7.0** - Foi desenvolvido ambiente local
- **TypeScript ESLint** - Foram implementadas regras de lint específicas para TS

### **Utilities**
Foram adicionadas as seguintes utilidades:
- **UUID 9.0.0** - Foi implementada geração de identificadores únicos
- **AWS Lambda Types** - Foi adicionada tipagem para AWS Lambda

## 📁 Estrutura do Projeto

Foi estruturado o projeto da seguinte forma, onde foram organizados os módulos com **entities simplificadas** e **sistema de filtros automatizado**:

```
api-serveless/
├── 📂 src/                                    # Código fonte principal
│   ├── 🎯 modules/                            # Arquitetura modular implementada
│   │   ├── 🔧 shared/                         # Recursos compartilhados desenvolvidos
│   │   │   ├── 📦 container/                  # Injeção de dependência configurada
│   │   │   │   └── inversify.config.ts        # Container DI implementado
│   │   │   ├── 🏷️ decorators/                 # Decorators customizados criados
│   │   │   │   └── injectable.decorator.ts    # @Injectable decorator desenvolvido
│   │   │   ├── 📋 dto/                        # DTOs genéricos implementados
│   │   │   │   ├── pagination.dto.ts          # DTO de paginação criado
│   │   │   │   ├── pagination-query.dto.ts    # DTO para query params desenvolvido
│   │   │   │   ├── paginated-response.dto.ts  # DTO genérico paginado implementado
│   │   │   │   └── filter-query.dto.ts        # DTO base para filtros criado
│   │   │   ├── 🔗 interfaces/                 # Interfaces compartilhadas definidas
│   │   │   │   ├── base-response.interface.ts # Interface base implementada
│   │   │   │   ├── paginated-response.interface.ts # Interface paginada criada
│   │   │   │   ├── paginated-api-response.interface.ts # API paginada desenvolvida
│   │   │   │   ├── filter-config.interface.ts # Interface de filtros implementada
│   │   │   │   └── filterable.interface.ts    # Interface para entities filtráveis
│   │   │   ├── 🏗️ types/                      # Tipos e constantes definidos
│   │   │   │   ├── container-types.ts         # Símbolos do DI configurados
│   │   │   │   └── index.ts                   # Exportações centralizadas
│   │   │   └── 🛠️ utils/                      # Utilitários desenvolvidos
│   │   │       ├── pagination.util.ts         # Lógica de paginação implementada
│   │   │       ├── response-builder.util.ts   # Builder de respostas criado
│   │   │       ├── validation.util.ts         # Validação implementada
│   │   │       ├── filter.util.ts             # Sistema de filtros automatizado
│   │   │       └── validation.util.test.ts    # Testes de validação criados
│   │   │
│   │   ├── 📅 agenda/                         # Módulo de agenda implementado
│   │   │   ├── 🎮 controller/                 # Camada de controle desenvolvida
│   │   │   │   ├── agenda.controller.ts       # Controller principal criado
│   │   │   │   └── agenda.controller.test.ts  # Testes do controller implementados
│   │   │   ├── 📄 dto/                        # Data Transfer Objects criados
│   │   │   │   └── agenda-response.dto.ts     # DTO de resposta desenvolvido
│   │   │   ├── 🏗️ entities/                   # Entities simplificadas implementadas
│   │   │   │   └── agenda.entity.ts           # Entity com class-validator criada
│   │   │   ├── 🔗 interface/                  # Interfaces do domínio definidas
│   │   │   │   └── agenda-response.interface.ts # Interface de resposta criada
│   │   │   ├── 📂 mocks/                      # Dados mockados organizados
│   │   │   └── ⚙️ service/                    # Camada de negócio implementada
│   │   │       ├── agenda.service.ts          # Service principal desenvolvido
│   │   │       └── get-agendas.use-case.test.ts # Testes de caso de uso criados
│   │   │
│   │   └── 👩‍⚕️ medico/                          # Módulo de médicos implementado
│   │       ├── 🎮 controller/                 # Camada de controle desenvolvida
│   │       │   ├── medico.controller.ts       # Controller de médicos criado
│   │       │   └── medico.controller.test.ts  # Testes do controller implementados
│   │       ├── 📄 dto/                        # Data Transfer Objects criados
│   │       │   ├── medico.dto.ts              # DTO do médico desenvolvido
│   │       │   ├── medico-response.dto.ts     # DTO de resposta criado
│   │       │   └── medico-filter.dto.ts       # DTO de filtros implementado
│   │       ├── 🏗️ entities/                   # Entities simplificadas criadas
│   │       │   └── medico.entity.ts           # Entity com filtros automatizados
│   │       ├── 🔗 interface/                  # Interfaces do domínio definidas
│   │       │   └── medico.interface.ts        # Interface do médico criada
│   │       ├── 🎭 mocks/                      # Dados mockados organizados
│   │       │   └── medicos.mock.ts            # 5 médicos de exemplo implementados
│   │       └── ⚙️ service/                    # Camada de negócio desenvolvida
│   │           ├── medico.service.ts          # Service de médicos criado
│   │           └── medico.use-case.test.ts    # Testes de caso de uso implementados
│   │
│   ├── 🚀 handlers/                           # Lambda handlers implementados
│   │   ├── agenda.handler.ts                  # Handler da agenda criado
│   │   └── medico.handler.ts                  # Handler de médicos desenvolvido
│   ├── 🔧 utils/                              # Utilitários específicos AWS criados
│   │   └── lambda-response.util.ts            # Formatação de respostas Lambda
│   └── 📤 index.ts                            # Exportações públicas centralizadas
│
├── 📂 examples/                               # Exemplos de uso criados
│   └── api-requests.http                      # Requisições HTTP de teste implementadas
├── 📄 serverless.yml                          # Configuração Serverless Framework
├── 📄 tsconfig.json                           # Configuração TypeScript definida
├── 📄 package.json                            # Dependências e scripts configurados
├── 📄 jest.config.js                          # Configuração Jest implementada
└── 📄 README.md                               # Documentação do projeto atualizada
```

### 🎨 **Legenda de Ícones**

Foi implementado um sistema de ícones para facilitar a navegação:

| Ícone | Tipo | Descrição |
|-------|------|-----------|
| 🎯 | **Pasta Principal** | Foi criada para conter toda a arquitetura modular |
| 🔧 | **Shared/Utils** | Foram desenvolvidos recursos compartilhados entre módulos |
| 📅 | **Módulo Domínio** | Foi implementado módulo específico de agenda |
| 👩‍⚕️ | **Módulo Domínio** | Foi criado módulo específico de médicos |
| 🎮 | **Controller** | Foi desenvolvida camada de controle e orquestração |
| ⚙️ | **Service** | Foi implementada camada de lógica de negócio |
| 📄 | **DTO** | Foram criados Data Transfer Objects com validação |
| 🏗️ | **Entities** | Foram implementadas entities simplificadas com class-validator |
| 🔗 | **Interface** | Foram definidos contratos e tipos TypeScript |
| 🎭 | **Mocks** | Foram organizados dados de exemplo para desenvolvimento |
| 📦 | **Container** | Foi configurada injeção de dependência |
| 🏷️ | **Decorators** | Foram criados decorators customizados (@Injectable) |
| 🛠️ | **Utils** | Foram desenvolvidos utilitários e helpers |
| 🚀 | **Handlers** | Foram implementadas funções Lambda handlers |
| 📤 | **Exports** | Foram centralizadas exportações |

## ⚡ Início Rápido

Foi preparado um guia de início rápido:

### **Pré-requisitos**
Foram definidos os seguintes requisitos:
- Node.js 18.x ou superior
- npm ou yarn
- AWS CLI (para deploy)

### **1. Instalação**
Foi configurado o processo de instalação:
```bash
# Clonar o repositório
git clone <repository-url>
cd api-serveless

# Instalar dependências
npm install
```

### **2. Executar Localmente**
Foi implementado servidor local:
```bash
# Iniciar servidor local
npm start

# A API foi configurada para estar disponível em: http://localhost:3000
```

### **3. Testar**
Foram criados testes automatizados:
```bash
# Executar todos os testes
npm test

# Testar endpoint
curl http://localhost:3000/dev/agendas
curl "http://localhost:3000/dev/medicos?especialidade=Cardiologista&page=1&limit=2"
```

## 🔧 Desenvolvimento

Foram configurados os seguintes scripts de desenvolvimento:

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm start              # Foi implementado servidor local (serverless-offline)
npm run build          # Foi configurada compilação TypeScript
npm test               # Foram criados todos os testes
npm run lint           # Foi implementada verificação com ESLint
npm run lint:fix       # Foi desenvolvida correção automática de lint

# Deploy
npm run deploy         # Foi configurado deploy para AWS
npm run remove         # Foi implementada remoção da stack AWS
```

### **Configuração do Ambiente**

Foi preparada configuração de ambiente:
```bash
# Configurar AWS CLI (necessário para deploy)
aws configure

# Variáveis de ambiente foram definidas
export AWS_REGION=us-east-1
export STAGE=dev
```

## 🧪 Testes

Foi implementado um sistema abrangente de testes:

### **Estrutura de Testes**

```
📂 Testes Implementados/
├── 📂 Controller Tests/           # Foram criados testes de integração
│   ├── agenda.controller.test.ts  # Foi testada orquestração e DI
│   └── medico.controller.test.ts  # Foram implementados testes de filtros
├── 📂 Use Case Tests/            # Foram desenvolvidos testes de negócio
│   ├── get-agendas.use-case.test.ts # Foi testada lógica de domínio
│   └── medico.use-case.test.ts    # Foram criados testes de service
├── 📂 Utils Tests/               # Foram implementados testes de utilitários
│   ├── validation.util.test.ts    # Foi testada validação
│   └── filter.util.test.ts       # Foi testado sistema de filtros
```

### **Executar Testes**

Foram configurados comandos de teste:
```bash
# Todos os testes (56 testes implementados)
npm test

# Testes específicos foram organizados
npm test -- --testPathPattern=controller
npm test -- --testPathPattern=use-case
npm test -- --testPathPattern=utils

# Testes com coverage foram configurados
npm test -- --coverage

# Testes em modo watch foram implementados
npm test -- --watch
```

## 📡 API Endpoints

Foram implementados os seguintes endpoints:

### **GET /agendas**
Foi criado endpoint que retorna lista de médicos disponíveis com seus horários.

**Request:**
```http
GET /dev/agendas?page=1&limit=10
Content-Type: application/json
```

### **GET /medicos**
Foi implementado endpoint com sistema de filtros automatizado.

**Request:**
```http
GET /dev/medicos?especialidade=Cardiologista&page=1&limit=5
Content-Type: application/json
```

**Filtros Implementados:**
- `especialidade` - Foi criado filtro enum para especialidades
- `nome` - Foi implementado filtro string para nome
- `id` - Foi desenvolvido filtro numérico para ID

**Códigos de Status:**
- `200` - Sucesso (dados foram retornados)
- `400` - Erro de validação (filtros inválidos foram rejeitados)
- `500` - Erro interno do servidor

## 🏛️ Padrões Arquiteturais

Foram implementados os seguintes padrões arquiteturais:

### **1. Entities Simplificadas com Class-Validator**
Foi desenvolvido sistema onde entities são definidas com decorators:

```typescript
// Entity simplificada foi criada
export class MedicoEntity {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;

  @IsEnum(['Cardiologista', 'Dermatologista', 'Ortopedista', 'Pediatra', 'Neurologista'])
  especialidade!: string;

  @IsArray()
  @IsString({ each: true })
  horarios_disponiveis!: string[];

  // Configuração de filtros foi implementada estaticamente
  static getFilterConfig(): FilterConfig {
    return {
      id: { type: 'number', required: false },
      nome: { type: 'string', required: false },
      especialidade: { 
        type: 'enum', 
        allowedValues: ['Cardiologista', 'Dermatologista', 'Ortopedista', 'Pediatra', 'Neurologista'],
        required: false 
      }
    };
  }
}
```

### **2. Sistema de Filtros Automatizado**
Foi implementado sistema que descobre filtros automaticamente:

```typescript
// Sistema automatizado foi desenvolvido
export class FilterUtil {
  static async validateFiltersWithEntity<T extends object>(
    dtoClass: new () => T,
    queryParams: any,
    entityClass: { getFilterConfig(): FilterConfig }
  ): Promise<FilterResult<T>> {
    // Configuração foi extraída automaticamente da entity
    const filterConfig = entityClass.getFilterConfig();
    return this.validateFilters(dtoClass, queryParams, filterConfig);
  }
}
```

### **3. Injeção de Dependência**
Foi utilizado **Inversify** para gerenciar dependências:

```typescript
// Decorator customizado foi criado
@Injectable()
export class AgendaService {
  async getAgendas(): Promise<AgendaResponse> {
    return { medicos: medicosMock };
  }
}

// Injeção foi implementada no controller
@Injectable()
export class AgendaController {
  constructor(
    @inject(TYPES.AgendaService) 
    private readonly agendaService: AgendaService
  ) {}
}
```

### **4. Validação com Decorators**
Foram criados DTOs com **class-validator** para validação declarativa:

```typescript
export class MedicoDto {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;

  @IsString()
  especialidade!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  horarios_disponiveis!: string[];
}
```

### **5. Guard Clauses**
Foi implementada redução de aninhamento com **early returns**:

```typescript
async getAgendas(): Promise<BaseResponse<AgendaResponse>> {
  try {
    const agendas = await this.agendaService.getAgendas();
    return ResponseBuilder.success(agendas, 'Agendas retrieved successfully');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve agendas';
    return ResponseBuilder.error(message);
  }
}
```

### **6. Separation of Concerns**
Foi implementada separação de responsabilidades:
- **Handlers**: Foram configurados apenas para integração com AWS Lambda
- **Controllers**: Foi implementada orquestração e validação
- **Services**: Foi desenvolvida lógica de negócio
- **Entities**: Foram criadas com class-validator e configuração de filtros
- **DTOs**: Foi implementada validação e transformação
- **Interfaces**: Foram definidos contratos bem estabelecidos

## 📝 Exemplos de Código

### **Criar Nova Entity com Filtros**

Foi demonstrado como criar nova entity:

```typescript
// 1. Entity com class-validator foi implementada
export class NovaEntity {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;

  @IsEnum(['opcao1', 'opcao2', 'opcao3'])
  categoria!: string;

  // Configuração de filtros foi definida estaticamente
  static getFilterConfig(): FilterConfig {
    return {
      id: { type: 'number', required: false },
      nome: { type: 'string', required: false },
      categoria: { 
        type: 'enum', 
        allowedValues: ['opcao1', 'opcao2', 'opcao3'],
        required: false 
      }
    };
  }
}

// 2. Service foi implementado
@Injectable()
export class NovaEntityService {
  async getData(
    filters: Record<string, any>,
    pagination: PaginationParams
  ): Promise<PaginatedResponse<NovaEntity>> {
    // Filtros foram aplicados automaticamente
    const filtered = FilterUtil.applyFiltersWithEntity(
      mockData,
      filters,
      NovaEntity
    );
    
    return PaginationUtil.paginate(filtered, pagination);
  }
}

// 3. Controller foi desenvolvido
@Injectable()
export class NovaEntityController {
  constructor(
    @inject(TYPES.NovaEntityService) 
    private readonly service: NovaEntityService
  ) {}

  async get(queryParams?: any): Promise<BaseResponse<any>> {
    try {
      // Validação foi implementada automaticamente
      const filterValidation = await FilterUtil.validateFiltersWithEntity(
        NovaEntityFilterDto,
        queryParams || {},
        NovaEntity
      );

      if (!filterValidation.isValid) {
        return filterValidation.response!;
      }

      const data = await this.service.getData(
        filterValidation.data || {},
        { page: 1, limit: 10 }
      );
      
      return ResponseBuilder.successPaginated(data, 'Data retrieved successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error occurred';
      return ResponseBuilder.error(message);
    }
  }
}
```

### **Registrar no Container**

Foi mostrado como registrar no container:

```typescript
// container-types.ts - Símbolos foram definidos
export const TYPES = {
  // ... existing types
  NovaEntityService: Symbol.for('NovaEntityService'),
  NovaEntityController: Symbol.for('NovaEntityController'),
} as const;

// inversify.config.ts - Bindings foram configurados
container.bind(TYPES.NovaEntityService).to(NovaEntityService);
container.bind(TYPES.NovaEntityController).to(NovaEntityController);
```

## 🚀 Deploy

### **Deploy para AWS**

Foi configurado deploy para AWS:

```bash
# Deploy para ambiente de desenvolvimento foi implementado
npm run deploy

# Deploy para produção foi configurado
npx serverless deploy --stage production

# Deploy função específica foi desenvolvido
npx serverless deploy function --function getAgendas
npx serverless deploy function --function getMedicos
```

### **Configuração de Ambientes**

Foram definidas configurações de ambiente:

```yaml
# serverless.yml - Configurações foram implementadas
provider:
  name: aws
  runtime: nodejs18.x
  stage: ${opt:stage, 'dev'}
  region: ${opt:region, 'us-east-1'}
  environment:
    STAGE: ${self:provider.stage}
    LOG_LEVEL: ${self:custom.logLevel.${self:provider.stage}, 'info'}

custom:
  logLevel:
    dev: debug
    staging: info
    production: warn
```

### **Remover Deploy**

Foi implementada remoção de deploy:

```bash
# Remover stack completo foi configurado
npm run remove

# Remover ambiente específico foi desenvolvido
npx serverless remove --stage production
```

## 📖 Extensão

### **Adicionando Novos Módulos com Entities**

Foi demonstrado processo de extensão:

1. **Criar estrutura do módulo** foi implementada:
```bash
mkdir -p src/novo-modulo/{controller,service,dto,entities,interface,mocks}
```

2. **Implementar Entity com class-validator** foi desenvolvida seguindo o padrão estabelecido

3. **Configurar filtros estaticamente** na entity usando `getFilterConfig()`

4. **Registrar no container de DI** foi configurado

5. **Adicionar handler e rota** no `serverless.yml` foi implementado

6. **Criar testes unitários** foram desenvolvidos para todas as camadas

7. **Exportar no `index.ts`** foi configurado

### **Benefícios do Sistema Implementado**

Foram alcançados os seguintes benefícios:

- ✅ **Entities Simplificadas**: Foram criadas entities focadas apenas em dados e validação
- ✅ **Filtros Automatizados**: Foi implementado sistema que descobre filtros das entities
- ✅ **Type Safety**: Foi garantida tipagem forte em todo o sistema
- ✅ **Reutilização**: Foram desenvolvidos utilitários compartilhados entre módulos
- ✅ **Testes Abrangentes**: Foram criados 56 testes cobrindo todo o sistema
- ✅ **Clean Architecture**: Foi implementada separação clara de responsabilidades
- ✅ **Facilidade de Expansão**: Foi desenvolvido sistema que permite adicionar novos módulos rapidamente

---

**Foi desenvolvido usando TypeScript, Serverless Framework, Class-Validator e arquitetura modular com entities simplificadas e sistema de filtros automatizado** 🚀 