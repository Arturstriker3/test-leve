# API Serverless - Agenda Médica

Uma API serverless construída com TypeScript, seguindo padrões arquiteturais inspirados no NestJS, com injeção de dependência e estrutura modular.

## 🏗️ Arquitetura

A aplicação segue uma estrutura modular bem definida:

```
src/
  ├── shared/           # Recursos compartilhados
  │   ├── container/    # Configuração do container de DI
  │   ├── decorators/   # Decorators customizados
  │   ├── interfaces/   # Interfaces compartilhadas
  │   ├── types/        # Tipos e constantes
  │   └── utils/        # Utilitários compartilhados
  ├── utils/            # Funções utilitárias específicas
  ├── handlers/         # Handlers das funções Lambda
  ├── agenda/           # Módulo de agenda
  │   ├── controller/   # Controllers
  │   ├── service/      # Services
  │   ├── dto/          # Data Transfer Objects
  │   ├── interface/    # Interfaces do domínio
  │   ├── mocks/        # Dados mockados
  │   └── tests/        # Testes do módulo
  └── index.ts          # Ponto de entrada principal
```

## 🚀 Tecnologias

- **TypeScript** - Linguagem principal
- **Serverless Framework** - Deploy e gerenciamento
- **Inversify** - Injeção de dependência
- **Class-validator** - Validação de dados
- **Class-transformer** - Transformação de objetos
- **Jest** - Testes

## 📋 API Endpoints

### GET /agendas
Retorna a lista de médicos disponíveis com seus horários.

**Resposta:**
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

## 🛠️ Desenvolvimento

### Instalação
```bash
npm install
```

### Executar localmente
```bash
npm start
```

### Executar testes
```bash
npm test
```

### Build
```bash
npm run build
```

### Deploy
```bash
npm run deploy
```

## 🏛️ Padrões Arquiteturais

### Injeção de Dependência
Utilizamos o Inversify para gerenciar as dependências:

```typescript
@Injectable()
export class AgendaService {
  // Service implementation
}

@Injectable()
export class AgendaController {
  constructor(
    @inject(TYPES.AgendaService) private readonly agendaService: AgendaService
  ) {}
}
```

### Validação com Decorators
Os DTOs utilizam class-validator para validação:

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

### Guard Clauses
Seguimos o padrão de guard clauses para reduzir aninhamento:

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

## 📝 Extensão

Para adicionar novos módulos, siga a estrutura estabelecida:

1. Crie a pasta do módulo em `src/`
2. Implemente as camadas: controller, service, dto, interface, mocks
3. Registre no container de DI
4. Adicione as rotas no `serverless.yml`
5. Exporte no `index.ts` 