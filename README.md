# 🏥 API Serverless - Agenda Médica

Uma API serverless moderna construída com **TypeScript** e **AWS Lambda**, seguindo padrões arquiteturais inspirados no **NestJS**, com **injeção de dependência**, **estrutura modular** e **clean architecture**.

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

A aplicação segue uma **arquitetura modular em camadas** com **separação de responsabilidades**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │────│  Lambda Handler │────│   Controller    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Inversify DI  │────│    Service      │────│      DTOs       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Data Layer    │
                       │  (Mocks/DB)     │
                       └─────────────────┘
```

## 🚀 Tecnologias

### **Core**
- **TypeScript 5.1.6** - Linguagem principal com tipagem estática
- **Node.js 18.x** - Runtime JavaScript
- **AWS Lambda** - Computação serverless
- **Serverless Framework 3.40.0** - Infraestrutura como código

### **Dependency Injection & Validation**
- **Inversify 7.5.2** - Container de injeção de dependência
- **Reflect-metadata 0.2.2** - Suporte a decorators
- **Class-validator 0.14.2** - Validação declarativa com decorators
- **Class-transformer 0.5.1** - Transformação de objetos

### **Development & Testing**
- **Jest 29.6.1** - Framework de testes
- **ESLint 8.45.0** - Linting de código
- **Serverless-offline 13.7.0** - Desenvolvimento local
- **TypeScript ESLint** - Regras de lint específicas para TS

### **Utilities**
- **UUID 9.0.0** - Geração de identificadores únicos
- **AWS Lambda Types** - Tipagem para AWS Lambda

## 📁 Estrutura do Projeto

```
api-serveless/
├── 📂 src/                          # Código fonte
│   ├── 📂 shared/                   # Recursos compartilhados
│   │   ├── 📂 container/            # Configuração DI (Inversify)
│   │   │   └── inversify.config.ts  # Setup do container
│   │   ├── 📂 decorators/           # Decorators customizados
│   │   │   └── injectable.decorator.ts
│   │   ├── 📂 interfaces/           # Interfaces compartilhadas
│   │   │   └── base-response.interface.ts
│   │   ├── 📂 types/               # Tipos e constantes
│   │   │   ├── container-types.ts  # Símbolos do DI
│   │   │   └── index.ts            # Exportações
│   │   └── 📂 utils/               # Utilitários compartilhados
│   │       └── response-builder.util.ts
│   ├── 📂 utils/                   # Utilitários específicos
│   │   └── lambda-response.util.ts # Formatação Lambda
│   ├── 📂 handlers/                # Handlers das funções Lambda
│   │   └── agenda.handler.ts       # Handler da agenda
│   ├── 📂 agenda/                  # Módulo de domínio
│   │   ├── 📂 controller/          # Camada de controle
│   │   │   ├── agenda.controller.ts
│   │   │   └── agenda.controller.test.ts
│   │   ├── 📂 service/             # Camada de negócio
│   │   │   ├── agenda.service.ts
│   │   │   └── get-agendas.use-case.test.ts
│   │   ├── 📂 dto/                 # Data Transfer Objects
│   │   │   ├── medico.dto.ts
│   │   │   └── agenda-response.dto.ts
│   │   ├── 📂 interface/           # Interfaces do domínio
│   │   │   ├── medico.interface.ts
│   │   │   └── agenda-response.interface.ts
│   │   └── 📂 mocks/               # Dados mockados
│   │       └── medicos.mock.ts
│   └── index.ts                    # Ponto de entrada
├── 📂 examples/                    # Exemplos de uso
│   └── api-requests.http           # Requisições HTTP
├── 📄 serverless.yml              # Configuração Serverless
├── 📄 tsconfig.json               # Configuração TypeScript
├── 📄 package.json                # Dependências e scripts
├── 📄 jest.config.js              # Configuração Jest
└── 📄 README.md                   # Documentação
```

## ⚡ Início Rápido

### **Pré-requisitos**
- Node.js 18.x ou superior
- npm ou yarn
- AWS CLI (para deploy)

### **1. Instalação**
```bash
# Clonar o repositório
git clone <repository-url>
cd api-serveless

# Instalar dependências
npm install
```

### **2. Executar Localmente**
```bash
# Iniciar servidor local
npm start

# A API estará disponível em: http://localhost:3000
```

### **3. Testar**
```bash
# Executar todos os testes
npm test

# Testar endpoint
curl http://localhost:3000/dev/agendas
```

## 🔧 Desenvolvimento

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm start              # Inicia servidor local (serverless-offline)
npm run build          # Compila TypeScript
npm test               # Executa todos os testes
npm run lint           # Verifica código com ESLint
npm run lint:fix       # Corrige problemas de lint automaticamente

# Deploy
npm run deploy         # Deploy para AWS
npm run remove         # Remove stack da AWS
```

### **Configuração do Ambiente**

```bash
# Configurar AWS CLI (necessário para deploy)
aws configure

# Variáveis de ambiente
export AWS_REGION=us-east-1
export STAGE=dev
```

## 🧪 Testes

### **Estrutura de Testes**

```
📂 Testes/
├── 📂 Controller Tests/           # Testes de integração
│   └── agenda.controller.test.ts  # Testa orquestração e DI
└── 📂 Use Case Tests/            # Testes de negócio
    └── get-agendas.use-case.test.ts # Testa lógica de domínio
```

