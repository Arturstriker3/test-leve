# API Serverless - Sistema de Agendas e Agendamentos

Uma API serverless para gerenciamento de agendas e agendamentos construída com TypeScript, AWS Lambda e dados mockados.

## Funcionalidades

- **Operações CRUD**: Criar, Ler, Atualizar, Deletar agendas e agendamentos
- **TypeScript**: Segurança de tipos e recursos modernos do JavaScript
- **Serverless**: Construído com Serverless Framework para AWS Lambda
- **Dados Mockados**: Dados de exemplo em memória para desenvolvimento e testes
- **Validação**: Validação de entrada com mensagens de erro detalhadas
- **CORS**: Compartilhamento de recursos entre origens habilitado
- **Clean Architecture**: Separação de responsabilidades com domínios, services, controllers e utilities

## Endpoints da API

### Agendas

- `POST /agendas` - Criar uma nova agenda
- `GET /agendas` - Listar todas as agendas
- `GET /agendas/{id}` - Obter uma agenda por ID
- `PUT /agendas/{id}` - Atualizar uma agenda
- `DELETE /agendas/{id}` - Excluir uma agenda

### Agendamentos

- `POST /agendamentos` - Criar um novo agendamento
- `GET /agendamentos` - Listar todos os agendamentos
- `GET /agendamentos/{id}` - Obter um agendamento por ID
- `PUT /agendamentos/{id}` - Atualizar um agendamento
- `DELETE /agendamentos/{id}` - Excluir um agendamento
- `GET /agendas/{agendaId}/agendamentos` - Listar agendamentos de uma agenda específica

## Schemas

### Agenda

```typescript
{
  id: string;           // UUID (auto-gerado)
  nome: string;         // Obrigatório
  descricao: string;    // Obrigatório
  ativo: boolean;       // Padrão: true
  criadoEm: string;     // ISO timestamp (auto-gerado)
  atualizadoEm: string; // ISO timestamp (auto-atualizado)
}
```

### Agendamento

```typescript
{
  id: string;           // UUID (auto-gerado)
  agendaId: string;     // ID da agenda (obrigatório)
  titulo: string;       // Obrigatório
  descricao?: string;   // Opcional
  dataHora: string;     // ISO timestamp (obrigatório)
  duracao: number;      // Em minutos (padrão: 30)
  status: AgendamentoStatus; // AGENDADO, CONFIRMADO, CANCELADO, CONCLUIDO
  criadoEm: string;     // ISO timestamp (auto-gerado)
  atualizadoEm: string; // ISO timestamp (auto-atualizado)
}
```

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Serverless CLI globally (if not already installed):
```bash
npm install -g serverless
```

## Development

### Running locally

```bash
npm start
```

This will start the API locally using serverless-offline plugin.

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Deployment

### Deploy to AWS

```bash
npm run deploy
```

### Deploy to specific stage

```bash
serverless deploy --stage production
```

### Remove deployment

```bash
npm run remove
```

## Estrutura do Projeto

```
src/
├── agenda/            # Domínio de Agenda
│   ├── controller/    # Controllers do Lambda
│   │   └── agenda.controller.ts
│   ├── service/       # Lógica de negócio
│   │   └── agenda.service.ts
│   ├── dto/           # Data Transfer Objects
│   │   └── agenda.dto.ts
│   ├── interface/     # Interfaces TypeScript
│   │   └── agenda.interface.ts
│   └── mocks/         # Dados mockados
│       └── agenda.mocks.ts
├── agendamento/       # Domínio de Agendamento
│   ├── controller/    # Controllers do Lambda
│   │   └── agendamento.controller.ts
│   ├── service/       # Lógica de negócio
│   │   └── agendamento.service.ts
│   ├── dto/           # Data Transfer Objects
│   │   └── agendamento.dto.ts
│   ├── interface/     # Interfaces TypeScript
│   │   └── agendamento.interface.ts
│   └── mocks/         # Dados mockados
│       └── agendamento.mocks.ts
└── utils/             # Funções utilitárias
    ├── response.ts    # Helpers de resposta HTTP
    └── validation.ts  # Validação de entrada
```

## API Usage Examples

### Create Product

```bash
curl -X POST https://your-api-url/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics"
  }'
```

### Get All Products

```bash
curl https://your-api-url/products
```

### Get Product by ID

```bash
curl https://your-api-url/products/{product-id}
```

### Update Product

```bash
curl -X PUT https://your-api-url/products/{product-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 1299.99
  }'
```

### Delete Product

```bash
curl -X DELETE https://your-api-url/products/{product-id}
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Technologies Used

- **TypeScript** - Type-safe JavaScript
- **AWS Lambda** - Serverless compute
- **DynamoDB** - NoSQL database
- **Serverless Framework** - Infrastructure as Code
- **AWS SDK** - AWS service integration
- **ESLint** - Code linting
- **UUID** - Unique identifier generation 