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

## Pré-requisitos

- Node.js 18.x ou superior
- AWS CLI configurado com credenciais apropriadas
- Serverless Framework CLI

## Instalação

1. Instalar dependências:
```bash
npm install
```

2. Instalar Serverless CLI globalmente (se ainda não instalado):
```bash
npm install -g serverless
```

## Desenvolvimento

### Executar localmente

```bash
npm start
```

Isso iniciará a API localmente usando o plugin serverless-offline.

### Compilar

```bash
npm run build
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Deploy

### Deploy para AWS

```bash
npm run deploy
```

### Deploy para um estágio específico

```bash
serverless deploy --stage production
```

### Remover deployment

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
curl https://sua-api-url/agendas
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
curl -X POST https://sua-api-url/agendamento \
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

## Tratamento de Erros

A API retorna respostas de erro padronizadas:

```json
{
  "success": false,
  "error": "Descrição da mensagem de erro"
}
```

Códigos de status HTTP comuns:
- `200` - Sucesso
- `201` - Criado
- `400` - Requisição Inválida (erros de validação)
- `404` - Não Encontrado
- `500` - Erro Interno do Servidor

## Tecnologias Utilizadas

- **TypeScript** - JavaScript com segurança de tipos
- **AWS Lambda** - Computação serverless
- **Dados Mockados** - Dados em memória para desenvolvimento
- **Serverless Framework** - Infraestrutura como Código
- **ESLint** - Linting de código
- **UUID** - Geração de identificadores únicos 