### **Executar Testes**

```bash
# Todos os testes
npm test

# Testes específicos
npm test -- --testPathPattern=controller
npm test -- --testPathPattern=use-case

# Testes com coverage
npm test -- --coverage

# Testes em modo watch
npm test -- --watch
```

### **Resultado dos Testes**
```
✅ PASS  src/agenda/controller/agenda.controller.test.ts
✅ PASS  src/agenda/service/get-agendas.use-case.test.ts

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        5.217 s
```

## 📡 API Endpoints

### **GET /agendas**
Retorna lista de médicos disponíveis com seus horários.

**Request:**
```http
GET /dev/agendas
Content-Type: application/json
```

**Response:**
```json
{
  "data": {
    "medicos": [
      {
        "id": 1,
        "nome": "Dr. João Silva",
        "especialidade": "Cardiologista",
        "horarios_disponiveis": [
          "2024-10-05 09:00",
          "2024-10-05 10:00",
          "2024-10-05 11:00"
        ]
      },
      {
        "id": 2,
        "nome": "Dra. Maria Souza",
        "especialidade": "Dermatologista",
        "horarios_disponiveis": [
          "2024-10-06 14:00",
          "2024-10-06 15:00"
        ]
      }
    ]
  },
  "message": "Agendas retrieved successfully",
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Códigos de Status:**
- `200` - Sucesso
- `500` - Erro interno do servidor

## 🏛️ Padrões Arquiteturais

### **1. Injeção de Dependência**
Utilizamos **Inversify** para gerenciar dependências:

```typescript
// Decorator customizado
@Injectable()
export class AgendaService {
  async getAgendas(): Promise<AgendaResponse> {
    return { medicos: medicosMock };
  }
}

// Injeção no controller
@Injectable()
export class AgendaController {
  constructor(
    @inject(TYPES.AgendaService) 
    private readonly agendaService: AgendaService
  ) {}
}
```

### **2. Validação com Decorators**
DTOs com **class-validator** para validação declarativa:

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

### **3. Guard Clauses**
Redução de aninhamento com **early returns**:

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

### **4. Separation of Concerns**
- **Handlers**: Apenas integração com AWS Lambda
- **Controllers**: Orquestração e validação
- **Services**: Lógica de negócio
- **DTOs**: Validação e transformação
- **Interfaces**: Contratos bem definidos

## 📝 Exemplos de Código

### **Criar Novo Módulo**

```typescript
// 1. Interface
export interface NovoModulo {
  id: number;
  nome: string;
}

// 2. DTO
export class NovoModuloDto {
  @IsNumber()
  id!: number;

  @IsString()
  nome!: string;
}

// 3. Service
@Injectable()
export class NovoModuloService {
  async getData(): Promise<NovoModulo[]> {
    return mockData;
  }
}

// 4. Controller
@Injectable()
export class NovoModuloController {
  constructor(
    @inject(TYPES.NovoModuloService) 
    private readonly service: NovoModuloService
  ) {}

  async get(): Promise<BaseResponse<NovoModulo[]>> {
    try {
      const data = await this.service.getData();
      return ResponseBuilder.success(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error occurred';
      return ResponseBuilder.error(message);
    }
  }
}
```

### **Registrar no Container**

```typescript
// container-types.ts
export const TYPES = {
  // ... existing types
  NovoModuloService: Symbol.for('NovoModuloService'),
  NovoModuloController: Symbol.for('NovoModuloController'),
} as const;

// inversify.config.ts
container.bind(TYPES.NovoModuloService).to(NovoModuloService);
container.bind(TYPES.NovoModuloController).to(NovoModuloController);
```

## 🚀 Deploy

### **Deploy para AWS**

```bash
# Deploy para ambiente de desenvolvimento
npm run deploy

# Deploy para produção
npx serverless deploy --stage production

# Deploy função específica
npx serverless deploy function --function getAgendas
```

### **Configuração de Ambientes**

```yaml
# serverless.yml
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

```bash
# Remover stack completo
npm run remove

# Remover ambiente específico
npx serverless remove --stage production
```

## 📖 Extensão

### **Adicionando Novos Endpoints**

1. **Criar estrutura do módulo**:
```bash
mkdir -p src/novo-modulo/{controller,service,dto,interface,mocks}
```

2. **Implementar camadas seguindo o padrão existente**

3. **Registrar no container de DI**

4. **Adicionar handler e rota no `serverless.yml`**

5. **Criar testes unitários**

6. **Exportar no `index.ts`**

### **Integrando com Banco de Dados**

```typescript
// Exemplo de integração com DynamoDB
@Injectable()
export class AgendaService {
  constructor(
    @inject(TYPES.DynamoRepository) 
    private readonly repository: DynamoRepository
  ) {}

  async getAgendas(): Promise<AgendaResponse> {
    const medicos = await this.repository.findAll('medicos');
    return { medicos };
  }
}
```

### **Adicionando Middleware**

```typescript
// Middleware de autenticação
export const authMiddleware = (event: APIGatewayProxyEvent) => {
  const token = event.headers.Authorization;
  if (!token) {
    throw new Error('Authorization required');
  }
  // Validar token...
};
```

---

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Add nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando TypeScript e Serverless Framework** 