# API Serverless - Sistema de Agendamento Médico

Uma API serverless simples para agendamento de consultas médicas construída com TypeScript, AWS Lambda e dados mockados.

## Funcionalidades

- **Listagem de Médicos**: Visualizar médicos disponíveis e seus horários
- **Agendamento**: Criar agendamentos para consultas médicas
- **TypeScript**: Segurança de tipos e recursos modernos do JavaScript
- **Serverless**: Construído com Serverless Framework para AWS Lambda
- **Dados Mockados**: Dados de exemplo em memória para desenvolvimento e testes
- **Validação**: Validação de entrada com mensagens de erro detalhadas
- **CORS**: Compartilhamento de recursos entre origens habilitado
- **Clean Architecture**: Separação de responsabilidades com domínios, services, controllers e utilities

## Endpoints da API

### Médicos e Horários

- `GET /agendas` - Listar médicos com horários disponíveis

### Agendamentos

- `POST /agendamento` - Criar um novo agendamento

## Schemas

### Resposta da Listagem de Médicos (GET /agendas)

```typescript
{
  "medicos": [
    {
      "id": number,
      "nome": string,
      "especialidade": string,
      "horarios_disponiveis": string[] // Formato: "YYYY-MM-DD HH:MM"
    }
  ]
}
```

### Requisição de Agendamento (POST /agendamento)

```typescript
{
  "agendamento": {
    "medico": string,      // Nome do médico
    "paciente": string,    // Nome do paciente
    "data_horario": string // Formato: "YYYY-MM-DD HH:MM"
  }
}
```

### Resposta de Agendamento

```typescript
{
  "mensagem": "Agendamento realizado com sucesso",
  "agendamento": {
    "medico": string,
    "paciente": string,
    "data_horario": string
  }
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
├── agenda/            # Domínio de Médicos
│   ├── controller/    # Controllers do Lambda
│   │   └── medicos.controller.ts
│   ├── service/       # Lógica de negócio
│   │   └── medicos.service.ts
│   ├── interface/     # Interfaces TypeScript
│   │   └── medico.interface.ts
│   └── mocks/         # Dados mockados
│       └── medicos.mocks.ts
├── agendamento/       # Domínio de Agendamento
│   ├── controller/    # Controllers do Lambda
│   │   └── agendamentos.controller.ts
│   ├── service/       # Lógica de negócio
│   │   └── agendamentos.service.ts
│   ├── interface/     # Interfaces TypeScript
│   │   └── agendamento.interface.ts
│   └── mocks/         # Dados mockados
│       └── agendamentos.mocks.ts
└── utils/             # Funções utilitárias
    ├── response.ts    # Helpers de resposta HTTP
    └── validation.ts  # Validação de entrada
```

## Exemplos de Uso da API

### Listar Médicos e Horários Disponíveis

```bash
curl https://your-api-url/agendas
```

**Resposta esperada:**
```json
{
  "success": true,
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
  }
}
```

### Criar Agendamento

```bash
curl -X POST https://your-api-url/agendamento \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "mensagem": "Agendamento realizado com sucesso",
    "agendamento": {
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  }
}
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